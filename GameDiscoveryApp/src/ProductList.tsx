import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setproductList] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log("Fetching products in", category);
    setproductList(["Household", "Clothes"]);
  }, [category]);
  return (
    <>
      <select
        name=""
        id=""
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Household">Household</option>
        <option value="Clothes">Clothes</option>
      </select>
      <div>ProductList</div>;
    </>
  );
};

export default ProductList;
