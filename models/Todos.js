const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const TodosSchema= new Schema({
  title: {
    type: String,
    required: true
  }, 
  description: String
}, {timestamps: true }); //createdAt: //updatedAt:

module.exports = mongoose.model('Todos', TodosSchema);