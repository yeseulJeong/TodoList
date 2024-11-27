import type { RequestHandler } from '@sveltejs/kit';
import { supabaseServer } from '$lib/supabaseServer';


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
            return new Response(JSON.stringify({ error: '할 일 추가에 실패했습니다.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: '할 일이 성공적으로 추가되었습니다.', data }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('서버 오류:', err);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};


export const DELETE: RequestHandler = async ({ request }) => {
    try {
        const { id } = await request.json();
        console.log('DELETE 요청에서 받은 ID:', id);

        const { error } = await supabaseServer
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase 에러:', error);
            return new Response(JSON.stringify({ error: '할 일 삭제에 실패했습니다.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message: '할 일이 성공적으로 삭제되었습니다.' }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('서버 오류:', err);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};