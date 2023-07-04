const valueModel = require("../models/input-model");

class ValueService {
  async create(input) {
    const dataToSave = new valueModel({ value: input });
    await dataToSave.save();

    return dataToSave;
  }

  async delete(id) {
    const { _id, value } = await valueModel.findByIdAndDelete(id);
    return { _id, value };
  }

  async edit(id, newValue) {
    const changedInput = await valueModel.findByIdAndUpdate(id, {
      value: newValue,
    });
    return changedInput;
  }

  async getOne(id) {
    const obj = await valueModel.findById(id);
    return obj;
  }

  async getAll() {
    const allInputs = await valueModel.find();
    return allInputs;
  }
}

module.exports = new ValueService();
