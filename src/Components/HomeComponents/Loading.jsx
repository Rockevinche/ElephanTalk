import React from "react";

const Loading = ({message="Cargando Publicaciones..."}) => {
    return (
        <div class="flex items-center justify-center p-4 m-12">
            <div class="flex justify-center items-center text-sm text-gray-500">
                <svg
                    fill="none"
                    className="w-6 h-6 sm:w-12 sm:h-12 animate-spin"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                    />
                </svg>

                <p className="text-2xl sm:text-4xl">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Loading;
