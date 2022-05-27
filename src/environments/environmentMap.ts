export interface EnvironmentMap {
  firebase: {
    projectId: string;
    appId: string;
    databaseURL: string;
    storageBucket: string;
    locationId: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
  useEmulators: boolean;
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  FIREBASE_API_KEY: string;
  cloudinaryUploadURL: string;
  cloudinaryDownloadURL: string;
  cloudinaryConfig: {
    cloud_name: string;
    upload_preset: string;
  };
}
