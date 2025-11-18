import {useState} from "react";

const Card = () => {

    const [Lichtschalter, setLichtschalter] = useState(0);
    let source:string = Lichtschalter % 2 === 0 ? "/Aufgabe%204%20-%20Lichtschalter/light-off.jpg" : "/Aufgabe%204%20-%20Lichtschalter/light-on.jpg";
    let background = Lichtschalter % 2 === 0 ? "bg-white" : "bg-yellow-400";

    return (
        <div className={`${background}`}>
            <div className={"h-screen flex items-center justify-center "}>
                <img onClick={() => setLichtschalter(Lichtschalter + 1)} className={"size-50"} src={`${source}`}/>
            </div>
        </div>
    );
};
export default Card;
