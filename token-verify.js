const jwt = require("jsonwebtoken");
const token = require("./token-sign")


const secret = "myCat";


function verifyToken(token, secret){
  return jwt.verify(token, secret)
};

const payload = verifyToken(token, secret);
console.log(payload);
