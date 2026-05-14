import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '../utils/categories';

export default function Stats({ expenses }) {
  const { monthlyTotal, categoryData } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `${year}-${month}`;

    const monthExpenses = expenses.filter((e) => e.date.startsWith(prefix));
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const catMap = {};
    monthExpenses.forEach((e) => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });

    const data = CATEGORIES.map((c) => ({
      name: c.key,
      icon: c.icon,
      value: Math.round((catMap[c.key] || 0) * 100) / 100,
      color: c.color,
    }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    return { monthlyTotal: total, categoryData: data };
  }, [expenses]);

  const now = new Date();
  const monthLabel = `${now.getFullYear()}年${now.getMonth() + 1}月`;

  if (monthlyTotal === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-lg">本月暂无支出</p>
        <p className="text-sm mt-1">记一笔后再来看看统计吧</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* 月度总览卡片 */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
        <div className="text-sm opacity-80 mb-1">{monthLabel} 支出</div>
        <div className="text-4xl font-bold">¥{monthlyTotal.toFixed(2)}</div>
      </div>

      {/* 饼图 */}
      {categoryData.length > 0 && (
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">支出分类</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `¥${value.toFixed(2)}`}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* 图例 */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryData.map((d) => {
              const pct = ((d.value / monthlyTotal) * 100).toFixed(1);
              return (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-600">
                    {d.icon} {d.name}
                  </span>
                  <span className="text-gray-400 ml-auto">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
