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
    <form onSubmit={handleSubmit}>
      <h1>Add New Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}