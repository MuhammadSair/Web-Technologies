import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm as reactFormHook } from "react-hook-form";
import { z } from "zod";
import categories from "../categories";

// import { categories } from "../../App";
interface prop {
  onSubmit: (data: expenseFormData) => void;
}
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters" })
    .max(50),
  amount: z.number({ message: "Amount is required" }).min(0.001).max(100000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type expenseFormData = z.infer<typeof schema>;
const ExpenseForm = ({ onSubmit }: prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = reactFormHook<expenseFormData>({
    resolver: zodResolver(schema), // Pass the schema to zodResolver
  });
  return (
    <form id="form" action="/" onSubmit={handleSubmit(onSubmit)}>
      <div className="Form">
        <div className="input-control">
          <label>Description</label>
          <input
            {...register("description")}
            id="description"
            name="description"
            type="text"
          />
          {errors.description && (
            <p className="danger">{errors.description.message}</p>
          )}
        </div>
        <div className="input-control">
          <label htmlFor="amount">Amount</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            name="amount"
            type="text"
          />
          {errors.amount && <p className="danger">{errors.amount.message}</p>}
          <div className="error"></div>
        </div>

        <label htmlFor="category" className="input-control">
          Category
        </label>
        <select {...register("category")} name="categories" id="">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="danger">{errors.category.message}</p>}
        <button type="submit" className="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
