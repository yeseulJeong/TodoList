import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	// 로그인 여부 확인
	if (!locals.user && url.pathname !== '/login') {
		// 로그인 페이지로 리다이렉트
		// throw redirect(302, '/login');
	}

	// 로그인 상태일 때 로그인 페이지로 접근 시 메인 페이지로 리다이렉트
	if (locals.user && url.pathname === '/login') {
		// throw redirect(302, '/');
	}
}
