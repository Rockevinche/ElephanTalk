import React from "react";

const CommentDetails = ({username, description}) => {
    return (
        <div className="mt-3 mx-5 mb-6">
            <div className="bg-dark-100 rounded-lg py-2">
                <p className="font-montserrat text-light-200 font-semibold text-lg mb-2 mx-3 px-2">
                    {username}
                </p>
                <p className="font-montserrat text-light-200 font-thin text-sm mx-3 px-2 overflow-x-hidden">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CommentDetails;
