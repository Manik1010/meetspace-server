"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productVariantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });
const productInventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [6, 'Name must be at least 6 characters'],
        maxlength: [20, 'Name must be at most 20 characters'],
        unique: true,
        required: [true, "Name is required"],
    },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    tags: { type: [String], required: [true, "Tags are required"] },
    variants: { type: [productVariantSchema], required: [true, "Variants are required"] },
    inventory: { type: productInventorySchema, required: [true, "Inventory is required"] },
});
const ProductModel = (0, mongoose_1.model)('products', productSchema);
exports.default = ProductModel;
