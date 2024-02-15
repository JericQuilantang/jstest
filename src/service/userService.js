const fs = require("fs");

//read
const users = JSON.parse(fs.readFileSync("./data/MOCK_DATA.json", "utf-8"));

function getuser() {
  return users;
}
function createuser(userData) {
  {
    //get last id of the users
    const newId = users[users.length - 1].id + 1;

    //merge new user with id to the existing users object
    const user = Object.assign({ id: newId }, userData);
    users.push(user);
    //write to existing users
    fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {});
  }
}
function updateuser(dataTobeUpdated, id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      error: `User ID #${id} not found`,
    };
  }
  //update the user info
  const index = users.indexOf(user);
  const newRecord = Object.assign(user, dataTobeUpdated);
  users[index] = newRecord;

  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    console.log(err);
  });

  return {
    success: true,
    statusCode: 200,
    user,
  };
}
function getuserbyid(id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      error: `User ID #${id} not found`,
    };
  }
  return {
    success: true,
    statusCode: 200,
    user,
  };
}
function deleteuser(id) {
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      error: `User ID #${id} not found`,
    };
  }
  //update the user info
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("./data/MOCK_DATA.json", JSON.stringify(users), (err) => {
    console.log(err);
  });
  return {
    success: true,
    user: null,
  };
}

module.exports = {
  getuser,
  createuser,
  updateuser,
  getuserbyid,
  deleteuser,
};
