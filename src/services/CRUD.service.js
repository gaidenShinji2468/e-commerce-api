class CRUDService {
  constructor(Schema) {
    this.Schema = Schema;
  }

  async getAll() {
    const achieved = await this.Schema.findAll();

    return achieved;
  }

  async get(id) {
    const achieved = await this.Schema.findByPk(id);

    return achieved;
  }

  async create(data) {
    const created = await this.Schema.create(data);
    
    return created;
  }

  async update(id, data) {
    const updated = await this.Schema.update(data, {
      where: {id},
      returning: true
    });

    if(!updated[1].length === 0) return null;

    return updated[1][0];
  }

  async remove(id) {
    const removed = await this.Schema.destroy({
      where: {id},
      returning: true
    });

    return removed;
  }
};

module.exports = CRUDService;
