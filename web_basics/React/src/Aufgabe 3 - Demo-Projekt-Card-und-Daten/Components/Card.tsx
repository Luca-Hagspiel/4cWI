export default function Card({name, jobtitle, image}: {name:string, jobtitle:string, image:string}) {
    return (
        <div className="flex items-center gap-4 p-2 border">
            <div className="flex flex-col">
                <p className="font-semibold text-gray-800">{name}</p>
                <p className="text-gray-500 text-sm">{jobtitle}</p>
            </div>
            <img src={image} alt={name} className=" object-cover" />
        </div>

    );
};
