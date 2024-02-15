const userService = require("../service/userService");

exports.getUserData = (req, res) => {
  const user = userService.getuser();
  res.status(200).json({
    status: "success",
    count: users.length,
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
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
};

exports.getOneUser = (req, res) => {
  const user = userService.getuserbyid(req.params.id);
  if (!user.success) {
    return res.status(user.statusCode).json({
      status: "fail",
      error: user.error,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user: user.user,
    },
  });
};

exports.updateUser = (req, res) => {
  const user = userService.updateuser(req.body, req.params.id);
  if (!user.success) {
    return res.status(user.statusCode).json({
      status: "fail",
      error: user.error,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.deleteUser = (req, res) => {
  const user = userService.deleteuser(req.params.id);
  if (!user.success) {
    res.status(user.statusCode).json({
      status: "fail",
      error: user.error,
    });
  }
  res.status(204).json({
    data: user,
  });
};
