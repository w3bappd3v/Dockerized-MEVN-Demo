const db = require("../models");
const Listing = db.listings;

// Create and Save a new Listing
exports.create = (req, res) => {
  console.log('create');
  // Validate request
  if (!req.body.address) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Listing
  const listing = new Listing({
    address: req.body.address,
    neighborhood: req.body.neighborhood,
    price: req.body.price,
    summary: req.body.summary,
    image: req.body.image
  });

  // Save Listing in the database
  listing
    .save(listing)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Listing."
      });
    });
};

// Retrieve all Listings from the database.
exports.findAll = (req, res) => {
  console.log('all');
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Listing.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving listings."
      });
    });
};

// Find a single Listing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Listing.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Listing with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Listing with id=" + id });
    });
};

// Update a Listing by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Listing.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Listing with id=${id}. Maybe Listing was not found!`
        });
      } else res.send({ message: "Listing was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Listing with id=" + id
      });
    });
};

// Delete a Listing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Listing.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Listing with id=${id}. Maybe Listing was not found!`
        });
      } else {
        res.send({
          message: "Listing was deleted successfully!",
          id: id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Listing with id=" + id
      });
    });
};

// Delete all Listings from the database.
exports.deleteAll = (req, res) => {
  Listing.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Listings were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all listings."
      });
    });
};

// Find all published Listings
exports.findAllPublished = (req, res) => {
  Listing.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving listings."
      });
    });
};