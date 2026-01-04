import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Trash2, Edit2, Save, X, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAdmin, type AdminTask } from '@/contexts/AdminContext';

const Admin = () => {
  const { isAuthenticated, dailyTasks, login, logout, addTask, updateTask, deleteTask } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ problemName: '', problemLink: '', topic: '', difficulty: 'easy' as const, platform: 'leetcode' as const });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) setError('Invalid password. Try: admin123');
  };

  const handleAddTask = () => {
    if (newTask.problemName && newTask.problemLink) {
      addTask(newTask);
      setNewTask({ problemName: '', problemLink: '', topic: '', difficulty: 'easy', platform: 'leetcode' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-2">Password: admin123</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full gradient-primary text-primary-foreground">Login</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
            <p className="text-muted-foreground">Manage daily practice tasks</p>
          </div>
          <Button variant="outline" onClick={logout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>

        {/* Add New Task */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5" />Add New Task</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Problem Name" value={newTask.problemName} onChange={(e) => setNewTask({ ...newTask, problemName: e.target.value })} />
            <Input placeholder="Problem Link" value={newTask.problemLink} onChange={(e) => setNewTask({ ...newTask, problemLink: e.target.value })} />
            <Input placeholder="Topic" value={newTask.topic} onChange={(e) => setNewTask({ ...newTask, topic: e.target.value })} />
            <select className="px-3 py-2 rounded-lg bg-background border border-border" value={newTask.difficulty} onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value as any })}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <Button onClick={handleAddTask} className="mt-4 gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Task</Button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {dailyTasks.map((task) => (
            <div key={task.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium">{task.problemName}</h4>
                <p className="text-sm text-muted-foreground">{task.topic} • {task.difficulty} • {task.platform}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
