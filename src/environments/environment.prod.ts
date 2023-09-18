import { EnvironmentMap } from '@/environments/environmentMap';

export const environment: EnvironmentMap = {
  firebase: {
    projectId: 'kaapo-fit',
    appId: '1:269213411233:web:4db52810dd5e9b23d50de0',
    databaseURL:
      'https://kaapo-fit-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'kaapo-fit.appspot.com',
    locationId: 'europe-central2',
    apiKey: 'AIzaSyAtFNJKfF4ATlWsOCjKMT-8MKm73qIbOO0',
    authDomain: 'kaapo-fit.firebaseapp.com',
    messagingSenderId: '269213411233',
    measurementId: 'G-WLRKZBQ1GK',
  },
  useEmulators: false,
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyAtFNJKfF4ATlWsOCjKMT-8MKm73qIbOO0',
    authDomain: 'kaapo-fit.firebaseapp.com',
    projectId: 'kaapo-fit',
    storageBucket: 'kaapo-fit.appspot.com',
    messagingSenderId: '269213411233',
    appId: '1:269213411233:web:4db52810dd5e9b23d50de0',
    measurementId: 'G-WLRKZBQ1GK',
  },
  FIREBASE_API_KEY: 'AIzaSyAtFNJKfF4ATlWsOCjKMT-8MKm73qIbOO0',
  cloudinaryUploadURL: 'https://api.cloudinary.com/v1_1/kaapo/upload',
  cloudinaryDownloadURL: 'https://res.cloudinary.com/kaapo/image/upload',
  cloudinaryConfig: {
    cloud_name: 'kaapo',
    upload_preset: 'ml_default',
  },
  FRONTEND_APP_BASE_URL: 'https://kaapo.fit',
};
