import pkg from 'mongoose'
const { Schema, model, Types } = pkg


const schema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },

  completed: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }
})


export default model('Todo', schema)
