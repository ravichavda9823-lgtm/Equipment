const Razorpay = require("razorpay");

const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const { totalAmount } = req.body;

    console.log(totalAmount);

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).send({
      status: true,
      message: "Payment successfully...",
      data: order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { createOrder };