import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Todo from "../models/todo.js";


export const register = async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "user alredy exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    user = new User({
      name,
      email,
      password: hashpassword,
      age
    });
    await user.save();
    const payload = {
      user: user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 })
    res.cookie("token", token, { httpOnly: true, expiresIn: 360000 })
    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ msg: "created sucsessfully", user: rest })
  }
  catch (err) {
    res.status(500).json({ errors: "internal server error" })
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid crdentials" })
    }
    const payload = {
      user: user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 })
    res.cookie("token", token, { httpOnly: true, expiresIn: 36000 })
    
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ msg: `user logged sucsessfully`, user: rest })
  }
  catch (err) {
    console.error(err.body)
    res.status(500).json({ errors: "internal server error" })
  }
};

export const logout = async (req, res) => { 
  res.clearCookie("token");
  res.status(200).json({ msg: "user logged out successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({ msg: "user found", user: rest})
  }
  catch (err) {
    console.error(err.body)
    res.status(500).json({ errors: "internal server error" })
  }
};

export const updateDetails = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    let user = await User.findOne(res.user);
    if (!user) {
      return res.status(404).json({ msg: "user not found" })
    }

    let exixt = await User.findOne({ email });
    if (exixt && exixt._id.toString() !== user._id.toString()) {
      return res.status(404).json({ msg: "user alredy exists" })
    }
    user.name = name;
    user.email = email;
    user.age = age;

    await user.save()
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({ msg: "user updated", rest })
  } catch (err) {
    console.error(err.body)
    res.status(500).json({ errors: "internal server error" })
  }
};

export const updatePassword = async (req, res) => {
  const { password, newpassword } = req.body;
  try {
    let user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      returnres.status(400).json({ msg: "invalid crdentials" })
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newpassword, salt)
    user.save()
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({ msg: "user password updated", rest })

  } catch (err) {
    console.error(err.body)
    res.status(500).json({ errors: "internal server error" })
  }
};

export const deleteUser = async (req, res) => {

  try {
    const user1 = await User.findById(req.user);
    if (!user1) {
      res.status(404).json({ msg: "user not found" });
    }
    await Todo.deleteMany({ user: req.user });
    res.clearCookie("token");
    await user1.deleteOne();
    res.status(200).json({ msg: "user deleted succsessfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ errors: "internal server error" })
  }

};
