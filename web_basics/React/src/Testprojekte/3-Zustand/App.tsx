import {useCounterStore} from "./store.ts";
import {useEffect} from "react";

const logCount = () => {
    const count = useCounterStore.getState().count;
    console.log("Current count:", count);
}

const App = () => {
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const incrementAsync = useCounterStore((state) => state.incrementAsync);
    const decrement = useCounterStore((state) => state.decrement);

    useEffect(() => {
        logCount();
    }, [count]);

    return (
        <div className={"w-full flex flex-col items-center justify-center"}>
            <div>{count}</div>
            <button onClick={increment}>Increment</button>
            <button onClick={incrementAsync}>Increment Async</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default App;
