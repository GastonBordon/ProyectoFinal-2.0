import admin from "firebase-admin";
console.log(process.env.FIREBASE_PATH);
import serviceAcount from "../databases/firebase/backend-32070-c810f-firebase-adminsdk-rvp1q-4a3b561c55.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAcount),
});
console.log("Firestore connected");

class ContainerFirebase {
  constructor(name) {
    const db = admin.firestore();
    this.query = db.collection(name);
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
      return response.data();
    } catch (error) {
      throw new Error("Error al realizar lectura" + error);
    }
  }

  async saveInFile(element) {
    try {
      const data = await this.query.doc();
      await data.create(element).then((res) => console.log(res));
      return "Prueba";
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
