import './App.css'
import Card from "./components/Card.tsx";
import Button from "./components/Button.tsx";
import PersonCard from "./components/PersonCard.tsx";

function App() {

  return (
    <>
        <div className="grid grid-cols-3 gap-4 p-4">
            <Card title="Coffee"/>
            <Card title="Tea"/>
            <Card title="Beer"/>
        </div>

        <Button></Button>

        <div className="grid grid-cols-4 gap-2">
            <PersonCard name={"Luca Manasek"} job={"Pensionist"} gender={"male"}/>
            <PersonCard name={"Anna Mustermann"} job={"Software Engineer"} gender={"female"}/>
            <PersonCard name={"Maximilian Beispiel"} job={"Designer"} gender={"male"}/>
            <PersonCard name={"Sophie Musterfrau"} job={"Product Manager"} gender={"female"}/>
        </div>

    </>
  )
}

export default App
