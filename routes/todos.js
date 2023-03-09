import express from "express";
import authorize from "../middleware/authorize.js";

import { getTodo, getTodos, createTodo, updateTodo, deleteTodo } from "../controller/todos.Controller.js";
import { createtodoRules, updatetodoRules } from "../middleware/validator.js";
import { validateResult } from "../middleware/validationResult.js";
const router = express.Router();

router.get("/:id", authorize, getTodo);

router.get("/", authorize, getTodos);

router.post("/create", authorize, createtodoRules, validateResult, createTodo);

router.put("/update/:id", authorize, updatetodoRules, validateResult, updateTodo);

router.delete("/deleteTodo/:id", authorize, deleteTodo);

export default router;
