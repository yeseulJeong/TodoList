import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcfwglecbwhcsffjjkrj.supabase.co';
const supabaseKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	console.error('Supabase 환경 변수가 설정되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
