import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ msg: "not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ errors: "internal server error from autho" })
  }
}
export default authorize;