const router = require("express").Router();
const {
    addFavorite,
    getFavorites,
    getFavoriteById,
    deleteFavorite,
    getFavoritesByUserId
} = require("./favourite.controller");

router.post("/", addFavorite);
router.get("/", getFavorites);
router.get("/id", getFavoriteById);           // Send { fav_id } in body
router.get("/user", getFavoritesByUserId);    // Send { user_id } in body
router.delete("/", deleteFavorite);               // Send { fav_id } in body

module.exports = router;
