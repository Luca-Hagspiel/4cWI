import React from "react";

export default function Card({name, lastname, jobtitle}) {
    return (
        <div className="bg-orange-600 p-1 m-2 rounded flex">
            <p>{name}</p>
            <p>{lastname}</p>
            <p>{jobtitle}</p>
        </div>
    );
}
