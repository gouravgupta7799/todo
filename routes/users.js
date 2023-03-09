import express from "express";
import { register, login, logout, updatePassword, updateDetails, getMe, deleteUser } from "../controller/usersController.js"
import authorize from "../middleware/authorize.js";
import { validateResult } from "../middleware/validationResult.js";
import { loginRules, registerRules, updateDetailRules, updatePasswordRules } from "../middleware/validator.js";

const router = express.Router();
router.post("/register", registerRules, validateResult, register);
router.post("/login", loginRules, validateResult, login);

router.get("/logout", authorize, logout);
router.get("/me", authorize, getMe);

router.put("/updatedetails", authorize, updateDetailRules, validateResult, updateDetails);
router.put("/updatepassword", authorize, updatePasswordRules, validateResult, updatePassword);

router.delete("/delete", authorize, deleteUser);


export default router;


