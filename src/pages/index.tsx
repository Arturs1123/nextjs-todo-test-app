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
    <div className="container my-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tasks</h2>
        <Link href="/tasks/addTask">
          <button className="btn btn-primary">Add New Task</button>
        </Link>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center`}
          >
            <Link href={{ pathname: '/tasks/taskDetail', query: { id: task.id } }} className='text-decoration-none'>
              {task.title}
            </Link>
            <div>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => dispatch(toggleTaskStatus(task.id))}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}