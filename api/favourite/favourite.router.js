const router = require("express").Router();
const {
    addFavorite,
    getFavorites,
    getFavoriteById,
    deleteFavorite,
    getFavoritesByUserId,
    getPetIdByUserId,
    deleteFavoriteByUserAndPet
} = require("./favourite.controller");

router.post("/", addFavorite);
router.get("/", getFavorites);
router.post("/id", getFavoriteById);           // Send { fav_id } in body
router.post("/user", getFavoritesByUserId); 
router.post("/pet", getPetIdByUserId);   // Send { user_id } in body
router.delete("/", deleteFavorite);   
router.delete("/byuser", deleteFavoriteByUserAndPet);            // Send { fav_id } in body

module.exports = router;
