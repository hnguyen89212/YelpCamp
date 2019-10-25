var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

// ==============================================
// Campgrounds routes
// ==============================================
// Follow REST convention
// We have a page showing a list of camps
// Use get("/campgrounds")
// INDEX route
router.get("/", function(req, res) {
  Campground.find({}, function(err, all) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: all,
        currentUser: req.user
      });
    }
  });
});

// Here we have a form allowing users to input new camps
// Use post("/campgrounds") to follow REST conventions.
// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res) {
  // Get data from form
  var name = req.body.name;
  var price = req.body.price;
  var img = req.body.image;
  var description = req.body.description;
  // just a test-out
  // console.log(req.user);
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCamp = {
    name: name,
    price: price,
    image: img,
    description: description,
    author: author
  };
  // DB-based approach: create a new campground and save it to db
  Campground.create(newCamp, function(err, newCamp) {
    if (err) {
      console.log(err);
    } else {
      // just a test-out
      console.log(newCamp);

      // Redirect to campgrounds page
      res.redirect("/campgrounds"); // GET
    }
  });
});

// REST convention
// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, found) {
    res.render("campgrounds/edit", { campground: found });
  });
});

// UPDATE route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  //   var data = { name: req.body.name, image: req.body.image };
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// SHOW route
router.get("/:id", function(req, res) {
  // Find the campground with such id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, found) {
      if (err) {
        console.log(err);
      } else {
        // console.log(found);
        res.render("campgrounds/show", { campground: found });
      }
    });
});

// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// ==============================================
module.exports = router;
