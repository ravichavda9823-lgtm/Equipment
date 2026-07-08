const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddEquipment = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("equipment");

    let { category_id, name, desc, specifications, price,rental_price,discount,delivery_charge, total_reviews,deposit,rating,image } = req.body;

    // const image = req.file ? `${req.file.filename}` : "";

    if (
      !category_id ||
      !image ||
      !name ||
      !desc ||
      !specifications ||
      !price ||
      !rental_price ||
      !delivery_charge ||
      !rating ||
      !total_reviews ||
      !discount ||
      !deposit
    ) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const equipment = await collection.insertOne({
      category_id: ObjectId.createFromHexString(category_id),
      image:image,
      name: name,
      desc: desc,
      delivery_charge:delivery_charge,
      specifications: specifications,
      price: price,
      discount:discount,
      deposit:deposit,
      rental_price:rental_price,
      total_reviews:total_reviews,
      rating:rating,
      status: "Active",
    });

    if (equipment.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Equipment Added Successfully...",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getEquipment = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("equipment");

    const equipment = await collection.find({}).toArray();

    if (equipment.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No Events Found",
        data: null,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Events Found",
        data: equipment,
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};


const getEquipmentById = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("equipment");

    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: false,
        message: "equipment ID is required",
      });
    }

    const equipment = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!equipment) {
      return res.status(404).send({
        status: false,
        message: "equipment not found",
        data: null,
      });
    }

    return res.status(200).send({
      status: true,
      message: "equipment details found",
      data: equipment,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};


const getEquipmentByCategory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("equipment");

    const category_id = req.params.category_id;

    if (!category_id) {
      return res.status(400).send({
        status: false,
        message: "Category ID is required",
      });
    }

    const events = await collection
      .find({ category_id: new ObjectId(category_id) })
      .toArray();

    if (events.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No Equipment Found for this Category",
        data: null,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Category Equipment Found",
      data: events,
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

let EditEquipment = async (req, res) => {
  try {
    let db = await connectDb();

    let collection = db.collection("equipment");

    let { id } = req.params;

    let {
      category_id,
      image,
      name,
      desc,
      delivery_charge,
      specifications,
      price,
      discount,
      deposit,
      rental_price,
      total_reviews,
      rating,
      status,
    } = req.body;

    let equipment = await collection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!equipment) {
      return res.status(404).json({
        status: false,
        Message: "Equipment Not Found",
      });
    }


    let updateEquipment = {
      category_id: category_id
        ? ObjectId.createFromHexString(category_id)
        : equipment.category_id,

      image: image || equipment.image,

      name: name || equipment.name,

      desc: desc || equipment.desc,

      delivery_charge:
        delivery_charge || equipment.delivery_charge,

      specifications:
        specifications || equipment.specifications,

      price: price || equipment.price,

      discount: discount || equipment.discount,

      deposit: deposit || equipment.deposit,

      rental_price:
        rental_price || equipment.rental_price,

      total_reviews:
        total_reviews || equipment.total_reviews,

      rating: rating || equipment.rating,

      status: status || equipment.status,
    };

  
    let updateQuery = await collection.updateOne(
      {
        _id: ObjectId.createFromHexString(id),
      },

      {
        $set: updateEquipment,
      }
    );

    console.log(updateQuery);

    if (updateQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Equipment Updated Successfully",
      });
    }
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. Please try again later.",
    });
  }
};

let DeleteEquipment = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("equipment");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Equipment Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

module.exports = { AddEquipment, getEquipment,getEquipmentByCategory, getEquipmentById, EditEquipment , DeleteEquipment};
