function isAdmin(req, res, next) {
  const logged = req.user;

  if(logged.role !== "admin")
    res.status(403).json({
      statusCode: 403,
      message: "Forbidden"
    });
  next();
}

module.exports = isAdmin;
