"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const mongoose_1 = require("mongoose");
// Create a product in the database
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.default.create(product);
        return result;
    }
    catch (err) { // Changed from 'any' to 'unknown'
        // Log the error for debugging
        console.error('Error creating product:', err);
        // Type-check and re-throw the error
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        else {
            throw new Error('An unknown error occurred while creating the product.');
        }
    }
});
// Get all products from the database
const getAllProductsIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    return products;
});
// Get a single product by ID from the database
const getSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new Error("Invalid product ID");
    }
    const result = yield product_model_1.default.findOne({ _id: id });
    return result;
});
// Update a product by ID in the database
const updateProductIntoDB = (productId, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(productId)) {
        throw new Error("Invalid product ID");
    }
    const result = yield product_model_1.default.findByIdAndUpdate(productId, { $set: updatedProduct }, { new: true, runValidators: true });
    return result;
});
// Delete a product by ID from the database
const deleteProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new Error("Invalid product ID");
    }
    const result = yield product_model_1.default.deleteOne({ _id: id });
    return result;
});
// Search for products based on a search term
const searchProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const products = yield product_model_1.default.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
        ]
    });
    return products;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsIntoDB,
    getSingleProductIntoDB,
    searchProducts,
    updateProductIntoDB,
    deleteProductIntoDB,
};
