import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const load: PageServerLoad = async () => {
	const q = query(collection(db, 'courses'));
	const querySnapshot = await getDocs(q);
	return {
		courses: querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
	};
};
