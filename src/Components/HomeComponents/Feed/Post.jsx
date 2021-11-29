import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BodyPost from "./BodyPost";
import CommentsPost from "./CommentsPost";
import ControlsPost from "./ControlsPost";
import HeaderPost from "./HeaderPost";
import UserServices from "../../../Services/UserServices";

const Post = ({role, post, activeUsername, setPosts, favorites, setFavorites, setIsHidden, setIsAddingFavorite}) => {
    const token = localStorage.getItem("token");
    const {toggleActive, like, getFavoritesIds, favorite} = UserServices;
    const navigate = useNavigate();

    const {
        _id,
        title,
        description,
        image,
        active,
        user: {username},
        likes,
        comments,
    } = post;

    //Obtener los posts favoritos del usuarios para poder identificar cuales ya han sido agregados
    useEffect(() => {
        async function getFavorites() {
            const favorites = await getFavoritesIds(token);
            setFavorites(favorites);
        }

        getFavorites();
    }, []);

    //Funciones para los botones de las publicaciones

    const onEdit = () => navigate(`/edit/${_id}`);

    const onHidde = async () => {
        if (await toggleActive(token, _id)) {
            setPosts((prev) =>
                prev.map((post) =>
                    post._id === _id ? {...post, active: !post.active} : post
                )
            );

            setIsHidden(prev => !prev);
        }
    };

    const onLike = async () => {
        if (await like(token, _id)) {
            setPosts((prev) =>
                prev.map((post) => {
                    if (post._id === _id) {
                        const validateLike = (element) => element.username === activeUsername;

                        const newLikes = post.likes.some(validateLike)
                            ? post.likes.filter(i => i.username !== activeUsername)
                            : [...post.likes, {username: activeUsername}];
                            
                        return {...post, likes: newLikes};
                    }
                    return post;
                })
            );
        }
    };

    const onFavorite = async () => {
        if(await favorite(token, _id)) {
            setFavorites((prev) => prev.includes(_id) ? prev.filter(i => i !== _id) : [...prev, _id]);
            setIsAddingFavorite(prev => !prev);
        }
    }

    //Validaciones para los botones de las publicaciones
    const isActiveUserPost = ((username === activeUsername) && (role === "admin")) ? true : false;
    const alreadyLiked = likes.some((element) => element.username === activeUsername);
    const isFavorite = favorites.includes(_id);

    return (
        <div classNameName="">
            <div className="flex max-w-xl my-6 bg-dark-200 shadow-md rounded-lg mx-auto">
                <div className="flex items-center w-full">
                    <div className="w-full">
                        <HeaderPost username={username} />
                        <BodyPost
                            image={image}
                            title={title}
                            description={description}
                            id={_id}
                            active={active}
                        />
                        <ControlsPost
                            verifyuser={isActiveUserPost}
                            verifyLike={alreadyLiked}
                            verifyFavorite={isFavorite}
                            onEdit={onEdit}
                            onHidde={onHidde}
                            active={active}
                            onLike={onLike}
                            onFavorite={onFavorite}
                        />
                        <CommentsPost 
                            id={_id}
                            likes={likes}
                            comments={comments}
                            setPosts={setPosts}
                            active={active}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
