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
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Task Detail</h1>
          <p className="card-text"><strong>ID:</strong> {task.id}</p>
          <p className="card-text"><strong>Title:</strong> {task.title}</p>
          <p className="card-text">
            <strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}
          </p>
          <button
            className={`btn ${task.completed ? 'btn-warning' : 'btn-success'} me-2`}
            onClick={() => dispatch(toggleTaskStatus(task.id))}
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <Link href="/">
            <button className="btn btn-secondary">Back to List</button>
          </Link>
        </div>
      </div>
    </div>
  );
}