import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const load: PageLoad = async () => {
	const q = query(collection(db, 'course'));
	const querySnapshot = await getDocs(q);
	return {
		courses: querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
	};
};
