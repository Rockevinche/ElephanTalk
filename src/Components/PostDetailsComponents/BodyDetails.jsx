import React from "react";
import ImageNotFound from "../../Assets/ImageNotFound.svg"
const BodyDetails = ({title, description, image}) => {
    return (
        <div>
            <div className="text-gray-400 max-h-128 flex justify-center font-medium text-sm mb-7 mt-6 mx-3 px-2">
                <img
                    className="rounded object-contain"
                    src={image}
                    onError={(e)=>{e.target.onerror = null; e.target.src=ImageNotFound}}
                    alt={title}
                />
            </div>
            <p className="font-montserrat text-light-200 font-semibold text-lg mb-2 mx-3 px-2 overflow-x-hidden">
                {title}
            </p>
            <p className="font-montserrat text-light-200 font-thin text-sm mb-6 mx-3 px-2 overflow-x-hidden">
                {description}
            </p>
        </div>
    );
};

export default BodyDetails;
