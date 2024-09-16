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
exports.OrderControllers = void 0;
const zod_1 = require("zod");
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const validateOrderData = order_validation_1.default.parse(order);
        if (!validateOrderData.email || !validateOrderData.productId || !validateOrderData.price || !validateOrderData.quantity) {
            throw new Error("All fields are required");
        }
        const result = yield order_service_1.OrderServices.addOrderIntoDB(validateOrderData);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result
        });
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: err.errors[0].message,
                error: err.errors,
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.email;
        let orders;
        let message;
        if (searchTerm) {
            orders = yield order_service_1.OrderServices.searchOrdersByEmail(searchTerm);
            message = `Orders fetched successfully for user email : '${searchTerm}'`;
        }
        else {
            orders = yield order_service_1.OrderServices.getAllOrdersIntoDB();
            message = 'Orders fetched successfully!';
        }
        res.status(200).json({
            success: true,
            message: message,
            data: orders
        });
    }
    catch (err) { // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
});
const getOrderByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield order_service_1.OrderServices.searchOrdersByEmail(email);
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
                message: err.message,
                error: err
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
});
exports.OrderControllers = {
    addOrder,
    getAllOrders,
    getOrderByEmail,
};
