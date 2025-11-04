import Card from "./Card.tsx";
import { useState, useEffect } from "react";

export default function PeopleContainer() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://6909e7791a446bb9cc208783.mockapi.io/api/Poeple/Person")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {data.map(person => (
                <Card
                    key={person.id}
                    name={person.name}
                    jobtitle={person.jobtitle}
                    image={person.avatar}
                />
            ))}
        </div>
    );
}
