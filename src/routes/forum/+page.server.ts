// import type { PageServerLoad } from './$types';
// import { db } from '$lib/firebase';
// import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';

// export const load: PageServerLoad = async () => {
// 	const q = query(collection(db, 'posts'), orderBy('order', 'desc'));
// 	const querySnapshot = await getDocs(q);

// 	return {
// 		posts: querySnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
// 	};
// };
