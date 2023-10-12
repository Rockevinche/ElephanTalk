import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import HamburgerMenu from "../Components/HomeComponents/HamburgerMenu";
import MobileMenuButton from "../Components/HomeComponents/MobileMenuButton";
import PostList from "../Components/HomeComponents/Feed/PostList";
import UserServices from "../Services/UserServices";

const Home = ({setToken, username, role}) => {
    //Estaados necesarios para controlar el funcionamiento de la pagina
    const {getAllPosts, getFavoritePosts, getOwnedPosts, getPagesAll, getPagesOwned} = UserServices;
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState("Inicio");
    const [pagesAll, setPagesAll] = useState(0);
    const [pageAll, setPageAll] = useState(0);
    const [pagesOwned, setPagesOwned] = useState(0);
    const [pageOwned, setPageOwned] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const [isAddingFavorite, setIsAddingFavorite] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showHamburguer, setShowHamburguer] = useState(false);
    const navigate = useNavigate();

    //Obtener las publicaciones iniciales que debe mostrar la pagina
    useEffect(() => {
        async function getPosts() {
            const postsFetch = await getAllPosts(token, 0)
            setIsLoading(false);
            setPosts(postsFetch);
            setPagesAll(await getPagesAll(token));
            setPagesOwned(await getPagesOwned(token));
        }

        getPosts();
    }, []);

    //Obtener las publicaciones nuevamente cuando hay un cambio en las publicaciones
    useEffect(() => {
        async function getPosts() {
            if (currentPage === "Inicio") {
                let newPosts = [];
                const actualPage = pageAll;

                for (let i = 0; i <= pageAll; i++) {
                    const auxPosts = await getAllPosts(token, i);

                    newPosts = [...newPosts, ...auxPosts];
                }
                
                setPosts(newPosts);
                setPageAll(actualPage);
            }

            // if (currentPage === "Publicaciones Favoritas") {
            //     setPosts(await getFavoritePosts(token));
            //     setHasNextPage(false);
            // }

            if (currentPage === "Mis Publicaciones") {
                let newPosts = [];
                const actualPage = pageOwned;

                for (let i = 0; i <= pageOwned; i++) {
                    const auxPosts = await getOwnedPosts(token, i);

                    newPosts = [...newPosts, ...auxPosts];
                }
                
                setPosts(newPosts);
                setPageOwned(actualPage);
            }
        }

        getPosts();
    }, [isHidden, isAddingFavorite]);

    // //Enviar al usuario al incio de la pagina cuando se cambia la vista de publicaciones a mostrar
    // useEffect(() => {
    //     async function whenChange() {
    //         window.scrollTo(0, 0);
    //     }  

    //     whenChange();
    // }, [isChanging]);

    // Funcion para cargar las nuevas publicaciones del Infinite Scroll
    const fetchNextPage = async () => {
        let newPosts = [];

        if(currentPage === "Inicio") {
            newPosts = await getAllPosts(token, pageAll + 1);
            setPageAll(prevPage => prevPage + 1);
        }

        if(currentPage === "Mis Publicaciones") {
            newPosts = await getOwnedPosts(token, pageOwned + 1);
            setPageOwned(prevPage => prevPage + 1);
        }

        if((pageAll === pagesAll - 1 && currentPage === "Inicio") || (pageOwned === pagesOwned - 1 && currentPage === "Mis Publicaciones")) {
            setHasNextPage(false);
        }
        setPosts([...posts, ...newPosts]);
    }

    // Funciones para los botones del menu de navegacion
    const onLogOut = () => {
        setToken(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    const onAllPosts = async () => {
        setPageAll(0);
        setPosts(await getAllPosts(token, 0));
        setIsChanging(!isChanging);
        setCurrentPage("Inicio");  
        setPagesAll(await getPagesAll(token));
        setHasNextPage(true);
    };

    // const onFavoritePost = async () => {
    //     setPosts(await getFavoritePosts(token));
    //     setIsChanging(!isChanging);
    //     setCurrentPage("Publicaciones Favoritas");
    //     setHasNextPage(false);
    // };

    const onOwnedPosts = async () => {
        setPageOwned(0);
        setPosts(await getOwnedPosts(token, 0));
        setIsChanging(!isChanging);
        setCurrentPage("Mis Publicaciones");
        setPagesOwned(await getPagesOwned(token));
        setHasNextPage(true);
    };

    const onAddPost = () => navigate("/new");

    return (
        <section className="bg-dark-300 h-screen">
            <nav className="bg-dark-200 shadow fixed z-10 inset-x-0 top-0 flex justify-between items-center">
                <div className="w-auto my-2 mx-4 h-12 sm:h-12 inline-flex p-2 sm:p-1">
                    <img src={Logo} alt="logo" />
                </div>
                <HamburgerMenu
                    showHamburguer={showHamburguer}
                    onLogOut={onLogOut}
                    // onFavoritePost={onFavoritePost}
                    onAllPosts={onAllPosts}
                    onOwnedPosts={onOwnedPosts}
                    onAddPost={onAddPost}
                    role={role}
                />
                <MobileMenuButton
                    showHamburguer={showHamburguer}
                    setShowHamburguer={setShowHamburguer}
                />
            </nav>
            <PostList
                username={username}
                role={role}
                posts={posts}
                setPosts={setPosts}
                currentPage={currentPage}
                setIsHidden={setIsHidden}
                setIsAddingFavorite={setIsAddingFavorite}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isLoading={isLoading}
                pagesAll={pagesAll}
                pageAll={pageAll}
                pagesOwned={pagesOwned}
                pageOwned={pageOwned}
            />
        </section>
    );
};

export default Home;
