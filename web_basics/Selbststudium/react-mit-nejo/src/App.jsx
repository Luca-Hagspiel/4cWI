import List from "./components/List";

export default function App() {
    return (
        <div className="m-4">
            <List items={["Coffee", "Tea", "Beer", "Water"]} />
        </div>
    );
}
