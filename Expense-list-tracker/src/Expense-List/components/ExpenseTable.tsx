import React from "react";
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}
const ExpenseTable = ({ expenses, onDelete }: props) => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => onDelete(expense.id)}>Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              $
              {expenses
                .reduce((acc, expense) => {
                  return expense.amount + acc;
                }, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTable;
