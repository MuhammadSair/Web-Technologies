import React from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface props {
  expenses: Expense[];
}
const ExpenseList = ({ expenses }: props) => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amo</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Cell 2</td>
            <td>Cell 3</td>
            <td>Cell 4</td>
            <td>Cell 5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
