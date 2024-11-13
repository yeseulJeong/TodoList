import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	try {
		const { data, error } = await supabase.from('todos').select('*');

		if (error) {
			console.error('Supabase 에러:', error);
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// 데이터가 없을 경우 빈 배열 반환
		return json(data || []);
	} catch (err) {
		console.error('서버 에러:', err);
		return new Response(JSON.stringify({ error: '서버 에러가 발생했습니다.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
