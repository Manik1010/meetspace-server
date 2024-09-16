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
exports.OrderServices = void 0;
const mongoose_1 = require("mongoose");
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const addOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity, price } = order;
    // Check if the productId is a valid ObjectId
    if (!(0, mongoose_1.isValidObjectId)(productId)) {
        throw new Error("Invalid product ID");
    }
    // Find the product by its ID
    const product = yield product_model_1.default.findById(productId);
    // Check if the product exists
    if (!product) {
        throw new Error("Invalid product ID. This product ID could not be found in the database");
    }
    // Check if the product is in stock
    if (product.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory.");
    }
    // Calculate the total price based on the price and quantity provided
    const totalPrice = price * quantity;
    // Update the quantity of the product in the ProductModel
    const updatedQuantity = product.inventory.quantity - quantity;
    yield product_model_1.default.findByIdAndUpdate(productId, { "inventory.quantity": updatedQuantity });
    // Update the inStock field based on the updated quantity
    const inStock = updatedQuantity > 0;
    // Update inStock field in the ProductModel
    yield product_model_1.default.findByIdAndUpdate(productId, { "inventory.inStock": inStock });
    // Create the order
    const result = yield order_model_1.default.create(Object.assign(Object.assign({}, order), { price: totalPrice }));
    return result;
});
const getAllOrdersIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find();
    return orders;
});
const searchOrdersByEmail = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const orders = yield order_model_1.default.find({ email: { $regex: regex } });
    if (orders.length === 0) {
        throw new Error(`No orders found matching the search user email:${searchTerm}`);
    }
    return orders;
});
exports.OrderServices = {
    addOrderIntoDB,
    getAllOrdersIntoDB,
    searchOrdersByEmail
};
