import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

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
  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (userid) => {
  await db.User.destroy({
    where: { id: userid },
  });
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return (user = user.get({ plain: true }));
  //console.log(">>>check user:", user, "id =", id);
};

const updateUserInfo = async (email, username, id) => {
  // Change everyone without a last name to "Doe"
  console.log("===>>Check user updateuserinfor", email, username, id);

  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     " UPDATE users SET email = ?, username = ? WHERE id=?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (erro) {
  //   console.log("check erro list: ", erro);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
