<script lang="ts">
	import Input from '$lib/Input.svelte';
	import Button from '$lib/Button.svelte';
	import type { ActionData } from './$types';
	import ImageBlob from '$lib/images/login-blob.svg';
	import { applyAction, enhance } from '$app/forms';

	export let form: ActionData;

	let loggingIn = false;
</script>

<main class="container mx-auto h-full flex flex-row justify-center items-center relative">
	<img
		alt="Abstract blob"
		src={ImageBlob}
		class="absolute -z-10 left-[40%] top-[35%] transform translate-x-[-50%] translate-y-[-50%]"
	/>
	<form
		class="flex flex-col gap-4 py-8 px-12 rounded-2xl w-[32em] shadow-lg bg-white"
		method="POST"
		use:enhance={() => {
      loggingIn = true;
			return async ({ result }) => {
				await applyAction(result);
        loggingIn = false;
			};
		}}
	>
		<h1 class="font-bold text-3xl text-center">Login</h1>
		<Input
			label="ClickUp Personal Token"
			name="token"
			error={form?.message}
			autocomplete="false"
			autofocus
			required
		/>
		<Button type="submit" loading={loggingIn} disabled={loggingIn}>Login</Button>
		<small class="text-center">
			Learn how to obtain your ClickUp Personal Token{' '}
			<a
				class="text-purple-600 underline"
				target="blank"
				href="https://clickup.com/api/developer-portal/authentication#generate-your-personal-api-token"
			>
				here
			</a>
			.
		</small>
	</form>
</main>
