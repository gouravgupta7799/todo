import { check } from "express-validator";

export const registerRules = [
  check("name", "Name is required").notEmpty().trim().escape(),
  check("email", "please give valid email").isEmail().normalizeEmail(),
  check("password", "password should be 6 or more charactors").isLength({ min: 6 }),
  check("age", "age is required").notEmpty().trim().escape().isNumeric()
];

export const loginRules = [
  check("email", "please give valid email").isEmail().normalizeEmail(),
  check("password", "password should be 6 or more charactors").isLength({ min: 6 })
];

export const updateDetailRules = [
  check("name", "Name is required").notEmpty().trim().escape(),
  check("email", "please give valid email").isEmail().normalizeEmail(),
  check("age", "age is required").notEmpty().trim().escape().isNumeric()
];

export const updatePasswordRules = [
  check("password", "password should be 6 or more charactors").isLength({ min: 6 }),
  check("newpassword", "password should be 6 or more charactors").isLength({ min: 6 }),
];

export const createtodoRules = [
  check("title", "title is required").notEmpty().trim().escape(),
  check("description", "description is required").notEmpty().trim().escape()
];

export const updatetodoRules = [
  check("title", "title is required").notEmpty().trim().escape(),
  check("description", "description is required").notEmpty().trim().escape(),
  check("completed", "completed is required").notEmpty().trim().escape().isBoolean()
];


