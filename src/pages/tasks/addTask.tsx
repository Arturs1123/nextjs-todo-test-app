import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/tasksSlice';
import { useRouter } from 'next/router';
import type { AppDispatch } from '@/store';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now(), title, completed: false }));
    router.push('/');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}