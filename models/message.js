const {mongoose} = require('./../config/mongoose');

const Messageschema = new mongoose.Schema({
    name : String,
    message : String
  });
const Message = mongoose.model('message',Messageschema);
module.exports = Message;