let dashborad = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Profile Found",
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "Internal server Error. please try again later",
    });
  }
};
module.exports = dashborad;