const valueService = require("../services/ivalue-service");

class ValueController {
  async create(req, res) {
    try {
      const { value, ...rest } = req.body;
      const dataToSend = await valueService.create(value);
      return res.json(dataToSend);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const dataToSend = await valueService.delete(id);
      return res.json(dataToSend);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const { value, ...rest } = req.body;
      const dataToSend = await valueService.edit(id, value);
      return res.json(dataToSend);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const dataToSend = await valueService.getOne(id);
      return res.json(dataToSend);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const dataToSend = await valueService.getAll();
      return res.json(dataToSend);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}

module.exports = new ValueController();
