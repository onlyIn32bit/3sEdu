import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBUCVl1n17cRXRTbxSEJU6BLzleta44HG4',
	authDomain: 'dedu-8d0ce.firebaseapp.com',
	projectId: 'dedu-8d0ce',
	storageBucket: 'dedu-8d0ce.appspot.com',
	messagingSenderId: '187420501022',
	appId: '1:187420501022:web:3882e30e5da28986cdfa0f',
	measurementId: 'G-BTG8P7C7QY'
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}
const auth = getAuth();
const db = getFirestore();

export { auth, db };
