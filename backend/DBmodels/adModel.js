const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please fill name of item!"],
    trime: true,
  },

  description: {
    type: String,
    trime: true,
  },

  image: [
    {
      url: {
        type: String,
        require: [true, "Please upload your item's image!"],
      },
      public_id: {
        type: String,
        require: [true, "Please upload your item's image!"],
      },
    },
  ],

  Category: {
    type: String,
    default: "All",
  },

  semester: {
    type: String,
    require: [true, "Please fill in semester input!"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: String,
    require: [true, "Please fill in course detail"],
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
