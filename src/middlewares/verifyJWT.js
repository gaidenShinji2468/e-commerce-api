const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if(!authHeader?.startsWith("Bearer "))
    res.status(401).json({
      statusCode: 401,
      message: "Unauthorized"
    });

  const TOKEN = authHeader.split(" ")[1];

  jwt.verify(
    TOKEN,
    process.env.TOKEN_SECRET,
    (err, decoded) => {
      if(err)
	res.status(403).json({
          statusCode: 403,
	  message: "Forbidden"
	});

      req.user = decoded.user;
      next();
    }
  );
}

module.exports = verifyJWT;
