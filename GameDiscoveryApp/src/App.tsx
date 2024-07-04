import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductList from "./ProductList";

const connect = () => console.log("connecting");
const disconnect = () => console.log("disconnecting");
function App() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    connect();
    return () => disconnect();
  });
  //Effect hooks can onyl be called at the top level of our component
  //We cannot call it inside loops or if statements
  useEffect(() => {
    if (ref.current) ref.current.focus;
  });
  useEffect(() => {
    document.title = "DiscoveryApp";
  });

  return (
    <>
      <div>
        <input ref={ref} type="text" name="" id="" />
      </div>
      <ProductList></ProductList>
    </>
  );
}

export default App;
