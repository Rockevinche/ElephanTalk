import React from "react";

const InputPost = ({placeholder, type = "text", name, onChange, value, required}) => {
    return (
        <input
            className="title bg-gray-100 bg-dark-100 rounded-lg text-light-200 border border-dark-200 focus:text-light-100 p-2 mb-4 outline-none"
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            value={value}
            name={name}
            required={required}
        />
    );
};

export default InputPost;
