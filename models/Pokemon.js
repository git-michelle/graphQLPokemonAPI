const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  base_experience: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  is_default: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  location_area_encounters: {
    type: String,
    required: true,
  },
  sprites: {
    type: Object,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// create a model from this schema
module.exports = mongoose.model("Pokemon", pokemonSchema);
