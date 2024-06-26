import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseTable from "./Expense-List/components/ExpenseTable";

function App() {
  return (
    <>
      <ExpenseTable></ExpenseTable>
    </>
  );
}

export default App;
