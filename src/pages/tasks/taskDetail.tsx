import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus } from '@/store/tasksSlice';
import Link from 'next/link';
import type { RootState, AppDispatch } from '@/store';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const task = useSelector((state: RootState) => state.tasks.tasks.find(t => t.id === parseInt(id as string)));
  const dispatch = useDispatch<AppDispatch>();

  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <h1>Task Detail</h1>
      <p>ID: {task.id}</p>
      <p>Title: {task.title}</p>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button onClick={() => dispatch(toggleTaskStatus(task.id))}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <Link href="/">Back to List</Link>
    </div>
  );
}