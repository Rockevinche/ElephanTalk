import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserServices from "../Services/UserServices";
import HeaderDetails from "../Components/PostDetailsComponents/HeaderDetails";
import BodyDetails from "../Components/PostDetailsComponents/BodyDetails";
import ControlsDetails from "../Components/PostDetailsComponents/ControlsDetails";
import CommentFormDetails from "../Components/PostDetailsComponents/CommentFormDetails";
import CommentListDetails from "../Components/PostDetailsComponents/CommentListDetails";
import Loading from "../Components/HomeComponents/Loading";

const PostDetails = ({activeUsername, role}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {like, favorite, getOnePost, getFavoritesIds} = UserServices;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const {idPost} = useParams();
    const [favorites, setFavorites] = useState([]);
    const [postView, setPostView] = useState({
        title: "",
        description: "",
        image: "",
        comments: [],
        username: "",
        likes: [],
        active: false,
    });

    //Obtener la informacion del post del cual se quieren ver los detalles
    useEffect(() => {
        async function getPost() {
            const newPost = await getOnePost(token, idPost);

            if (Object.keys(newPost).length) {
                setPostView({
                    title: newPost.title,
                    description: newPost.description,
                    image: newPost.image,
                    comments: newPost.comments,
                    username: newPost.user.username,
                    likes: newPost.likes,
                    active: newPost.active,
                });
            } else {
                setPostView({
                    title: "La publicación no se ha encontrado :c",
                    description:
                        "Algo ha salido mal al intentar cargar la publicación",
                    image: "",
                    comments: [],
                    username: "Usuario no encontrado",
                    likes: [],
                    active: true,
                });

                setIsError(true);
            }
            setIsLoading(false);
        }

        async function getFavorites() {
            const favorites = await getFavoritesIds(token);
            setFavorites(favorites);
        }

        getPost();
        getFavorites();
    }, []);

    //Funciones para los botones de la publicacion 

    const onEdit = () => navigate(`/edit/${idPost}`);

    const onLike = async () => {
        if (await like(token, idPost)) {
            setPostView((prev) => {
                const validateLike = (element) =>
                    element.username === activeUsername;

                const newLikes = prev.likes.some(validateLike)
                    ? prev.likes.filter((i) => i.username !== activeUsername)
                    : [...prev.likes, {username: activeUsername}];

                return {...prev, likes: newLikes};
            });
        }
    };

    const onFavorite = async () => {
        if (await favorite(token, idPost)) {
            setFavorites((prev) =>
                prev.includes(idPost)
                    ? prev.filter((i) => i !== idPost)
                    : [...prev, idPost]
            );
        }
    };

    //Validaciones para los botones de las publicaciones
    const isActiveUserPost = postView.username === activeUsername && role === "admin" ? true : false;
    const alreadyLiked = postView.likes.some((element) => element.username === activeUsername);
    const isFavorite = favorites.includes(idPost);

    return (
        <section className="bg-dark-300 h-screen">
            <div className="pt-8 pb-8 bg-dark-300">
                <div classNameName=" bg-dark-300">
                    {isLoading && <Loading message="Cargando publicación..." />}
                    {!isLoading && (
                        <div className="flex max-w-6xl my-6 bg-dark-200 shadow-md rounded-lg mx-auto">
                            <div className="flex items-center w-full">
                                <div className="w-full">
                                    <HeaderDetails
                                        username={postView.username}
                                    />
                                    <BodyDetails
                                        title={postView.title}
                                        description={postView.description}
                                        image={postView.image}
                                    />
                                    {!isError && (
                                        <ControlsDetails
                                            verifyUser={isActiveUserPost}
                                            verifyLike={alreadyLiked}
                                            verifyFavorite={isFavorite}
                                            onEdit={onEdit}
                                            onLike={onLike}
                                            onFavorite={onFavorite}
                                        />
                                    )}
                                    {!isError && (
                                        <CommentFormDetails
                                            comments={postView.comments}
                                            likes={postView.likes}
                                            id={idPost}
                                            setPost={setPostView}
                                            user={activeUsername}
                                        />
                                    )}
                                    {!isError && (
                                        <CommentListDetails
                                            comments={postView.comments}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default PostDetails;
