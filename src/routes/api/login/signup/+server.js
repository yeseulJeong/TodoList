import * as db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { email, name, password } = await request.json();

	if (name !== '' && password !== '' && email !== '') {
		// Save the user to the database
		// await db.saveUser({ email, name });

		// return new Response(
		// 	JSON.stringify({ success: true }), // JSON.stringify를 사용하여 객체를 문자열로 변환
		// 	{
		// 		status: 200,
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		}
		// 	}
		// );
		return json({ success: true });
	}

	return json({ success: false });
	// return new Response('Unauthorized', { status: 401 });
}
