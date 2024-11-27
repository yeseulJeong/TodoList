<script>
	import { onMount } from 'svelte';
	import ScheduleList from './scheduleList.svelte';
	import { todoData } from '../stores/todoStore';

	export async function load(locals) {
		return {
			props: {
				user:locals.user
			}
		}
	};

	let tooltip = { visible: false, x: 0, y: 0, text: '' };
	let canvas, ctx, width, height, halfWidth, halfHeight; 
	let pointRadius = 10;

	const drawChart = (data) => {
	if (!ctx) return;

	ctx.clearRect(0, 0, width, height);

	// 네 개의 영역에 배경색 입히기
	ctx.fillStyle = 'rgba(255, 99, 132, 0.2)';
	ctx.fillRect(0, 0, halfWidth, halfHeight);
	ctx.fillStyle = 'rgba(54, 162, 235, 0.2)';
	ctx.fillRect(halfWidth, 0, halfWidth, halfHeight);

	ctx.fillStyle = 'rgba(255, 206, 86, 0.2)';
	ctx.fillRect(0, halfHeight, halfWidth, halfHeight);

	ctx.fillStyle = 'rgba(75, 192, 192, 0.2)';
	ctx.fillRect(halfWidth, halfHeight, halfWidth, halfHeight);

	// 데이터 포인트 그리기
	data.forEach(point => {
		const x = ((point.importance - 5) / 10) * width + halfWidth;
		const y = height - ((point.urgency - 5) / 10) * height - halfHeight;

		ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
		ctx.beginPath();
		ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.font = '28px Arial';
		const textOffset = x > width - 50 ? -50 : 10;
		ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
		ctx.fillText(point.name, x + textOffset, y + 10);
	});
	};

	onMount(() => {
	canvas = document.getElementById('TodoChart');
	ctx = canvas.getContext('2d');

	// CSS 크기와 실제 픽셀 크기를 다르게 설정
	const cssWidth = canvas.clientWidth;
	const cssHeight = canvas.clientHeight;
	canvas.width = cssWidth * 2; // 해상도를 두 배로
	canvas.height = cssHeight * 2;

	width = canvas.width;
	height = canvas.height;
	halfWidth = width / 2;
	halfHeight = height / 2;

	todoData.subscribe(data => {
		drawChart(data);
	});

	canvas.addEventListener('mousemove', (event) => {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		const mouseX = (event.clientX - rect.left) * scaleX;
		const mouseY = (event.clientY - rect.top) * scaleY;

		let found = false;
		$todoData.forEach(point => {
			const x = ((point.importance - 5) / 10) * width + halfWidth;
			const y = height - ((point.urgency - 5) / 10) * height - halfHeight;

			if (Math.abs(mouseX - x) < pointRadius && Math.abs(mouseY - y) < pointRadius) {
				// 툴팁의 위치를 스크롤 위치를 고려하여 설정
				let tooltipX = event.clientX + 5;
				let tooltipY = event.clientY + window.scrollY; // 스크롤 위치를 더해줌

				// 툴팁이 화면 밖으로 나가지 않도록 조정
				if (tooltipX + 100 > window.innerWidth) {
					tooltipX -= 100;
				}
				if (tooltipY + 50 > window.innerHeight) {
					tooltipY -= 50;
				}

				tooltip = {
					visible: true,
					x: tooltipX ,
					y: tooltipY,
					text: `할 일: ${point.name}, 중요도: ${point.importance}, 긴급도: ${point.urgency}`
				};
				found = true;
			}
    	});

		if (!found) {
			tooltip.visible = false;
		}
	});
});
	</script>

	<svelte:head>
	<title>Todo list</title>
	<meta name="description" content="seul's TodoList" />
	</svelte:head>

	<section>
	<canvas id="TodoChart" style="width: 100%; height: auto;"></canvas>
	{#if tooltip.visible}
	<div style="position: absolute; top: {tooltip.y}px; left: {tooltip.x}px;" class="tooltip">
		{tooltip.text}
	</div>
	{/if}
	</section>
	<section>
	<ScheduleList />
	</section>

<style>
	canvas {
	width: 100%;
	height: auto;
	border: 1px solid #ccc;
	display: block;
	aspect-ratio: 1 / 1;
	}
	.tooltip {
	padding: 5px 10px;
	border-radius: 3px;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	font-size: 14px;
	background-color: #333;
	color: #fff;
	border-radius: 14px;
	}
</style>