import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderDetails = ({username}) => {
    const navigate = useNavigate();

    const onClick = () => navigate("/home");

    return (
        <div>
            <div className="flex align-center justify-between mt-2 px-2 py-3 mx-3">
                <div class="flex">
                    <div className="w-auto h-auto rounded-full border-2 border-primary-200">
                        <img
                            className="w-12 h-12 object-cover rounded-full shadow"
                            alt="User avatar"
                            src="https://www.svgrepo.com/show/33141/elephant.svg"
                        />
                    </div>
                    <div className="flex items-center ml-4">
                        <p className="text-light-100 text-lg font-semibold font-montserrat">
                            {username}
                        </p>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button  onClick={onClick} className="flex justify-center items-center bg-dark-100 transition ease-out duration-300 hover:text-primary-200 w-10 h-10 text-center rounded-full text-light-200 cursor-pointer mr-2">
                        <svg
                            class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border-b border-dark-100"></div>
        </div>
    );
};

export default HeaderDetails;
