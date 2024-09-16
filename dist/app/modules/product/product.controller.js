"use strict";
// import { Request, Response } from "express";
// import { ProductServices } from "./product.service";
// import TProduct from "./product.interface";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        console.log(productData);
        // Check if all required fields are provided
        if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.inventory || !productData.variants) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (name, description, price, category, tags, variants, inventory) must be provided.',
            });
        }
        // Call the service function to save the product to the database
        const result = yield product_service_1.ProductServices.createProductIntoDB(productData);
        // Send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully.',
            data: result,
        });
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while creating the product.',
                error: err.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred.',
                error: 'Unknown error',
            });
        }
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        let products;
        let message;
        if (searchTerm) {
            products = yield product_service_1.ProductServices.searchProducts(searchTerm);
            message = `Products matching search term '${searchTerm}' fetched successfully!`;
        }
        else {
            products = yield product_service_1.ProductServices.getAllProductsIntoDB();
            message = 'Products fetched successfully!';
        }
        res.status(200).json({
            success: true,
            message: message,
            data: products
        });
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
                error: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: 'Unknown error'
            });
        }
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductIntoDB(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: result
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
                error: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: 'Unknown error'
            });
        }
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductIntoDB(productId);
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
                error: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: 'Unknown error'
            });
        }
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, updatedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message || 'Something went wrong',
                error: err.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: 'Unknown error'
            });
        }
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct,
};
