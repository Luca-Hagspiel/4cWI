export default function List({ items }) {
    return (
        <div className="bg-blue-500 rounded-lg p-3">
            <ul className="list-disc pl-5">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="hover:font-bold hover:underline"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
