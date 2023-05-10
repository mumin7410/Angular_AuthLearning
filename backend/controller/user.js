const { Users } = require('../model/user')
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const SignUp = async(req,res) => {
    const { name, email, password } = req.body;
    const pwd = await bcrypt.hash(password, 10);
    await Users.signup(name, email, pwd);
    res.status(201).send('Profile created successfully');
}

const Signin = async(req, res) => {
    const { name, email, password } = req.body;
    const [Row, Field] = await Users.Signin(name, email, password);
    const user = Row[0];
    if (!user) {
        return res.status(401).json({
          message: 'Authentication failed 1',
        });
    }
    const response = await bcrypt.compare(req.body.password, user.password);
    if (!response) {
        return res.status(401).json({
          message: 'Authentication failed 2',
        });
    }

    let jwtToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        }
    );
    res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: user.id,
    });
}

const GetUser = async(req, res) => {
  const _id = req.params.id;
  let [y] = await Users.GetUser(_id);
  res.status(201).json(y);
}

module.exports = { SignUp, Signin, GetUser };