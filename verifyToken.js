

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
 
        const decoded = jwt.verify(token,"ahjkdfhkjsgh");
   tokenowner = decoded;
   req.user = decoded;
   

        //console.log( decoded );
        next();
    } catch (error) {
      //console.log(req.headers.authorization);
        return res.status(401).json({
            message: 'Auth failed'
          
        });
    }
};