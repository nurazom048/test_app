 const jwt = require ("jsonwebtoken");



module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {console.log( "You are not authenticated!"); }


  jwt.verify(token, "ahjkdfhkjsgh", (err, tokenuser) => { 
    if (err) {console.log( "Token is not valid!");}
    req.username = tokenuser;
    next()
  });
};
//export default verifyToken;
