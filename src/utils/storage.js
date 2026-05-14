const KEY = 'jizhang_expenses';

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}

export function addExpense(expense) {
  const expenses = loadExpenses();
  expenses.unshift({ ...expense, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) });
  saveExpenses(expenses);
  return expenses;
}

export function deleteExpense(id) {
  const expenses = loadExpenses().filter((e) => e.id !== id);
  saveExpenses(expenses);
  return expenses;
}
