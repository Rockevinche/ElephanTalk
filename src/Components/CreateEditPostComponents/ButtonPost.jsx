import React from "react";

const ButtonPost = ({type = "button", child, onReturnHome}) => {
    return (
        <button
            class="btn text-1xl rounded-lg border border-primary-200 p-1 px-4 cursor-pointer text-white font-bold ml-2 bg-primary-200 hover:bg-primary-100"
            type={type}
            onClick={onReturnHome}
        >
            {child}
        </button>
    );
};

export default ButtonPost;
