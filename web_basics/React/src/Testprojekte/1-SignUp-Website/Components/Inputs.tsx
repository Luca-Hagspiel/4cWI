import React from "react";

type Props = {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

const Inputs = ({ type, placeholder, value, onChange, error }: Props) => {
    return (
        <div className="mb-2 ml-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border w-9/10 pl-3 rounded-md p-2 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-400" : "border-gray-500 focus:ring-blue-500"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Inputs;
