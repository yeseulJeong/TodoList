import { writable } from 'svelte/store';

export const todoData = writable([]);
export const categories = writable(['추가', '기타']);

const fetchTodoData = async () => {
	try {
		const response = await fetch('/api');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();

		if (data.error) {
			console.error('API 에러:', data.error);
			todoData.set([]);
			return;
		}

		if (Array.isArray(data)) {
			todoData.set(data);
		} else {
			console.error('예상치 못한 데이터 형식:', data);
			todoData.set([]);
		}
	} catch (error) {
		console.error('데이터 가져오기 실패:', error);
		todoData.set([]);
	}
};

fetchTodoData();
