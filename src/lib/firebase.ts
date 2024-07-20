import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCEKkn3d4X85FQSn4gA9K1yuZzi70W0xIs',
	authDomain: 'pathtoknow-cd465.firebaseapp.com',
	projectId: 'pathtoknow-cd465',
	storageBucket: 'pathtoknow-cd465.appspot.com',
	messagingSenderId: '753909775887',
	appId: '1:753909775887:web:657b699253dbaabf2bad7a',
	measurementId: 'G-H1PC92RCQ7'
};

let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
