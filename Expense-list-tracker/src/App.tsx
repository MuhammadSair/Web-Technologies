import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseTable from "./Expense-List/components/ExpenseTable";
import ExpenseCategories from "./Expense-List/components/ExpenseCategories";

function App() {
  const [expenses, setExpenseList] = useState([
    { id: 1, description: "adva", amount: 50, category: "Utilities" },
    { id: 2, description: "badsaasd", amount: 50, category: "utility" },
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
    </>
  );
}

export default App;
