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
				alert('Đã đăng nhập');
				goto('/');
			})
			.catch((error) => {
				alert('Lỗi đăng nhập');
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<div class="mx-64 mt-16 flex rounded-lg p-16 shadow-lg">
	<h1 class="text-4xl">Login</h1>
	<form on:submit|preventDefault={login} class="ml-auto flex w-fit scale-125 flex-col p-8">
		<label class="">
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<input class="input input-bordered" name="email" type="email" required bind:value={email} />
		</label>
		<label class="">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				class="input input-bordered"
				name="password"
				type="password"
				required
				bind:value={password}
			/>
		</label>
		<button class="btn btn-primary mt-4" type="submit">Log in</button>
	</form>
</div>
