import React from "react";

const ControlsDetails = ({verifyUser, verifyLike, verifyFavorite, onEdit, onLike, onFavorite}) => {
    return (
        <div className="flex justify-start mb-4 border-t border-dark-100">
            <div className="flex w-full mt-1 pt-2 pl-5">
                <button onClick={onLike} className={`flex justify-center items-center bg-dark-100 transition ease-out duration-300 w-10 h-10 text-center rounded-full ${verifyLike ? "text-primary-200" : "text-light-200" } cursor-pointer mr-2`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                        ></path>
                    </svg>
                </button>
                <button onClick={onFavorite} className={`flex justify-center items-center ${verifyFavorite ? "text-red-500" : "text-light-200"} bg-dark-100 transition ease-out duration-300 w-10 h-10 text-center rounded-full cursor-pointer mr-2`}>
                    <svg
                        fill="none"
                        width="22px"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </button>
            </div>
            {verifyUser && (
            <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                <button onClick={onEdit} className="flex justify-center items-center bg-dark-100 transition ease-out duration-300 hover:text-primary-200 w-10 h-10 text-center rounded-full text-light-200 cursor-pointer mr-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22px"
                        stroke="currentColor"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </div>)}
        </div>
    );
};

export default ControlsDetails;
