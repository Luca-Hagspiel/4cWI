function Card({title}:{title: string}) {
    return (
        <div className="flex justify-center border bg-teal-400 text-white hover:cursor-pointer hover:bg-teal-700">{title}</div>
    );
}

export default Card;