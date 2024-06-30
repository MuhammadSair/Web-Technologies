import React from "react";
import categories from "../categories";

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
      {categories.map((category) => (
        <option value={category}>{category}</option>
      ))}
    </select>
  );
};

export default ExpenseCategories;
