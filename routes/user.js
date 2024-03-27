const express = require("express");
const router = express.Router();
const { format } = require("date-fns");
const User = require("../model/User");

const generateSampleData = async () => {
  const existingCount = await User.countDocuments();
  if (existingCount === 0) {
    const sampleData = Array.from({ length: 100 }, (_, i) => {
      const date = format(new Date(2000, 0, i + 1), "yyyy-MM-dd");
      return {
        id: i + 1,
        name: `SampleUser`,
        age: Math.floor(Math.random() * 80) + 18,
        email: `sampleuser${i + 1}@example.com`,
        dob: new Date(date),
      };
    });

    await User.insertMany(sampleData);
  }
};

// Endpoint for generating sample data
router.get("/generate-sample-data", async (req, res) => {
  try {
    await generateSampleData();
    res.send("Sample data generated successfully");
  } catch (error) {
    console.error("Error generating sample data:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Endpoint for getting users data
router.get("/users", async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sortField = "id",
      sortOrder = "asc",
      name,
      age,
      email,
      dobFrom,
      dobTo,
    } = req.query;

    const errors = validateInputParameters(page, pageSize, sortOrder, age, name, email);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const filters = constructQueryFilters(name, age, email, dobFrom, dobTo);

    const totalCount = await User.countDocuments(filters);

    const sortOptions = constructSortOptions(sortField, sortOrder);

    const users = await User.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({
      users,
      metadata: {
        totalCount,
        currentPage: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function validateInputParameters(page, pageSize, sortOrder, age, name, email) {
  const errors = [];
  if (isNaN(page) || page < 1) {
    errors.push("Invalid page number. Must be a positive integer.");
  }
  if (isNaN(pageSize) || pageSize < 1) {
    errors.push("Invalid page size. Must be a positive integer.");
  }
  if (!["asc", "desc"].includes(sortOrder)) {
    errors.push('Invalid sortOrder. Must be "asc" or "desc".');
  }
  if (age) {
    if (age.includes("-")) {
      const [minAge, maxAge] = age.split("-").map(Number);
      if (isNaN(minAge) || isNaN(maxAge) || minAge < 0 || maxAge > 140 || minAge >= maxAge) {
        errors.push(
          'Invalid age range. Must be in the format "min-max" (e.g., 0-140) with min < max.'
        );
      }
    } else if (isNaN(age) || age < 0 || age > 140) {
      errors.push("Invalid age. Must be a number between 0 and 140.");
    }
  }
  if (name && !/^[a-zA-Z\s]*$/.test(name)) {
    errors.push(
      "Invalid name format. Only alphabets and spaces are allowed."
    );
  }
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Invalid email format.");
  }
  return errors;
}


function constructQueryFilters(name, age, email, dobFrom, dobTo) {
  const filters = {};
  if (name) filters.name = { $regex: new RegExp(name, "i") };
  if (age) {
    if (age.includes("-")) {
      const [minAge, maxAge] = age.split("-").map(Number);
      filters.age = { $gte: minAge, $lte: maxAge };
    } else {
      filters.age = Number(age);
    }
  }
  if (email) filters.email = { $regex: new RegExp(email, "i") };
  if (dobFrom || dobTo) {
    filters.dob = {};
    if (dobFrom) filters.dob.$gte = new Date(dobFrom);
    if (dobTo) filters.dob.$lte = new Date(dobTo);
  }
  return filters;
}

function constructSortOptions(sortField, sortOrder) {
  const sortOptions = {};
  sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
  return sortOptions;
}

module.exports = router;
