//* Connection to Firebase */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import admin from "firebase-admin";
const serviceAcount = require("../databases/firebase/backend-32070-c810f-firebase-adminsdk-rvp1q-1572d0b9c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAcount),
});
class ContainerFirebase {
  constructor(name) {
    this.connect();
    const db = admin.firestore();
    this.query = db.collection(name);
  }

  async connect() {
    console.log("Firebase Connected");
  }

  async getAllFile() {
    try {
      const data = await this.query.get();
      const response = data.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      return response;
    } catch (error) {
      throw new Error("Error al realizar lectura" + error);
    }
  }

  async getById(id) {
    try {
      const doc = this.query.doc(id);
      const response = await doc.get();
      return { id: response.id, ...response.data() };
    } catch (error) {
      throw new Error("Error al realizar lectura" + error);
    }
  }

  async saveInFile(element) {
    try {
      const data = await this.query.doc();

      await data.create(element).then((res) => console.log(res));

      return "Producto cargado correctamente";
    } catch (error) {
      throw new Error("Error al guardar en base de datos" + error);
    }
  }

  async updateById(id, newValues) {
    try {
      const doc = this.query.doc(id);
      const modifiedDoc = await doc.update(newValues);
      return modifiedDoc;
    } catch (error) {
      throw new Error("Error al actualizar base de datos" + error);
    }
  }

  async deleteById(id) {
    try {
      const doc = this.query.doc(id);
      await doc.delete();
      return "Documento eliminado correctamente";
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }
}

export default ContainerFirebase;
