import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, toggleTaskStatus, deleteTask } from '@/store/tasksSlice';
import Link from 'next/link';
import type { RootState, AppDispatch } from '@/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      dispatch(setTasks(data.slice(0, 10))); // Limit to 10 tasks
    }
    if (!tasks.length) { // "if condition" code is added for showing added tasks in local
      fetchTasks();
    }
  }, [dispatch, tasks]);

  return (
    <div>
      <h1>To-Do List</h1>
      <Link href="/tasks/addTask">Add New Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link href={{ pathname: '/tasks/taskDetail', query: { id: task.id } }}>
              {task.title}
            </Link>
            <button onClick={() => dispatch(toggleTaskStatus(task.id))}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}