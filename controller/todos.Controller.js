import Todo from "../models/todo.js";


export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "todo not found" });
    }
    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ msg: "not authorize" });
    }
    res.status(200).json({ msg: "todo found", todo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: "internal server error" })
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json({ msg: "todo found", todos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: "internal server error" })
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      user: req.user
    })
    res.status(201).json({ msg: "todo created ", todo });
  }
  catch (err) {
    // console.log(err);
    res.status(500).send({ errors: "internal server error" })
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "todo not found" });
    }
    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ msg: "not authorize" });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await todo.save(
      res.status(200).json({ msg: "todo updated" })
    )

  }
  catch (err) {
    console.log(err);
    res.status(500).send({ errors: "internal server error" })
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "todo not found" });
    }
    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ msg: "not authorize" });
    }
    await todo.deleteOne()
    res.status(200).send({ msg: "todo deleted" })
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ errors: "internal server error" })
  }
};