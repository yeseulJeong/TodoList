export async function POST({ locals }) {
	// 세션에서 유저 정보 삭제
	locals.user = null;

	// 쿠키에서 세션 정보 삭제
	return new Response(null, {
		status: 200,
		headers: {
			'set-cookie': `user=; Path=/; HttpOnly; Max-Age=0`
		}
	});
}
