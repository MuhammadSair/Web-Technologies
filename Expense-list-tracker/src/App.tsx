import { useState } from "react";
import "./App.css";
import ExpenseTable from "./Expense-List/components/ExpenseTable";
import ExpenseCategories from "./Expense-List/components/ExpenseCategories";
import ExpenseForm from "./Expense-List/components/ExpenseForm";
import categories from "./Expense-List/categories";
import { date } from "zod";
function App() {
  const [expenses, setExpenseList] = useState([
    { id: 1, description: "adva", amount: 50, category: "Utilities" },
    { id: 2, description: "badsaasd", amount: 50, category: "Entertainment" },
    { id: 3, description: "asdafg", amount: 50, category: "utility" },
    { id: 4, description: "lhjkd", amount: 50, category: "utility" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  // const id = expenses.map((expense) => expense.id);
  return (
    <>
      <div className="section-1">
        <div className="section-1-left">
          <ExpenseForm
            onSubmit={(newExpense) =>
              setExpenseList([
                ...expenses,
                { ...newExpense, id: expenses.length + 1 },
              ])
            }
          ></ExpenseForm>
        </div>
        <div className="section-1-right">
          <ExpenseCategories
            selectCategories={(category) => setSelectedCategory(category)}
          ></ExpenseCategories>
          <ExpenseTable
            expenses={visibleExpenses}
            onDelete={(id) => {
              setExpenseList(
                expenses.filter((e) => {
                  return e.id !== id;
                })
              );
            }}
          ></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default App;
