const { Schema, model } = require("mongoose");

const InputSchema = new Schema({
  value: { type: String, required: true },
});

module.exports = model("Input", InputSchema);
