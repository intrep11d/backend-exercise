// controllers/profileController.js
exports.getProfile = (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email, 
    });
  };
