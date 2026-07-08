const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddFeedback = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("feedback");

    let { name, email, booking_id, rating, message } = req.body;

    if (!booking_id || !name || !email || !rating || !message) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const userdata = req.user;

    const feedback = await collection.insertOne({
      user_id: ObjectId.createFromHexString(userdata.id),
      booking_id: ObjectId.createFromHexString(booking_id),
      name: name,
      email: email,
      rating: rating,
      message: message,
      status: "Active",
      createdAt: new Date(),
    });

    if (feedback.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Feedback Added Successful",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};



const getFeedback = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("feedback");

    const feedback = await collection.find({}).toArray();

    if (feedback.length === 0) {
      res
        .status(404)
        .send({ status: false, message: "Data Not Found", data: null });
    } else {
      res
        .status(200)
        .send({ status: true, message: "Data Found", data: feedback });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const replyFeedback = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("feedback");

    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res.status(400).send({
        status: false,
        message: "Reply is required",
      });
    }

    const existing = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existing) {
      return res.status(404).send({
        status: false,
        message: "Feedback not found",
      });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          reply: reply,
          status: "Replied",
          repliedAt: new Date(),
        },
      },
    );

    return res.status(200).send({
      status: true,
      message: "Reply sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

let DeleteFeedback = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("feedback");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Feedback Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

module.exports = {AddFeedback, getFeedback, replyFeedback, DeleteFeedback}