import React, {useState} from "react";
import ShowMessage from "../LoginComponents/ShowMessage";
import UserServices from "../../Services/UserServices";

const CommentFormDetails = ({comments, likes, id, setPost, user}) => {
    const {comment} = UserServices;
    const [commentInput, setCommentInput] = useState({description: ""});
    const [message, setMessage] = useState({message: "", title: ""});
    const [showMessage, setShowMessage] = useState(false);
    const token = localStorage.getItem("token");

    //Obtener la informacion del input del comentario
    const commentInputchange = (e) => {
        const {name, value} = e.target;
        setCommentInput({...commentInput, [name]: value});
    };

    //funcion para enviar un comentario
    const onSubmit = async (e) => {
        e.preventDefault();

        if (commentInput.description.length < 8) {
            setMessage({
                message: "El comentario debe tener al menos 8 caracteres",
                title: "¡Advertencia!"
            });
            setShowMessage(true);
            return;
        }

        if (await comment(token, commentInput, id)) {
            setPost((prev) => ({
                ...prev,
                comments: [
                    ...prev.comments,
                    {
                        ...commentInput,
                        user: {username: user},
                        _id: `${Date().toLocaleString()}_${user}`,
                    },
                ],
            }));
            setMessage({
                message: "El comentario se ha enviado correctamente",
                title: "¡Enhorabuena!"
            });
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            setCommentInput({description: ""});
        } else {
            setMessage({
                message: "No se pudo enviar el comentario",
                title: "¡Error!"
            });
            setShowMessage(true);
        }
    };

    //Funcion paa aproximar el numero de likes y comentarios
    const TruncateLikesOrComments = (cantidad) => {
        if(cantidad > 999 && cantidad <= 999999){
            return `${(cantidad*0.001).toFixed(1)}k`;
        }

        if(cantidad > 999999){
            return `${(cantidad*0.000001).toFixed(1)}M`;
        }

        return cantidad;
    }

    return (
        <div>
            <div className="flex w-full border-t border-dark-100">
                <div className="mt-3 mx-5 flex flex-row">
                    <div className="flex text-light-200 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                        Comentarios:
                        <div className="ml-1 text-light-200 font-thin text-ms">
                            {TruncateLikesOrComments(comments.length)}
                        </div>
                    </div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end">
                    <div className="flex text-light-200 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                        Me gustas:
                        <div className="ml-1 text-light-200 font-thin text-ms">
                            {TruncateLikesOrComments(likes.length)}
                        </div>
                    </div>
                </div>
            </div>
            <form
                onSubmit={onSubmit}
                className="relative flex flex-col items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
            >
                {showMessage && (
                    <ShowMessage
                        title={message.title}
                        message={message.message}
                    />
                )}
                <div className="w-full">
                    <span className="absolute right-0 flex items-center pr-6">
                        <button
                            type="submit"
                            className="p-1 focus:outline-none focus:shadow-none hover:text-primary-200 text-light-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                    <input
                        type="text"
                        className="w-full py-2 pl-4 pr-10 text-sm bg-dark-100 text-light-100 rounded-lg border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:outline-none focus:text-light-100"
                        placeholder="Escribir un comentario..."
                        autocomplete="off"
                        value={commentInput.description}
                        onChange={commentInputchange}
                        name="description"
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default CommentFormDetails;
