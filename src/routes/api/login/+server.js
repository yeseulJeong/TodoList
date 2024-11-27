export async function POST({ request, locals }) {
	const { username, password } = await request.json();

	// 여기에 인증 로직을 추가
	if (name === '' && password === '') {
		locals.user = username; // 세션에 유저 정보 저장
		return new Response(null, { status: 200 });
	}

	return new Response('Unauthorized', { status: 401 });
}
