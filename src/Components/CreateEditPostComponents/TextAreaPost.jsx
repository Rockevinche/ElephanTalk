import React from "react";

const TextAreaPost = ({placeholder, required, value, onChange, name}) => {
    return (
        <textarea
            class="description bg-dark-100 resize-none text-light-200 sec p-3 mb-4 h-60 border rounded-lg border-dark-200 focus:text-light-100 outline-none"
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            required={required}
        ></textarea>
    );
};

export default TextAreaPost;
