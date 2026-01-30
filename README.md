# Book Store v2.x

Book Store v2.x solution built with .NET 10 and React 18, designed to demonstrate the integration of Docker Compose for container orchestration. The application utilizes PostgreSQL as its primary database, JWT authentication and authorization and Redis for caching; providing a robust foundation for scalable Web API.

CI/CD is configured using GitHub Actions to automate the build, test, and deployment processes.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Getting Started

To get a local copy up and running, follow these simple steps.

If you want to test the React App in your development environment, run the next command.
 ```sh
 npm start
 ```

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- Docker

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kraftcoding/BookStore-v2.x.git
   ```
2. Navigate to the project directory
   ```sh
   cd Books-Web-API-Docker-Postgresql-Redis-.NET-10
   ```
3. Clean the existing HTTPS certificates
   ```sh
   dotnet dev-certs https --clean
   ``` 
4. Generate the certificate (if not already present)
   ```sh
   dotnet dev-certs https
   ```
5. Trust the certificate
   ```sh
   dotnet dev-certs https --trust
   ```
6. Build and run the application:
   ```sh
   docker-compose up --build
   ```
7. The Web API will be accessible at `http://localhost:5000/swagger` and the React frontend at `http://localhost:3000`. 

## Architecture Overview

## Features

- **Built with .NET 10 and React 18**: Utilizes the latest features for efficient development.
- **Docker Compose**: Manages multi-container applications seamlessly.
- **PostgreSQL**: Powerful relational database for data storage.
- **Redis**: Caching solution for improved performance.
- **Health Check**: Standardized approach for monitoring and assessing the operational status of systems.

## Technologies Used

- **React 18**
- **.NET 10**
- **PostgreSQL**
- **Redis**
- **EF Core**
