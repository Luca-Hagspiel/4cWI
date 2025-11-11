export default function Card({name, jobtitle, image}: { name: string, jobtitle: string, image: string }) {
    return (
        <div className="flex items-center gap-4 p-2 border rounded-lg overflow-hidden">
            <div className="flex flex-col min-w-0">
                <p className="font-semibold text-gray-800 truncate">{name}</p>
                <p className="text-gray-500 text-sm truncate">{jobtitle}</p>
            </div>
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden rounded-md ml-auto">
                <img src={image} alt={name} className="w-full h-full object-cover object-center"/>
            </div>
        </div>

    );
};
