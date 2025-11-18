const Vorlage = ({ToDo1, ToDo2} : {ToDo1: string, ToDo2: string}) => {
    return (
        <div className="border p-4 m-2 flex">
            <input className={"mr-2"} type={"checkbox"}/>
            <p> {ToDo1} {ToDo2}</p>
        </div>
    );
};
export default Vorlage;
