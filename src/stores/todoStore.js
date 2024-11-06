import { writable } from 'svelte/store';

export const todoData = writable([]);
export const categories = writable(['추가', '기타']);

// 초기 데이터 로드
const fetchTodoData = async () => {
	try {
		const response = await fetch('/api');
		const data = await response.json();
		todoData.set(data);
	} catch (error) {
		console.error('할 일 데이터를 가져오는데 실패했습니다:', error);
	}
};

// 앱 시작시 데이터 로드
fetchTodoData();
