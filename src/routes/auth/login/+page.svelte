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

<form
	on:submit|preventDefault={login}
	class="m-36 mx-auto mb-6 max-w-lg rounded-lg bg-white p-8 shadow-md"
>
	<label class="mb-2 block text-2xl font-bold">
		<p class="mb-2">Email</p>
		<input
			class="mb-6 block w-full rounded-lg border border-gray-300 p-2 font-normal"
			name="email"
			type="email"
			required
			bind:value={email}
		/>
	</label>
	<label class="mb-2 block text-2xl font-bold">
		<p class="mb-2">Password</p>
		<input
			class="mb-6 block w-full rounded-lg border border-gray-300 p-2"
			name="password"
			type="password"
			required
			bind:value={password}
		/>
	</label>
	<button
		class="block w-full rounded-lg bg-blue-500 px-4 py-3 text-lg font-bold text-white hover:bg-blue-600"
		type="submit">Log in</button
	>
</form>
