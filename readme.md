# CheetahAssignment API

## Introduction
This API allows you to perform various operations related to users like storing and query.

## Getting Started
To get started with the CheetahAssignment API, follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/ahmaddioxide/CheetahAssignment.git
    ```

2. Install the dependencies:
    ```bash
    cd CheetahAssignment
    npm install
    ```
3. Install MongoDB locally and run:
   - **Windows:**
     - Download the MongoDB installer from the official website: [MongoDB Download Center](https://www.mongodb.com/try/download/community).
     - Run the installer and follow the installation instructions.
     - Once installed, MongoDB will be available in your system's PATH.
   - **macOS:**
     - Install MongoDB using Homebrew by using following link [MongoDB Download Center](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

   - **Linux:**
     - Follow the instructions for your specific Linux distribution provided in the MongoDB official documentation: [Install MongoDB Community Edition on Linux](https://docs.mongodb.com/manual/administration/install-on-linux/).


3. Start the server:
    ```bash
    npm start
    ```

4. The API will be available at `http://localhost:3000`.

5. mongodb connection URI 

```curl
mongodb://localhost:27017/sample_data
```

6. Run the /api/generate-sample-data endpoint to genrate sample data in DB

``` curl
curl -X GET http://localhost:3000/api/generate-sample-data
```



## API Endpoints

### 1. Generate Sample Data

- **Description:** This endpoint generates sample user data in the database.
- **Method:** GET
- **URL:** `/api/generate-sample-data`
- **Request Body:** None
- **Response:**
  - **Status Code:** 200 OK
  - **Content:** `"Sample data generated successfully"`
- **Example:**
  ```bash
  curl -X GET http://localhost:3000/api/generate-sample-data

## Get Users Data

- **Description:** This endpoint retrieves users' data based on specified filters and pagination.
- **Method:** GET
- **URL:** `/api/users`
- **Query Parameters:**
  - `page`: Current page number (default: 1)
  - `pageSize`: Number of users per page (default: 10)
  - `sortField`: Field to sort by (id, name, age, email, dob) (default: id)
  - `sortOrder`: Sort order (asc, desc) (default: asc)
  - `name`: Name filter (optional)
  - `age`: Age filter (optional, format: "min-max" or single value)
  - `email`: Email filter (optional)
  - `dobFrom`: Date of birth filter (from date) (optional, format: "yyyy-MM-dd")
  - `dobTo`: Date of birth filter (to date) (optional, format: "yyyy-MM-dd")
- **Response:**
  - **Status Code:** 200 OK
  - **Content:** 
    ```json
    {
      "users": [...],
      "metadata": {
        "totalCount": 100,
        "currentPage": 1,
        "totalPages": 10
      }
    }
    ```
- **Example:**
  ```bash
  curl -X GET 'http://localhost:3000/api/users?page=1&pageSize=5&sortField=name&sortOrder=asc&age=20-30&name=sampleUser&email=sampleemail@example.com&dobFrom=2000-01-01&dobTo=2000-12-31'
  
  ```
  ```bash
  curl -X GET 'http://localhost:3000/api/users'
  
  ```


## Sample Example

### Request

``` curl
 http://localhost:3000/api/users?page=1&sortField=age&sortOrder=desc&age=20-50

```


### Response

```json
{
  "users": [
    {
      "_id": "660458a32792c2cdc7628f90",
      "id": 73,
      "name": "SampleUser",
      "age": 50,
      "email": "sampleuser73@example.com",
      "dob": "2000-03-13T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f73",
      "id": 44,
      "name": "SampleUser",
      "age": 50,
      "email": "sampleuser44@example.com",
      "dob": "2000-02-13T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f48",
      "id": 1,
      "name": "SampleUser",
      "age": 49,
      "email": "sampleuser1@example.com",
      "dob": "2000-01-01T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f63",
      "id": 28,
      "name": "SampleUser",
      "age": 49,
      "email": "sampleuser28@example.com",
      "dob": "2000-01-28T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f9a",
      "id": 83,
      "name": "SampleUser",
      "age": 48,
      "email": "sampleuser83@example.com",
      "dob": "2000-03-23T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f6d",
      "id": 38,
      "name": "SampleUser",
      "age": 48,
      "email": "sampleuser38@example.com",
      "dob": "2000-02-07T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628faa",
      "id": 99,
      "name": "SampleUser",
      "age": 47,
      "email": "sampleuser99@example.com",
      "dob": "2000-04-08T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f75",
      "id": 46,
      "name": "SampleUser",
      "age": 47,
      "email": "sampleuser46@example.com",
      "dob": "2000-02-15T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f82",
      "id": 59,
      "name": "SampleUser",
      "age": 46,
      "email": "sampleuser59@example.com",
      "dob": "2000-02-28T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "660458a32792c2cdc7628f70",
      "id": 41,
      "name": "SampleUser",
      "age": 46,
      "email": "sampleuser41@example.com",
      "dob": "2000-02-10T00:00:00.000Z",
      "__v": 0
    }
  ],
  "metadata": {
    "totalCount": 40,
    "currentPage": 1,
    "totalPages": 4
  }
}
