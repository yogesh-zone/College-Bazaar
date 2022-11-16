const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please fill in name"],
    trime: true,
  },

  description: {
    type: String,
    trime: true,
  },

  Category: {
    type: String,
    default: "All",
  },

  course: {
    type: String,
    require: [true, "Please select a course"],
  },

  semester: {
    type: String,
    require: [true, "Please fill in semester input!"],
  },

  allImage: [],

  price: {
    type: Number,
    require: [true, "Please set a price"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  address: {
    city: {
      type: String,
      trime: true,
    },
    state: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Ad", adSchema);
