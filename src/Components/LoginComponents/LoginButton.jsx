import React from "react";

const LoginButton = ({child}) => {
    return (
        <div className="px-4 pb-2 pt-4">
            <button
                type="submit"
                className="uppercase block w-full p-4 text-lg font-montserrat font-bold rounded-full bg-primary-200 hover:bg-primary-100 focus:outline-none"
            >
                {child}
            </button>
        </div>
    );
};

export default LoginButton;
