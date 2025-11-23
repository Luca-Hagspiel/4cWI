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
        <div className="mb-4 w-full">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-3 rounded-lg transition-colors focus:outline-none focus:ring-2
                    ${error
                    ? "bg-gray-800 border border-red-500 text-white placeholder-red-400 focus:ring-red-500"
                    : "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                }`}
            />
            {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
        </div>
    );
};

export default Inputs;
