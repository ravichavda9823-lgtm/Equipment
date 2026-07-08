const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");
const { get } = require("../app");

let Booking = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("booking");

    let { user_id, equipmentId, startDate, endDate, quantity, totalRupee } =
      req.body;

    if (!equipmentId || !startDate || !endDate || !quantity || !totalRupee) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const userdata = req.user;

    const booking = await collection.insertOne({
      user_id: ObjectId.createFromHexString(userdata.id),
      equip_id: ObjectId.createFromHexString(equipmentId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      quantity: quantity,
      totalRupee: totalRupee,
      status: "Pending",
      create_At: new Date(),
    });

    return res.status(201).send({
      status: true,
      message: "Booking Sucessfully...",
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const db = await connectDb();

    const bookingCollection = db.collection("booking");

    const booking = await bookingCollection
      .aggregate([
        // EQUIPMENT LOOKUP
        {
          $lookup: {
            from: "equipment",
            localField: "equip_id",
            foreignField: "_id",
            as: "equipmentData",
          },
        },

        // USER LOOKUP
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "userData",
          },
        },

        // UNWIND EQUIPMENT
        {
          $unwind: "$equipmentData",
        },

        // UNWIND USER
        {
          $unwind: "$userData",
        },

        // PROJECT DATA
        {
          $project: {
            _id: 1,

            startDate: 1,
            endDate: 1,
            quantity: 1,
            totalRupee: 1,
            status: 1,
            create_At: 1,

            // USER DATA
            user_id: "$userData._id",
            name: "$userData.username",
            email: "$userData.email",
            phone: "$userData.phone",

            // EQUIPMENT DATA
            equip_id: "$equipmentData._id",
            equipmentName: "$equipmentData.name",
            equipmentImage: "$equipmentData.image",
            equipmentPrice: "$equipmentData.price",
            equipmentBrand: "$equipmentData.brand",
          },
        },
      ])
      .toArray();

    console.log(booking);

    if (booking.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Data Not Found",
        data: null,
      });
    }

    res.status(200).send({
      status: true,
      message: "Data Found",
      data: booking,
    });

  } catch (error) {

    res.status(500).send({
      status: false,
      message: error.message,
    });

  }
};
let UpdateBookingStatus = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("booking");

    const { id } = req.params;
    const { status } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    res.send({
      status: true,
      message: "Booking status updated",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "Error updating status",
    });
  }
};

let DeleteBookingHistory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("booking");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Booking History Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};
module.exports = { Booking, getBooking, UpdateBookingStatus, DeleteBookingHistory };
