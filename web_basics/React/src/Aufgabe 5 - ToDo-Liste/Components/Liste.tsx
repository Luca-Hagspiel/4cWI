import {useEffect, useState} from "react";
import Vorlage from "./Vorlage.tsx";
type ToDo = {
    ToDo1: string;
    ToDo2: string;
};

const Liste = () => {
    const [ToDo, setToDo] = useState<ToDo[]>([]);


    useEffect(() => {
        fetch("https://6909e7791a446bb9cc208783.mockapi.io/api/Poeple/ToDo")
            .then(res => res.json())
            .then(data => setToDo(data));
    }, []);

    return (
        <div className={"lg:grid-cols-5 lg:grid-flow-row md:grid-cols-3 md:grid-flow-row sm:grid-cols-1 sm:grid-flow-row grid"}>
            {ToDo.map(ToDo => (
                <Vorlage
                    ToDo1={ToDo.ToDo1}
                    ToDo2={ToDo.ToDo2}
                />
            ))}
        </div>
    );
};
export default Liste;
