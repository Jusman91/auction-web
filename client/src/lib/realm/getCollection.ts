import { getRealmApp } from './realmAppService';

/**
 * Fungsi reusable untuk mendapatkan koleksi dari MongoDB Realm.
 * @param dbName Nama database yang ingin diakses
 * @param collectionName Nama koleksi yang ingin diakses
 * @returns Promise yang mengembalikan koleksi MongoDB
 */
export const getCollection = async (
  dbName: string,
  collectionName: string
) => {
  const app = await getRealmApp(); // Menggunakan fungsi getRealmApp untuk inisialisasi Realm
  const mongodb = app.currentUser!.mongoClient('mongodb-atlas'); // Menggunakan MongoDB Atlas

  // Mengakses koleksi sesuai dengan parameter yang diberikan
  const collection = mongodb.db(dbName).collection(collectionName);

  if (!collection) {
    throw new Error(
      'Failed to connect to the server or invalid collection.'
    );
  }

  return collection;
};
