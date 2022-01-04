const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
});

// profileSchema.set('toJSON', {
//   transform: (doc, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model('Profile', profileSchema);