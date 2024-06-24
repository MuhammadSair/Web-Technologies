import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function ListGroup({ persons = [], heading = "Deault" }) {
  //   let persons = ["Zaid", "Muneeb", "Ali"];
  const [selectedPerson, setSelectedPerson] = useState(-1);
  // persons = [];

  return (
    <>
      <h1>{heading}</h1>
      {persons.length === 0 && <p>No item found</p>}
      <ul>
        {persons.map((person, index) => (
          <li
            className={
              selectedPerson === index
                ? "highlight-list"
                : "unselected-list-item"
            }
            key={person}
            onClick={() => {
              setSelectedPerson(index);
            }}
          >
            {person}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
