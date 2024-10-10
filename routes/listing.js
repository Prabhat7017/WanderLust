const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //Index Route ----->
  .get(wrapAsync(listingController.index))
  //Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
// Search route
// Search route
router.get('/search', async (req, res) => {
  const searchQuery = req.query.q; // Capture the search input from the query string

  try {
      // Search listings by title, location, or country (case-insensitive)
      const results = await Listing.find({
          $or: [
              { title: { $regex: searchQuery, $options: 'i' } }, // Search by title
              { location: { $regex: searchQuery, $options: 'i' } }, // Search by location
              { country: { $regex: searchQuery, $options: 'i' } } // Search by country
          ]
      }).populate('owner'); // Populate the owner field

      // Render the search results page with the listings found
      res.render('listings/searchResults', { results, searchQuery });
  } catch (err) {
      res.status(500).send('An error occurred while searching');
  }
});


router
  .route("/:id")
  //Show Route
  .get(wrapAsync(listingController.showListing))
  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //DELETE Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
