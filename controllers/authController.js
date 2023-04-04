const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/keys");

module.exports.register__controller = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword,role,status,teacherType} = req.body;

    const userInfo = await UserModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    //console.log("ROle",role);
    
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      userName,
      email,
      password: hash,
      role,
      teacherType
    });

    user
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

//TODO: Login Controller

module.exports.login__controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await (await UserModel.findOne({ email }));

    if (!userInfo) {
      return res.status(401).json({
        errors: { userExist: "User not exist Please register and then login again" },
      });
    }

    // console.log(userInfo)
    bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            errors: { password: "password not matched" },
          });
        }

        if (userInfo.role !== "Admin" &&  userInfo.status==0) {
          return res.status(401).json({
            errors: { userExist: "Please connect admin to get Authorized" },
          });
        }
        userInfo.password=undefined
        
        const token = jwt.sign({ _id: userInfo._id,name: userInfo.userName,email: userInfo.email,role: userInfo.role }, SECRET_KEY);
        return res.status(200).json({
          userInfo,
          token,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};
