
# CRM System Development

## Video: https://www.youtube.com/watch?v=BKrOOCjugRI

This is a Customer Relationship Management (CRM) system developed using Java Spring Boot for the backend and React for the frontend. The system allows users to manage customers and perform CRUD operations, with role-based access control. The system also supports JWT-based authentication for secure user login and registration.

## Project Structure

The project is divided into two parts:

1. **Backend**: Spring Boot application that handles API requests, database interactions, and business logic.
2. **Frontend**: React-based web interface that allows users to interact with the CRM system.


## Features
- **User Authentication**: Register and login functionality with JWT token-based authentication.
- **Role-Based Access Control**: Admin users can add, update, and delete customers. Regular users can only view their information.
- **Customer Management**: Add, update, delete, and view customer data.
- **User Profile Management**: Users can update their own profile.
- **Filter Functionality**: Filter customers by region using the search filter.
- **Error Handling**: Proper error handling and feedback in the UI.

## Technologies Used

### Backend
- **Java 17**: Backend language.
- **Spring Boot**: Backend framework used for RESTful API development.
- **Spring Security**: For authentication and authorization.
- **JWT (JSON Web Token)**: For secure token-based authentication.
- **Spring Data JPA**: For ORM (Object Relational Mapping) to interact with the database.
- **MySQL**: Database to store user and customer data.

### Frontend
- **React 18**: Frontend framework for building the user interface.
- **Axios**: HTTP client to communicate with the backend.
- **React Router**: To handle routing and navigation between components.

## Requirements

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8** or higher

## Setup Instructions
### Backend Setup
1. **Clone the repository:**

```bash 
git clone https://github.com/LyotardPostmodernizm/CRM-System-with-CRUD-Operations.git
cd CRM-System-with-CRUD-Operations/spring-boot(Backend)
```

2. **MySQL Configuration:**
- Create a new MySQL database:

```sql
CREATE DATABASE crm_db;
```

- Update the database configurations in **src/main/resources/application.properties**:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect
```
3. **Build and Run the Application:**

```bash
./mvnw clean install
./mvnw spring-boot:run
```
4. **The backend API will run on:** [http://localhost:8080](http://localhost:8080).

### Frontend Setup
1. **Navigate to the frontend directory:**

```bash
cd ../React(Frontend)
```
2. **Install Dependencies:**

```bash
npm install
```
3. **Run the React Application:**

```bash
npm start
```

### Running the Application

- Once both the backend and frontend are running, you can navigate to http://localhost:3000 to access the CRM system.

- You can register as a new user or log in

## Project Overview

This CRM system is built to manage customer information with the following key components:

- **User Registration & Authentication**: Users can sign up with their username and password, and the credentials are securely stored using password encoding. The users receive a JWT token upon successful login.

- **Role-Based Access**: Only users with the role ADMIN can add, update, and delete customers. Regular users (USER role) can only view their information.

- **Customer CRUD Operations**: Admin users can perform Create, Read, Update, and Delete operations on customer data. Each customer has fields such as id, firstName, lastName, email, region, and registrationDate.

- **Region Filtering**: Users can filter customers by region by entering the desired region and clicking the filter button.

- **Security**: JWT is used to secure the API, ensuring that only authenticated users can access protected endpoints.

## Key Endpoints (Backend)

### Authentication

- **POST** ``` /api/auth/signup ``` : Register a new user.
- **POST** ``` /api/auth/login:``` Login a user and receive a JWT token.

### User Management

- **GET** ```/api/auth:``` Get all users (Admin only).
- **PUT** ```/api/auth/{id}:``` Update user details.

### Customer Management

- **GET** ```/api/customers```: Get all customers.
- **POST** ```/api/customers```: Add a new customer (Admin only).
- **PUT** ```/api/customers/{id}```: Update customer details (Admin only).
- **DELETE** ```/api/customers/{id}```: Delete a customer (Admin only).
- **GET** ```/api/customers/filter?region={region}```: Filter customers by region.

## Dependencies

### Backend (Maven)
- **```spring-boot-starter-data-jpa```**
- **```spring-boot-starter-web```**
- **```spring-boot-starter-security```**
- **```spring-boot-starter-validation```**
- **```jjwt```**
- **```mysql-connector-java```**

### Frontend (npm)
- **```react```**
- **```react-router-dom```**
- **```axios```**
- **```bootstrap```**

## Images from app

![Uygulama Ekran Görüntüsü1](https://i.hizliresim.com/5qgnj1u.png)

![Uygulama Ekran Görüntüsü2](https://i.hizliresim.com/kflc8x4.png)

![Uygulama Ekran Görüntüsü3](https://i.hizliresim.com/qd7t4xy.png)

![Uygulama Ekran Görüntüsü3](https://i.hizliresim.com/q6ekl56.png)

## Contribution
Feel free to open issues or submit pull requests if you'd like to contribute to the project. Any feedback or improvement suggestions are always welcome!

