import type { PageServerLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const load: PageServerLoad = async () => {
	let posts = [];
	const q = query(collection(db, 'posts'));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, ' => ', doc.data());
		posts.push(doc.data());
	});
	return { posts };
};
