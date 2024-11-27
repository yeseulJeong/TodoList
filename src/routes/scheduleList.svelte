<script lang="ts">
  import { todoData } from '../stores/todoStore';

  function toggleComplete(index: number) {
    todoData.update(todos => {
      todos[index].completed = !todos[index].completed;
			console.log(todos[index].completed)
			console.log('update todos:',todos)
      return todos;
    });
  }

  async function deleteTodo(id: number) {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });
      if(response.ok) {
        todoData.update(todos => todos.filter(todo => todo.id !== id));
      } else {
        const errorData = await response.json();
        console.error('할 일 삭제에 실패했습니다.', errorData.error);
      }
    } catch (error) {
      console.error('할 일 삭제 중 오류 발생:', error);
    }

  }

  
</script>

<section>
  <div class="list">
    {#each $todoData as todo, index}
      <div class="todo">
        <div class="todo-header">
					<div class="name-wrap">
						<input type="checkbox" checked={todo.completed} on:change={() => toggleComplete(index)} />
						<div class="name">{todo.name}</div>
					</div>
          <div class="category">{todo.category != undefined ? todo.category : ""}</div>
					<button class="delete-button" on:click={() => deleteTodo(todo.id)}>삭제</button>
        </div>
        <div class="todo-details">
          <div class="importance">중요도: {todo.importance}</div>
          <div class="urgency">긴급도: {todo.urgency}</div>
          <div class="deadline">{todo.deadline != null ? "마감일: "+ todo.deadline : "" }</div>
        </div>
        <div class="memo">{todo.memo}</div>
          
      </div>
    {/each}
  </div>
</section>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .todo {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.2s;
    position: relative;
    overflow: hidden;
  }

  .todo:hover {
    transform: translateY(-2px);
  }

  .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
	.name-wrap {
		display: flex;
		align-items: center;
		gap: 10px;
	}
  .name {
    font-size: 18px;
    font-weight: bold;
  }

  .category {
    font-size: 14px;
    color: #666;
  }

  .todo-details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .importance,
  .urgency,
  .deadline {
    font-size: 14px;
    color: #333;
  }

  .memo {
    font-size: 14px;
    color: #555;
    line-height: 1.4;
  }
	.delete-button {
		background-color: #444;
		color: #fff;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		cursor: pointer;
	}
  
  
</style>