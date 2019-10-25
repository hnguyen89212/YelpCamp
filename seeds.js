/* 
The purpose is to 
1. Wipe out all campgrounds
2. Automatically create several blogs and comments
to test out app without having to input data by hand
*/

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud Rest",
    image:
      "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec orci laoreet, ultricies magna id, commodo orci. Nam sit amet nisi lorem. Maecenas mattis imperdiet accumsan. Praesent lacus nisl, aliquam."
  },
  {
    name: "Desert Mesa",
    image:
      "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_960_720.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec orci laoreet, ultricies magna id, commodo orci. Nam sit amet nisi lorem. Maecenas mattis imperdiet accumsan. Praesent lacus nisl, aliquam."
  },
  {
    name: "Canyon Floor",
    image:
      "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec orci laoreet, ultricies magna id, commodo orci. Nam sit amet nisi lorem. Maecenas mattis imperdiet accumsan. Praesent lacus nisl, aliquam."
  }
];

function seedDB() {
  // --------------------------------------------
  // Wipe out all campgrounds
  Campground.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("I have removed all campgrounds!");
    // --------------------------------------------
    // Add dummy test campgrounds --> Place it inside callback after removing everything
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campsite");
          // ------------------------------------
          // For each successfully created campisite, create several comments!
          // Place it inside the callback after creating a campground!
          Comment.create(
            {
              text: "The site is greate. Though I wish there were internet!",
              author: "Homer Flacher"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
              }
            }
          );
        }
      });
    });
    // ------------------------------------------
  });
}

module.exports = seedDB;
