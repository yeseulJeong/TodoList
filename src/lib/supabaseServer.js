import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcfwglecbwhcsffjjkrj.supabase.co';
// const supabaseServiceKey = process.env.VITE_SERVICE_KEY;
const supabaseServiceKey = process.env.VITE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
	console.error('Supabase 서버 환경 변수가 설정되지 않았습니다.');
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
