// models/userModel.js
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

let users = require(usersFile);

const saveUsers = () => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

module.exports = {
  getUsers: () => users,
  addUser: (user) => {
    users.push(user);
    saveUsers();
  },
  findUser: (predicate) => users.find(predicate),
};