const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddInquirary = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("inquirary");

    let {name ,email, subject, message, status } = req.body;

    if (!name|| !email || !subject || !message) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const userdata = req.user;

    const inquirary = await collection.insertOne({
      user_id: ObjectId.createFromHexString(userdata.id),
      name:name,
      email:email,
      subject: subject,
      message: message,
      status:  "Active",
      Create_At: new Date(),
    });

    if (inquirary.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Inquirary Added Successfully",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
};

const getInquirary = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("inquirary");

    const inquirary = await collection.find({}).toArray();

    if (inquirary.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No inquirary Found",
        data: null,
      });
    }

    return res.status(200).send({
      status: true,
      message: "inquirary Found",
      data: inquirary,
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
};

const ReplyInquiry = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("inquirary");

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
        message: "Inquiry not found",
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

  let DeleteInquiry = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("inquirary");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "inquirary Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};


module.exports = {AddInquirary, getInquirary, ReplyInquiry, DeleteInquiry}
