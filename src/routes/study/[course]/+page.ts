import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const load: PageLoad = async ({ params }) => {
	console.log(params.course);

	const docRef = doc(db, 'course', params.course);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data());
		return docSnap.data();
	} else {
		console.log('No such document!');
		return { title: 'Không có', content: 'Bài học chưa có nội dung' };
	}
};
