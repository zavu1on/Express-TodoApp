import pkg from 'mongoose'
const { Schema, model } = pkg


const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    minlength: 4,
    required: true
  }
})


export default model('User', schema)
