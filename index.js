import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
const jwtPass = "0000000000000";

const users = [];
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/", function(req, res){            //frontend part ko idhar se connect kr diya like jaise hi localhost:3000 search krenge backend server strt krne ke badd then woh yeh file ko return krega 
    res.sendFile(__dirname + "/public/a.html");
})

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, username, password } = req.body;
  users.push({
    name,
    username,
    password,
    todo: {},
  });
  res.json({ mess: "Signup Done" });
});

// SIGNIN
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const verify_user = users.find(
    (ele) => ele.username === username && ele.password == password
  );
  if (!verify_user) return res.json("Incorrect Data");

  const token = jwt.sign({ username }, jwtPass);
  res.json({ token });
});

// AUTH MIDDLEWARE
function auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, jwtPass);

  if (!decoded)
    return res.json({
      mess: "Sign in First",
    });

  req.username = decoded.username;
  next();
}

// USER INFO
app.get("/UserInfo", auth, (req, res) => {
  const data = users.find((ele) => ele.username === req.username);
  if (!data) return res.json({ mess: "NO user FOUND" });

  res.json({
    name: data.name,
    username: data.username,
    password: data.password,
  });
});

// CREATE TODO
app.post("/createtodo", auth, (req, res) => {
  const todo = req.body.todo;
  const data = users.find((ele) => ele.username === req.username);
  if (!data) return res.json({ mess: "NO user FOUND" });

  const nextId = Object.keys(data.todo).length + 1;
  data.todo[nextId] = {
    todo,
    isDone: false,
  };

  res.json({
    mess: "Todo created",
  });
});

// GET ALL TODOS
app.get("/all/todo", auth, (req, res) => {
  const data = users.find((ele) => ele.username === req.username);
  if (!data) return res.json({ mess: "NO user FOUND" });

  res.json({
    todo: data.todo,
  });
});

// UPDATE TODO
app.patch("/update/todo", auth, (req, res) => {
  const { id, todo } = req.body;
  const data = users.find((ele) => ele.username === req.username);

  if (!data) return res.json({ mess: "NO user FOUND" });

  if (!data.todo[id]) {
    return res.json({ mess: "No Todo Found for this ID" });
  }

  data.todo[id].todo = todo;

  res.json({
    mess: "Todo Updated",
    todo: data.todo,
  });
});

app.patch("/isDone", auth , (req,res)=>{
    const { id, isDone } = req.body;
    const user = req.username;
    const data = users.find(ele => ele.username === user);
    if(!data){
        return res.json({
            mess : "Not user Found"
        })
    }
    data.todo[id].isDone = isDone;
    res.json({
    mess: "Todo Updated",
    todo: data.todo,
  });
})

app.listen(3000, () => console.log("live on port : 3000"));
