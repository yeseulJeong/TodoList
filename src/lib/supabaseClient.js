import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseKey) {
	console.error('Supabase 환경 변수가 설정되지 않았습니다.');
} else if (!supabaseServiceKey) {
	console.error('Supabase 서비스 키가 설정되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
