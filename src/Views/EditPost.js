import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserServices from "../Services/UserServices";
import ButtonPost from "../Components/CreateEditPostComponents/ButtonPost";
import InputPost from "../Components/CreateEditPostComponents/InputPost";
import TextAreaPost from "../Components/CreateEditPostComponents/TextAreaPost";
import ShowMessage from "../Components/LoginComponents/ShowMessage";

const EditPost = () => {
    const {idPost} = useParams(); //Obtener el id de la publicacion a editar 
    const {updatePost, getOnePost} = UserServices;
    const [message, setMessage] = useState({message: "", title: ""});
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: "",
    });

    //Traer la informacion de la publicacion a editar
    useEffect(() => {
        async function getPost(){
            const {title, description, image} = await getOnePost(token, idPost);
            setPost({title, description, image});
        }

        getPost();
    } ,[]);

    //Obtener los datos del formulario
    const handleInputChange = (e, change) => {
        const {name, value} = e.target;
        change({...post, [name]: value});
    };

    //Funcion para editar la publicacion
    const onUpdatePost = async (e) => {
        e.preventDefault();
        const {title, description} = post;

        if((title.length < 8 || title.length > 32)){
            setMessage({message: "El título debe tener entre 8 y 32 caracteres", title: "¡Advertencia!"});
            setShowMessage(true);
            return;
        }

        if(description.length < 8){
            setMessage({message: "La descripción debe tener al menos 8 caracteres", title: "¡Advertencia!"});
            setShowMessage(true);
            return;
        }

        if(await updatePost(token, post, idPost)){
            setMessage({message: "El post se ha editado correctamente", title: "¡Enhorabuena!"});
            setShowMessage(true);
            setTimeout(() => {setShowMessage(false)}, 5000);
        }else{
            setMessage({message: "No se pudo editar el post", title: "¡Error!"});
            setShowMessage(true);
        }   
    }

    //Funcion para volver a la pagina de inicio
    const onReturnHome = () => navigate("/home");

    return (
        <section className="flex h-screen bg-dark-300">
            <form class="m-auto w-full bg-dark-300" onSubmit={onUpdatePost}>
                <h1 class=" text-4xl text-light-100 heading text-center font-bold m-5 text-gray-800">
                    Editar publicación
                </h1>
                <div class="bg-dark-200 rounded-lg editor mx-auto w-10/12 flex flex-col mb-5 text-gray-800 border border-dark-300 p-4 shadow-lg max-w-2xl">
                    <InputPost
                        placeholder="Titulo de la publicación"
                        onChange={(e) => handleInputChange(e, setPost)}
                        value={post.title}
                        name="title"
                        required="true"
                    />
                    <TextAreaPost
                        placeholder="Escriba la descripcion de tu publicación"
                        onChange={(e) => handleInputChange(e, setPost)}
                        value={post.description}
                        name="description"
                        required="true"
                    />
                    <InputPost
                        placeholder="URL de Imagen"
                        onChange={(e) => handleInputChange(e, setPost)}
                        value={post.image}
                        name="image"
                        required="true"
                    />
                    {showMessage && <ShowMessage title={message.title} message={message.message}/>}
                    <div class="buttons flex justify-end">
                        <ButtonPost
                            child="Cancelar"
                            type={"button"}
                            onReturnHome={onReturnHome}
                        />
                        <ButtonPost child="Editar" type={"submit"} />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default EditPost;
