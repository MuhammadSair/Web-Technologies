import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Alert from "./components/Alert";
import ListGroup from "./ListGroup";
import Button from "./components/Button";
import Form from "./components/Form";
import FormUse from "./components/stateForm";
import ReactForm from "./components/ReactForm";
import ZodForm from "./components/ZodForm";

function App() {
  let persons = ["Zaid", "Muneeb", "Ali"];
  const [alertVisibility, setAlertVisibility] = useState(false);

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
      {alertVisibility && (
        <Alert onClick={() => setAlertVisibility(false)}>Close me</Alert>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button
        children={"Show Alert"}
        color={"primary"}
        onClick={() => {
          setAlertVisibility(true);
        }}
      ></Button>
      {/* <Form></Form> */}
      {/* <FormUse></FormUse> */}
      {/* <ReactForm></ReactForm> */}
      <ZodForm></ZodForm>
    </>
  );
}

export default App;
