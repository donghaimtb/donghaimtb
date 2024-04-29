import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import bcrypt from "bcryptjs";
import db from "../models/index";
//import db from "./models/index";

const salt = bcrypt.genSaltSync(10);

// connection.connect(function (err) {
//   if (err) {
//     console.log("Error connecting" + err.stack);
//     return;
//   } else {
//     console.log("Connected as id" + connection.threadId);
//   }
// });

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (erro) {
    console.log("check erro: ", erro);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  let users = [];
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users ");
    return rows;
  } catch (erro) {
    console.log("check erro list: ", erro);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  // delete from users where id=""
  try {
    const [rows, fields] = await connection.execute(
      "delete from users where id=?",
      [id]
    );
    return rows;
  } catch (erro) {
    console.log("check erro list: ", erro);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "select * from users where id=?",
      [id]
    );
    return rows;
  } catch (erro) {
    console.log("check erro list: ", erro);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      " UPDATE users SET email = ?, username = ? WHERE id=?",
      [email, username, id]
    );
    return rows;
  } catch (erro) {
    console.log("check erro list: ", erro);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
