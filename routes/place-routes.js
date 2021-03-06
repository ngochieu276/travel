const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-control");
const user = require("../models/user");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
const place = require("../models/place");

const router = express.Router();

router.get("/", placesControllers.getPlaces);

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/", placesControllers.searchByQuery);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
