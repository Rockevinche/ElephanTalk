import React from "react";

const LoginInput = ({ type = "text", name, placeholder, onChange, value}) => {
    return (
    <div className="pb-2 pt-4">
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="block w-full p-4 text-lg rounded-sm bg-black font-montserrat"
        onChange={onChange}
        value={value}
        />
    </div>
    );
};

export default LoginInput;
