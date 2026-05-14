import { useState } from 'react';
import { CATEGORIES } from '../utils/categories';
import { addExpense } from '../utils/storage';

export default function RecordForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  function handleSubmit(e) {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    const updated = addExpense({ amount: num, category, note, date });
    onAdd(updated);
    setAmount('');
    setNote('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* 金额输入 */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">金额</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-700">¥</span>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-3 text-3xl font-bold bg-white rounded-xl border-0 outline-2 outline-blue-500 focus:outline-2 focus:outline-blue-500 text-center"
          />
        </div>
      </div>

      {/* 分类选择 */}
      <div>
        <label className="block text-sm text-gray-500 mb-2">分类</label>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              className={`py-2 px-1 rounded-xl text-sm font-medium transition-all ${
                category === c.key
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200 scale-105'
                  : 'bg-white text-gray-600 active:scale-95'
              }`}
            >
              <div className="text-xl">{c.icon}</div>
              <div className="text-xs mt-0.5">{c.key}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 日期和备注 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-500 mb-1">日期</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 bg-white rounded-xl border-0 outline-2 outline-blue-500 focus:outline-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">备注</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="选填"
            className="w-full px-3 py-2.5 bg-white rounded-xl border-0 outline-2 outline-blue-500 focus:outline-2"
          />
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        className="w-full py-3.5 bg-blue-500 text-white font-bold text-lg rounded-xl active:scale-98 transition-transform"
      >
        记一笔
      </button>
    </form>
  );
}
