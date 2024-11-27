import * as db from '$lib/db';
import { json } from '@sveltejs/kit';
import supabaseServer from '$lib/supabaseServer';

export const actions = {
	default: async ({ cookies, request }) => {
		console.log('cookies', cookies);
		console.log('request', request);
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');

		const{data, error} = await supabaseServer
		.from('users')
		.insert([{name, email, password}]);

		return { success: true, email, password };
	},
};