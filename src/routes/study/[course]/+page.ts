// import type { PageLoad } from './$types';
// import { db } from '$lib/firebase';
// import { doc, getDoc } from 'firebase/firestore';

// export const load: PageLoad = async ({ params }) => {
// 	const docRef = doc(db, 'courses', params.course);
// 	const docSnap = await getDoc(docRef);
// 	if (docSnap.exists()) {
// 		// console.log('Document data:', docSnap.data());
// 	} else {
// 		// docSnap.data() will be undefined in this case
// 		console.log('No such document!');
// 	}
// 	return docSnap.data();
// };
