import { useState, useEffect } from "react";
import Card from "./Card.tsx";

type Person = {
    name: string;
    jobtitle: string;
    avatar: string;
};

export default function PeopleContainer() {
    const [People, setPeople] = useState<Person[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("https://6909e7791a446bb9cc208783.mockapi.io/api/Poeple/Person")
            .then(res => res.json())
            .then(data => setPeople(data));
    }, []);

    return (
        <>
            <input
                className="border p-2 m-4"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />

            <div className="grid grid-cols-4 gap-4 p-4">
                {People
                    .filter(p =>
                        (p.name + p.jobtitle).toLowerCase().includes(filter.toLowerCase())
                    )
                    .map(person => (
                        <Card
                            name={person.name}
                            jobtitle={person.jobtitle}
                            image={person.avatar}
                        />
                    ))}
            </div>
        </>
    );
}
