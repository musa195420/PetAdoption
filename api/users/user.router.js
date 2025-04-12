const{    registerUser,getAllUsers,getUserById,updateUser,deleteUser,login}= require("./user.controller");
const {addUserValdation} = require("../../validation/users/user.validation");
const { refreshTokenHandler, logout } = require("../auth/refresh_token");
const router = require ("express").Router();
const {checkToken} =require("../auth/token_validation");

router.post("/", addUserValdation, registerUser);
router.get("/",checkToken,getAllUsers);
router.get("/id/",checkToken,getUserById);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);
router.post("/token", refreshTokenHandler);
router.post("/logout", logout);
module.exports=router;