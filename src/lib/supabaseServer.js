import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcfwglecbwhcsffjjkrj.supabase.co';
// const supabaseServiceKey = process.env.VITE_SERVICE_KEY;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	console.error('Supabase 서버 환경 변수가 설정되지 않았습니다.');
}

const supabaseServer = createClient(supabaseUrl, supabaseKey);
export { supabaseServer };
