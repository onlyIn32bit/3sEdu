import type { PageLoad } from './$types';
import { auth, db } from '$lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const load: PageLoad = async () => {
	const user = auth.currentUser;
	const docRef = doc(db, 'users', user.uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		// console.log('Document data:', docSnap.data());
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
	return docSnap.data().grade;
};
