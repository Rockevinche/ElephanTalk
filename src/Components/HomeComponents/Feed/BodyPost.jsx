import React from "react";
import {Link} from "react-router-dom";
import ImageNotFound from "../../../Assets/ImageNotFound.svg"

const BodyPost = ({image, title, description, id, active}) => {
        return (
                <div>
                    <div className="text-gray-400 font-medium flex justify-center text-sm mb-7 mt-6 mx-3 px-2">
                        <img
                                className="rounded"
                                src={image}
                                onError={(e)=>{e.target.onerror = null; e.target.src=ImageNotFound}}
                                alt={title}
                        />
                    </div>
                    <Link to={active ? `/view/${id}` : "#"}>
                        <p className="font-montserrat text-light-200 font-semibold text-lg mb-2 mx-3 px-2 overflow-x-hidden">
                            {title}
                        </p>
                    </Link>
                    <p className="font-montserrat text-light-200 font-thin text-sm mb-6 mx-3 px-2 overflow-x-hidden">
                        {description}
                    </p>
                </div>
        );
};

export default BodyPost;
