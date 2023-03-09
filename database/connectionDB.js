import mongoose from "mongoose";

const connectionDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to DB"))
    .catch(err => console.error(err.message))
};

export default connectionDB;