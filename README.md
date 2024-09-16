
### E-Commerce API

This project is an Express application developed using TypeScript for building a scalable and efficient e-commerce platform. The application integrates MongoDB for data management through Mongoose and ensures data integrity by using Zod for schema validation. The API provides functionality for managing products and orders.
Table of Contents

    Features
    Project Structure
    Installation
    Environment Variables
    API Endpoints
        Product Endpoints
        Order Endpoints
    Data Models
        Product Data Model
        Order Data Model
    Technologies Used
    License

## Features

    TypeScript: Leverages TypeScript for better code quality and type safety.
    MongoDB & Mongoose: MongoDB as the database with Mongoose for schema-based modeling and easy data management.
    Zod Validation: Uses Zod for schema validation to ensure data integrity.
    Product and Order Management: Provides endpoints for CRUD operations on products and orders.

## Project Structure

Installation
Prerequisites

Ensure you have the following installed:

    Node.js (version 14 or above)
    MongoDB

Steps to Install

    Clone the repository:

    bash

git clone https://github.com/Manik1010/e-commerce_eroduct e-commerce-api

Install dependencies:

bash

npm install

Set up the environment variables (see Environment Variables).

Start the development server:

bash

    npm run start:dev

Environment Variables

Create a .env file in the root directory and add the following:

plaintext

MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=5000

    MONGO_URI: MongoDB connection string.
    PORT: The port on which the server will run.

API Endpoints
Product Endpoints

    POST /api/products: Create a new product.
    GET /api/products: Get all products.
    GET /api/products/:productId: Get a single product by its ID.
    PUT /api/products/:productId: Update a product by its ID.
    DELETE /api/products/:productId: Delete a product by its ID.

Order Endpoints

    POST /api/orders: Create a new order.
    GET /api/orders: Get all orders or filter by user email.
    GET /api/orders/:email: Get a user's orders by email.
    DELETE /api/orders/:orderId: Delete an order by its ID.

Data Models
Product Data Model

    name: string – The name of the product (required).
    description: string – A brief description of the product (required).
    price: number – The price of the product (required).
    category: string – The category of the product (required).
    tags: string[] – Tags or keywords associated with the product (optional).
    variants: Array<{ type: string, value: string }> – Variants like size, color (optional).
    inventory: object – Inventory details:
        quantity: number – The number of available items (required).
        inStock: boolean – Availability status (required).

Order Data Model

    email: string – The user's email who placed the order (required).
    productId: string – The product ID (required).
    quantity: number – The quantity of the product ordered (required).
    price: number – The total price of the order (required).

Technologies Used

    Express: Web framework for Node.js.
    TypeScript: Type-safe JavaScript.
    MongoDB: NoSQL database.
    Mongoose: MongoDB object modeling.
    Zod: TypeScript-first schema declaration and validation.

## Live Link
Project: https://assigenment.vercel.app/
