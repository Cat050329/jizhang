import { useState, useCallback } from 'react';
import RecordForm from './components/RecordForm';
import ExpenseList from './components/ExpenseList';
import Stats from './components/Stats';
import { loadExpenses, deleteExpense } from './utils/storage';

const TABS = [
  { key: 'record', label: '记账', icon: '✏️' },
  { key: 'list', label: '账单', icon: '📋' },
  { key: 'stats', label: '统计', icon: '📊' },
];

export default function App() {
  const [tab, setTab] = useState('record');
  const [expenses, setExpenses] = useState(loadExpenses);

  const handleAdd = useCallback((updated) => {
    setExpenses(updated);
    setTab('list');
  }, []);

  const handleDelete = useCallback((id) => {
    const updated = deleteExpense(id);
    setExpenses(updated);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部标题 */}
      <header className="bg-white px-4 py-3 text-center border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800">记账本</h1>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 pb-16">
        {tab === 'record' && <RecordForm onAdd={handleAdd} />}
        {tab === 'list' && <ExpenseList expenses={expenses} onDelete={handleDelete} />}
        {tab === 'stats' && <Stats expenses={expenses} />}
      </main>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 w-full max-w-[480px] bg-white border-t border-gray-100 flex">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
              tab === t.key ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
