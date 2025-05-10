class IRepository {
  async getAll() {
    throw new Error('Method not implemented');
  }

  async getById(id) {
    throw new Error('Method not implemented');
  }

  async create(data) {
    throw new Error('Method not implemented');
  }

  async update(id, data) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findByAttribute(attribute, value) {
    throw new Error('Method not implemented');
  }

  async findByPopulationGreaterThan(value) {
    throw new Error('Method not implemented');
  }
}

export default IRepository;
// Explicación:
// Define una clase abstracta que sirve como interfaz para los repositorios, asegurando que implementen los métodos necesarios.
