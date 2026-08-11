const Service = require('../models/Service');

async function listServices(req, res) {
  const services = await Service.find({ active: true });
  res.json(services);
}

async function getService(req, res) {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
}

async function createService(req, res) {
  const service = await Service.create(req.body);
  res.status(201).json(service);
}

async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
}

async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service deleted' });
}

module.exports = { listServices, getService, createService, updateService, deleteService };
