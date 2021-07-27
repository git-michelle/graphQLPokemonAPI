const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  base_experience: {
    type: Number,
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
module.exports = mongoose.model("Pokemon", PokemonSchema);
