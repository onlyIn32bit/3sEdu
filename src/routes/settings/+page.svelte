<script lang="ts">
	import { updateProfile, updateEmail, updatePassword, signOut } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	let user = auth.currentUser;
	let newName;
	let newEmail;
	let newPassword;
	const changeUserInfo = () => {
		if (newName) {
			updateProfile(auth.currentUser, {
				displayName: newName
			});
		}
		if (newEmail) {
			updateEmail(auth.currentUser, newEmail);
		}
		if (newPassword) {
			updatePassword(auth.currentUser, newPassword);
		}
	};
	const logOut = () => {
		signOut(auth)
			.then(() => {
				console.log('Signed Out');
				goto('/auth/login');
			})
			.catch(() => {});
	};
	onMount(() => {
		const interval = setInterval(() => {
			user = auth.currentUser;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<h1>{user?.displayName}</h1>
<h1>{user?.email}</h1>
<form on:submit|preventDefault={changeUserInfo}>
	<label>
		Change Username
		<input name="username" type="text" bind:value={newName} />
	</label>
	<label>
		Change Email
		<input name="email" type="email" bind:value={newEmail} />
	</label>
	<label>
		Change Password
		<input name="password" type="password" bind:value={newPassword} />
	</label>
	<button type="submit">CHANGE</button>
</form>
<button on:click={logOut}>LOGOUT</button>
