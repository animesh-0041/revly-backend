const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, "revly");
      req.body.userID = decoded.userID;
      req.body.userEmail = decoded.userEmail;
      req.body.userType = decoded.userType;
      // console.log(decoded);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send({ msg: "Unauthorized" });
  }
};

module.exports = {
  auth
};