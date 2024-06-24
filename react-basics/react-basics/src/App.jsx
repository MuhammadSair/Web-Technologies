import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListGroup from "./ListGroup";

function App() {
  let persons = ["Zaid", "Muneeb", "Ali"];
  return (
    <div>
      <ListGroup persons={persons} heading="Persons" />
    </div>
  );
}

export default App;
