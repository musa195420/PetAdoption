const{    registerUser,getAllUsers,getUserById,updateUser,deleteUser,login,getUserByEmail,uploadUserImage,getProfileById}= require("./user.controller");
const {addUserValdation} = require("../../validation/users/user.validation");
const { refreshTokenHandler, logout } = require("../auth/refresh_token");
const router = require ("express").Router();
const {checkToken} =require("../auth/token_validation");
const upload = require("../../config/upload"); 



router.post("/upload-profile", upload.single('image'), uploadUserImage);
router.post("/", addUserValdation, registerUser);
router.get("/",checkToken,getAllUsers);
router.post("/id/",checkToken,getUserById);
router.post("/id/profile", checkToken, getProfileById);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/email",checkToken,getUserByEmail);
router.post("/login",login);
router.post("/token", refreshTokenHandler);
router.post("/logout", logout);
module.exports=router;