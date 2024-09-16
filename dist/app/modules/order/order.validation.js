"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty("Email is required").email("Email is not valid"),
    productId: zod_1.z.string().nonempty("Product Id is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().positive("Quantity must be a positive number")
});
exports.default = orderValidationSchema;
