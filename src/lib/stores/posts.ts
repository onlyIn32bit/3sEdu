import { writable } from 'svelte/store';
import { query, onSnapshot, collection, orderBy, limit } from 'firebase/firestore';
import { db } from '$lib/firebase';
// import { userStore } from './user';

export const chatMessagesStore = writable([]);

let messagesUnsubscribeCallback;

const subscribeToMessages = async () => {
	const queryParams = [orderBy('order', 'desc')];

	// Start listener for new messages
	const q = query(collection(db, 'posts'), ...queryParams);

	messagesUnsubscribeCallback = onSnapshot(q, (querySnapshot) => {
		const messages: any = [];
		querySnapshot.forEach((doc) => {
			messages.push({
				...doc.data(),
				id: doc.id,
				confirmed: !doc.metadata.hasPendingWrites,
				docRef: doc
			});
		});

		chatMessagesStore.update(() => {
			console.log('💥 querySnapshot: New data: ', messages);
			return [...messages];
		});
	});

	return messagesUnsubscribeCallback;
};
