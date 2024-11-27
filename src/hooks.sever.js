export async function handle({ event, resolve }) {
	// 세션 초기화
	event.locals.user = event.cookies.get('user') || null;

	const response = await resolve(event);

	// 세션 저장
	if (event.locals.user) {
		response.headers.set('set-cookie', `user=${event.locals.user}; Path=/; HttpOnly`);
	}

	return response;
}
