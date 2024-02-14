const express = require("express");
const fs = require("fs");

//read
const users = JSON.parse(fs.readFileSync("./data/MOCK_DATA.json", "utf-8"));

//write
//fs.writeFile()
const app = express();
app.use(express.json());

const port = 8000;

//get request
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    count: users.length,
    data: {
      users,
    },
  });
});

//post data
app.post("/users", (req, res) => {
  //get last id of the users
  const newId = users[users.length - 1].id + 1;

  //merge new user with id to the existing users object
  const user = Object.assign({ id: newId }, req.body);
  users.push(user);
  //write to existing users
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    //send the response to the client
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  });
});

//get one
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({
      status: "fail",
      error: `User ID #${req.params.id} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

//update
app.patch("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({
      status: "fail",
      error: `User ID #${req.params.id} not found`,
    });
  }
  //update the user info
  const index = users.indexOf(user);
  const newRecord = Object.assign(user, req.body);
  users[index] = newRecord;

  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        newRecord,
      },
    });
  });
});

//delete
app.delete("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({
      status: "fail",
      error: `User ID #${req.params.id} not found`,
    });
  }
  //update the user info
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    res.status(204).json({
      data: null,
    });
  });
});
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
