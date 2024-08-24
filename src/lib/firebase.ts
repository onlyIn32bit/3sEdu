import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

const firebaseConfig = {
	apiKey: 'AIzaSyBUCVl1n17cRXRTbxSEJU6BLzleta44HG4',
	authDomain: 'dedu-8d0ce.firebaseapp.com',
	projectId: 'dedu-8d0ce',
	storageBucket: 'dedu-8d0ce.appspot.com',
	messagingSenderId: '187420501022',
	appId: '1:187420501022:web:3882e30e5da28986cdfa0f',
	measurementId: 'G-BTG8P7C7QY'
};

let app: FirebaseApp;

if (!getApps().length) {
	app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);
const db = getFirestore(app);

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Error Auth');
		const { subscribe } = writable(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});
	return { subscribe };
}
const user = userStore();

export { auth, db, user };
