const { model, Schema } = require('mongoose');

const informationSchema = new Schema({
  businessName: String,
  address: String,
  ownerName: String,
  employeeSize:String,
  createdAt: String,
  userName:String,

});

module.exports = model('Information', informationSchema);
