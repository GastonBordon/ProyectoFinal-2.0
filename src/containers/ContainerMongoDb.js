//* Conection to MongoDb */
import connectDB from "../databases/mongoDB/connection.js";

import mongoose from "mongoose";

class ContainerMongoDb {
  constructor(name, schema) {
    let modelSchema = new mongoose.Schema(schema, { timestamps: true });
    this.collection = mongoose.model(name, modelSchema);
    this.connect();
  }

  async connect() {
    await connectDB();
  }

  async getAllFile() {
    try {
      const data = await this.collection.find();
      return data;
    } catch (error) {
      throw new Error("Error al realizar lectura" + error);
    }
  }

  async getById(id) {
    try {
      const data = await this.collection.findById(id);
      return data;
    } catch (error) {
      throw new Error("Error al realizar lectura" + error);
    }
  }

  async saveInFile(element) {
    try {
      const data = this.collection.create(element);
      return data;
    } catch (error) {
      throw new Error("Error al guardar en base de datos" + error);
    }
  }

  async updateById(id, newValues) {
    try {
      const filter = { _id: id };
      const update = newValues; //{products:[{},{}]}
      let data = await this.collection.findOneAndUpdate(filter, update, {
        new: true,
      });
      return data;
    } catch (error) {
      throw new Error("Error al actualizar base de datos" + error);
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ id });
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }
}

export default ContainerMongoDb;
