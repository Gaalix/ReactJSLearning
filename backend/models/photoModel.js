var mongoose = require("mongoose");
const { report } = require("../routes/photoRoutes");
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  name: String,
  message: String,
  path: String,
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  views: Number,
  likes: Number,
  comments: [
    {
      text: String,
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  dislikedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  reports: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("photo", photoSchema);
