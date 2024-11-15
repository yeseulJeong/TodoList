import type { RequestHandler } from '@sveltejs/kit';
import { supabaseServer } from '../../../lib/supabaseServer';

export const POST: RequestHandler = async ({ request }) => {
    try {
        // 클라이언트에서 보낸 JSON 데이터를 파싱
        const todo = await request.json();
        console.log('server.ts에서 화깅ㄴ하고있어:',todo)

        // Supabase에 데이터 삽입
        const { data, error } = await supabaseServer
            .from('todos') // 
            .insert([todo]);

        if (error) {
            console.error('Supabase 에러:', error);
            return {
                status: 500,
                body: { error: '할 일 추가에 실패했습니다.' }
            };
        }

        return new Response(JSON.stringify({ message: '할 일이 성공적으로 추가되었습니다.', data }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('서버 오류:', err);
        return {
            status: 500,
            body: { error: '서버 오류가 발생했습니다.' }
        };
    }
};