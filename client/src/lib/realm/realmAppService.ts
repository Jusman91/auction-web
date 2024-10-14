// src/services/realmAppService.ts
import { VITE_REALM_APP_ID } from '@/env';
import * as Realm from 'realm-web';

// Variabel untuk menyimpan instance Realm.App
let appInstance: Realm.App | null = null;

/**
 * Mendapatkan instance Realm.App. Jika belum diinisialisasi, maka akan dibuat dan login secara anonim.
 * @returns Promise yang mengembalikan instance Realm.App
 */
export async function getRealmApp(): Promise<Realm.App> {
  if (!appInstance) {
    // Inisialisasi Realm.App dengan ID aplikasi dari environment
    appInstance = new Realm.App({ id: VITE_REALM_APP_ID as string });

    // Membuat kredensial anonim
    const credentials = Realm.Credentials.anonymous();

    try {
      // Login ke Realm secara anonim
      await appInstance.logIn(credentials);
      console.log('Logged in anonymously to Realm.');
    } catch (error) {
      console.error('Failed to log in to Realm:', error);
      // Reset instance jika login gagal
      appInstance = null;
      throw error;
    }
  }

  return appInstance;
}
