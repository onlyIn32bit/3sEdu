<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	let name: string;
	let email: string;
	let password: string;
	let user = auth.currentUser;

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: name
				})
					.then(() => {})
					.catch((error) => {});
				console.log('Registered');
				// goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<form>
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
	<button type="submit" on:click={register}>Create account</button>
</form>

<h1>{user?.displayName}</h1>
<h1>{user?.email}</h1>
