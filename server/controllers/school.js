const mongoose = require('mongoose');

const School = require('../models/school');
const Course = require('../models/course');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.school_create = (req, res, next) => {
  const schoolname = req.body.name;
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const address = req.body.addres;
  const info = req.body.info;
  const image = req.body.req.files[0].path;
  const logo = req.files[1].path;
  
  // console.log('REQ file1', req.files[0].path);
  // console.log('REQ file2', req.files[1].path);

}