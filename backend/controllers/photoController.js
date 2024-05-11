const { text } = require("express");
var PhotoModel = require("../models/photoModel.js");

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {
  /**
   * photoController.list()
   */
  list: function (req, res) {
    PhotoModel.find({ isVisible: true })
      .populate("postedBy")
      .exec(function (err, photos) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting photo.",
            error: err,
          });
        }
        return res.json(photos);
      });
  },

  /**
   * photoController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    PhotoModel.findOne({ _id: id })
      .populate("postedBy")
      .populate("comments.postedBy")
      .exec(function (err, photo) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting photo.",
            error: err,
          });
        }

        if (!photo) {
          return res.status(404).json({
            message: "No such photo",
          });
        }

        return res.json(photo);
      });
  },

  /**
   * photoController.create()
   */
  create: function (req, res) {
    var photo = new PhotoModel({
      name: req.body.name,
      message: req.body.message,
      path: "/images/" + req.file.filename,
      postedBy: req.session.userId,
      views: 0,
      likes: 0,
    });

    photo.save(function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating photo",
          error: err,
        });
      }

      return res.status(201).json(photo);
    });
  },

  /**
   * photoController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    PhotoModel.findOne({ _id: id }, function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting photo",
          error: err,
        });
      }

      if (!photo) {
        return res.status(404).json({
          message: "No such photo",
        });
      }

      photo.name = req.body.name ? req.body.name : photo.name;
      photo.message = req.body.message ? req.body.message : photo.message;
      photo.path = req.body.path ? req.body.path : photo.path;
      photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
      photo.views = req.body.views ? req.body.views : photo.views;
      photo.likes = req.body.likes ? req.body.likes : photo.likes;

      photo.save(function (err, photo) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating photo.",
            error: err,
          });
        }

        return res.json(photo);
      });
    });
  },

  /**
   * photoController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    PhotoModel.findByIdAndRemove(id, function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the photo.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },

  like: function (req, res) {
    PhotoModel.findById(req.params.id, function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting photo",
          error: err,
        });
      }
      if (photo.likedBy.includes(req.session.userId)) {
        return res.status(400).json({
          message: "User already liked this photo",
        });
      }
      photo.likedBy.push(req.session.userId);
      if (photo.dislikedBy.includes(req.session.userId)) {
        photo.dislikedBy = photo.dislikedBy.filter(
          (id) => id !== req.session.userId
        );
        photo.likes += 2; // Increase by 2 if user previously disliked
      } else {
        photo.likes++;
      }
      photo.save();
      return res.json(photo);
    });
  },

  dislike: function (req, res) {
    PhotoModel.findById(req.params.id, function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting photo",
          error: err,
        });
      }
      if (photo.dislikedBy.includes(req.session.userId)) {
        return res.status(400).json({
          message: "User already disliked this photo",
        });
      }
      photo.dislikedBy.push(req.session.userId);
      if (photo.likedBy.includes(req.session.userId)) {
        photo.likedBy = photo.likedBy.filter((id) => id !== req.session.userId);
        photo.likes -= 2; // Decrease by 2 if user previously liked
      } else {
        photo.likes--;
      }
      photo.save();
      return res.json(photo);
    });
  },

  addComment: function (req, res) {
    var comment = {
      text: req.body.text,
      postedBy: req.session.userId,
    };
    PhotoModel.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }, // This will make findByIdAndUpdate return the updated document
      function (err, photo) {
        if (err) {
          return res.status(500).json({
            message: "Error when adding comment",
            error: err,
          });
        }
        // Populate postedBy in comments before returning
        PhotoModel.populate(
          photo,
          { path: "comments.postedBy" },
          function (err, photo) {
            if (err) {
              return res.status(500).json({
                message: "Error when populating comments",
                error: err,
              });
            }
            return res.json(photo);
          }
        );
      }
    );
  },

  report: function (req, res) {
    PhotoModel.findById(req.params.id, function (err, photo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting photo",
          error: err,
        });
      }
      photo.reports++;
      if (photo.reports >= 2) {
        photo.isVisible = false;
      }
      photo.save();
      return res.json(photo);
    });
  },
};
