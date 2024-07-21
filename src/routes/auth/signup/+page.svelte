<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { auth, db } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';

	let name: string;
	let email: string;
	let password: string;

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async () => {
				await updateProfile(auth.currentUser, {
					displayName: name
				});
				await setDoc(doc(db, 'users', auth.currentUser.uid), {
					grade: 0,
					role: null
				});
				console.log('Registered');
				goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<form on:submit|preventDefault={register}>
	<label>
		Username
		<input name="username" type="text" required bind:value={name} />
	</label>
	<label>
		Email
		<input name="email" type="email" required bind:value={email} />
	</label>
	<label>
		Password
		<input name="password" type="password" required bind:value={password} />
	</label>
	<button type="submit">Create account</button>
</form>
