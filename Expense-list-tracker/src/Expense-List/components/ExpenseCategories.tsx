import React from "react";

interface props {
  selectCategories: (categories: string) => void;
}
const ExpenseCategories = ({ selectCategories }: props) => {
  return (
    <select
      name=""
      id=""
      onChange={(event) => selectCategories(event.target.value)}
    >
      <option value="">All categories</option>
      <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
    </select>
  );
};

export default ExpenseCategories;
