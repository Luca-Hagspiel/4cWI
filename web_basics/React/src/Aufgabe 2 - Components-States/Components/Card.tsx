import {useState} from "react";

function Card({title}:{title: string}) {
    const [AmountOfClicks, setAmountOfClicks] = useState(0)

    let style = AmountOfClicks < 5 ? "bg-red-600" : "bg-green-600";
    return (
        <div className="m-5 w-40 h-10">
            <div
                className="justify-center items-center bg-teal-400 text-white hover:cursor-pointer hover:bg-teal-700"
                onClick={() => setAmountOfClicks(AmountOfClicks + 1)}>
                {title}
            </div>

            <p className={`${style} text-white`}>Amount Clicks: {AmountOfClicks}</p>
        </div>
    );
}

export default Card;