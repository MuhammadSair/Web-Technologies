import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListGroup from "./ListGroup";

function App() {
  let persons = ["Zaid", "Muneeb", "Ali"];
  const handleSelectedItem = (item: string) => {
    console.log(item);
  };
  return (
    <>
      <div>
        <ListGroup
          persons={persons}
          heading={"PersonsList"}
          onSelectItem={handleSelectedItem}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
