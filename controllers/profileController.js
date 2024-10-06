// controllers/profileController.js
exports.getProfile = (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email, // You might need to fetch this from your data store
    });
  };