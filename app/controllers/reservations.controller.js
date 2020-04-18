
// customer controller, holds all the methods for dealing with customers in the db
// Won't really have to touch this as it's just verifying data

const Reservations = require("../models/reservations.model.js");

exports.findAll = (req, res) => {
  Reservations.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Reservations.findById(req.params.resId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation not found with id ${req.params.resId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with id " + req.params.resId
        });
      }
    } else res.send(data);
  });
};

exports.findPerRestaurant = (req, res) => {
  Reservations.getPerRestaurant(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with branch id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.createReservation = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const reservation = new Reservations({
    FK_branchId: req.body.FK_branchId,
    resId: req.body.resId,
    guestCount: req.body.guestCount,
    requestedTime: req.body.requestedTime,
    reservationSource: req.body.reservationSource,
    custId: req.body.custId
  });

  Reservations.makeReservation(reservation, (err, data) => {
      //console.log("Testing req.params");
      console.log(reservation);
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
};

//get reservation by customer

exports.findResFromCust = (req, res) => {
  Reservations.getReservationFromCustomer(req.params.custId, (err, data) => {
    //console.log("Testing req.params");
    console.log(req.params.custId);
    //console.log(req.query.custId);

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Could not find reservations for customer with id ${req.params.custId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation for customer with id " + req.params.custId
        });
      }
    } else res.send(data);
  });
};


// delete reservation

exports.removeReservation = (req, res) => {
  Reservations.deleteReservation(req.params.resId , (err, data) => {
    //console.log("Testing req.params");
    console.log(req.params.resId);
    //console.log(req.query.custId);

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Could not create reservation with id ${req.params.resId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with id " + req.params.resId
        });
      }
    } else res.send(data);
  });
};