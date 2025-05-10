import IRepository from './IRepository.mjs';
import Country from '../models/Country.mjs';

class CountryRepository extends IRepository {
  async getAll() {
    return await Country.find();
  }

  async getById(id) {
    return await Country.findById(id);
  }

  async create(data) {
    const country = new Country(data);
    return await country.save();
  }

  async update(id, data) {
    return await Country.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Country.findByIdAndDelete(id);
  }

  async findByAttribute(attribute, value) {
    const query = {};
    query[attribute] = value;
    return await Country.find(query);
  }

  async findByPopulationGreaterThan(value) {
    return await Country.find({ population: { $gt: value } });
  }

  async deleteAll() {
    return await Country.deleteMany({});
  }

  async insertMany(data) {
    return await Country.insertMany(data);
  }
}

export default CountryRepository;

// Este repositorio gestiona las operaciones de datos para países hispanohablantes almacenados como superhéroes.
