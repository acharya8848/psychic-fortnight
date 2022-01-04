const profileRouter = require('express').Router();
const Profile = require('../models/profile');

// phonesRouter.get('/', async (req, res) => {
//     const auth = req.currentUser;
//       const profileInfo = await Profile.find();
//       return res.json(phones.map((phone) => phone.toJSON()));
//   });

profileRouter.post('/', (req, res) => {
    var userData = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
    };
    const profile = new Profile(userData);
    const savedProfile = profile.save();
    return res.status(201).json(savedProfile);
  });

module.exports = profileRouter;