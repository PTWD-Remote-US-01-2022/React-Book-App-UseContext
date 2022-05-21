// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    // title: {type: String, unique: true},
    title: String,
    description: String,
    author: String,
    rating: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

// instead of typing mongoose.model(), we can just say model() beacuse we destructured "model"
// variable in line 4
const Book = model('Book', bookSchema);
module.exports = Book;

// a single line that does the same as the 2 lines above
// module.exports = model("Book", bookSchema);

// books --> collection --> always lowercase and plural
// Book --> model --> always uppercase and singular
