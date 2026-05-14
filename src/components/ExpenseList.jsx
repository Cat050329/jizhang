import { CATEGORIES } from '../utils/categories';
import { deleteExpense } from '../utils/storage';

function getCategoryInfo(key) {
  return CATEGORIES.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
}

function groupByDate(expenses) {
  const groups = {};
  expenses.forEach((e) => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  });
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}

export default function ExpenseList({ expenses, onDelete }) {
  const groups = groupByDate(expenses);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-lg">还没有账单</p>
        <p className="text-sm mt-1">去「记账」页添加第一笔吧</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 space-y-4">
      {groups.map(([date, items]) => {
        const dayTotal = items.reduce((sum, e) => sum + e.amount, 0);
        const weekDay = ['日', '一', '二', '三', '四', '五', '六'][new Date(date + 'T00:00:00').getDay()];
        const [y, m, d] = date.split('-');

        return (
          <div key={date}>
            <div className="flex items-center justify-between py-2 px-1">
              <span className="text-sm font-medium text-gray-700">
                {m}月{d}日 周{weekDay}
              </span>
              <span className="text-sm text-gray-400">
                支出 ¥{dayTotal.toFixed(2)}
              </span>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              {items.map((e) => {
                const cat = getCategoryInfo(e.category);
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{e.category}</div>
                        {e.note && <div className="text-xs text-gray-400 mt-0.5">{e.note}</div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-800">¥{e.amount.toFixed(2)}</span>
                      <button
                        onClick={() => onDelete(e.id)}
                        className="text-gray-300 hover:text-red-400 text-lg leading-none px-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
