const router = require("express").Router();
const {addFavorite,getFavorites,getFavoriteById,deleteFavorite,getFavoritesByUserId} = require("./favourite.controller");


router.post("/", addFavorite);
router.get("/", getFavorites);
router.get("/:fav_id", getFavoriteById);
router.get("/user/:user_id", getFavoritesByUserId);
router.delete("/:fav_id", deleteFavorite);

module.exports = router;
