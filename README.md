# Carboncell Backend Assignment

#### Overview

This project is the solution of assginment provided for evaluation. It has features like **authentication, provide filetered data from a public api based on category and count, retrieves Ethereum Account Balance from a wallet**.

> Please note that `.env` file is added purposefully to make things simpler for evaluation. In real life scenerios these are avoided.

#### Base URL

The base URL for all endpoints is: `http://localhost:4000/`

#### Prerequisite

Make sure you have **Node.js** & **Git** installed in your pc.
Or else download it from following link.
[_Download Node_](https://nodejs.org/en)
[_Download Git_](https://git-scm.com/)

#### To run the server locally

1. Clone the repo inside some folder

```bash
  git clone https://github.com/Nil2000/carboncell-backend-assignment.git
```

2. Run the following command

```bash
  npm install
  npm run dev
```

Server will start running in port `4000`

#### Testing

Go to the following url [http://localhost:4000/api-docs](http://localhost:4000/api-docs).

The swagger UI will contain all the routes mentioned in this project.

#### Technology used

Entire application is made using _Node_ and _Typescript_.

- `MongoDB` is used for storing user details and `mongoose` for DB related operations.
- `jsonwebtoken` used for token after succesful login.
- `cookie-parser` for parsing cookies
- `bcryptjs` for hashing password
- `web3` for handling web3/crypto related operations
- `swagger-jsdoc` & `swagger-ui-express` for swagger API documentation
- Few popular libraries like `express`,`nodemon`,`dotenv`, `typescript`,`ts-node`,`axios` etc.

#### Few points to be noted

1. Please don't call the web3 api endpoint multiple times since [_Quicknode_](https://dashboard.quicknode.com/endpoints) free tier has some limitations of API credit points.
2. For getting balance of an Eutherum wallet, please make sure to take a token from any of the tokens listed here.
   [_Etherscan token_](https://etherscan.io/tokens)
   After entering any of the token go to `holders` tab and get a wallet address from the list. After that perform the wallet testing.

### API Documentation

#### Register User

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user with the provided information.
- **Request Body:**
  - `name` (string): The name of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user account.
- **Responses:**
  - `201 Created`: User successfully registered.
    - Body: `{ message: "User registered successfully" }`
  - `400 Bad Request`: Email already exists.
    - Body: `{ error: "Email already exists" }`
  - `500 Internal Server Error`: Failed to register user.
    - Body: `{ error: "Failed to register user" }`

#### Login User

- **Endpoint:** `auth/login`
- **Method:** `POST`
- **Description:** Logs in an existing user with the provided credentials and returns an authentication token.
- **Request Body:**
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user account.
- **Responses:**
  - `200 OK`: User successfully logged in.
    - Body: `{ token: "<JWT_TOKEN>", name: "<USER_NAME>" }`
  - `401 Unauthorized`: User does not exist or invalid password.
    - Body: `{ error: "User does not exist" }` or `{ error: "Invalid password" }`
  - `500 Internal Server Error`: Failed to login user.
    - Body: `{ error: "Failed to login user" }`

#### Logout User

- **Endpoint:** `auth/logout`
- **Method:** `POST`
- **Description:** Logs out the currently authenticated user by clearing the access token cookie.
- **Responses:**
  - `200 OK`: User logged out successfully.
    - Body: `{ message: "User logged out successfully" }`
  - `500 Internal Server Error`: Failed to log out user.
    - Body: `{ error: "Failed to log out user" }`

#### Get Filtered Data

- **Endpoint:** `/getFilteredData`
- **Method:** `GET`
- **Description:** Retrieves filtered data from a public API based on specified criteria.
- **Query Parameters:**
  - `category` (string, optional): The category by which the data should be filtered.
  - `count` (number, optional): The maximum number of entries to be returned.
- **Responses:**
  - `200 OK`: Filtered data successfully retrieved.
    - Body:
      ```json
      {
        "count": "<NUMBER_OF_ENTRIES>",
        "entries": [<FILTERED_ENTRIES>]
      }
      ```
  - `400 Bad Request`: Invalid count value.
    - Body: `{ error: "Invalid count value" }`
  - `404 Not Found`: No data found for the specified category.
    - Body: `{ error: "No data found" }`
  - `500 Internal Server Error`: Failed to retrieve data.
    - Body: `{ error: "Failed to retrieve data" }`

#### Get Balance

- **Endpoint:** `/getBalance`
- **Method:** `GET`
- **Description:** Retrieves the balance of a specified token for a given wallet address.
- **Query Parameters:**
  - `tokenAdd` (string, required): The address of the token contract.
  - `walletAdd` (string, required): The wallet address for which the balance needs to be retrieved.
- **Responses:**
  - `200 OK`: Balance successfully retrieved.
    - Body: `{ balanceInWei: "<BALANCE_IN_WEI>", balanceInEth: "<BALANCE_IN_ETH>" }`
  - `400 Bad Request`: Missing required query parameters.
    - Body: `{ error: "tokenAddress is required" }` or `{ error: "walletAddress is required" }`
  - `500 Internal Server Error`: Error fetching balance.
    - Body: `{ message: "Error fetching balance" }`
