<script lang="ts">
	import { goto } from '$app/navigation';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	let email: string;
	let password: string;
	let user = auth.currentUser;

	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				console.log('Logged in');
				goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<form on:submit|preventDefault={login}>
	<label>
		Email
		<input name="email" type="email" required bind:value={email} />
	</label>
	<label>
		Password
		<input name="password" type="password" required bind:value={password} />
	</label>
	<button type="submit">Log in</button>
</form>

<h1>{user?.email}</h1>
