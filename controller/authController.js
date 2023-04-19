import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { database } from '../connect.js';

export const register = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  database.query(q, [req.body.username], (error, data) => {

    if (error)
      return res.status(500).json(error);

    if (data.length)
      return res.status(409).json('user already exists!');

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`name`, `username`, `email`, `password`) VALUE (?)";
    const values = [req.body.name, req.body.username, req.body.email, hashedPass];

    database.query(q, [values], (error, data) => {

      if (error)
        return res.status(500).json(error);

      return res.status(200).json('user has been created!');
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users where username = ?";

  database.query(q, [req.body.username], (error, data) => {

    if (error)
      return res.status(500).json(error);

    if (data.length === 0)
      return res.status(404).json('user not found!');

    const checkPass = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPass)
      return res.status(404).json('incorrect password!');

    const token = jwt.sign({ id: data[0].id }, "secretKey");

    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true
    }).status(200).json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("user has been logged out!");
};
