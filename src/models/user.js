const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: {
      type: String,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String, select: false },
    profileImage: { type: String },
    popularity: {
      type: Number,
      default: 0,
    },
    socials: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
)

// hook to update popularity
// userSchema.pre(/^find/, function (next) {
//   this.updateOne({}, { $inc: { popularity: 1 } }).exec()
//   next()
// })

module.exports = model('User', userSchema)
