import React from "react";

const HeaderPost = ({username}) => {
    return (
        <div>
            <div className="flex align-center mt-2 px-2 py-3 mx-3">
                <div className="w-auto h-auto rounded-full border-2 border-primary-200">
                    <img
                            className="w-12 h-12 object-cover rounded-full shadow"
                            alt="User avatar"
                            src="https://www.svgrepo.com/show/33141/elephant.svg"
                    />
                </div>
                <div className="flex items-center ml-4">
                    <p className="text-light-100 text-lg font-semibold font-montserrat">{username}</p>
                </div>
            </div>
            <div className="border-b border-dark-100"></div>
        </div>
    );
};

export default HeaderPost;
