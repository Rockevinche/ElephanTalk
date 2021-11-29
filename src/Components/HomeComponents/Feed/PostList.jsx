import React, {useState} from "react";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";

const PostList = ({
    role,
    posts,
    username,
    setPosts,
    currentPage,
    setIsHidden,
    setIsAddingFavorite,
    fetchNextPage,
    hasNextPage,
    isLoading,
}) => {
    const [favorites, setFavorites] = useState([]);

    return (
        <div className="pt-10 pb-8 bg-dark-300">
            <p className="text-center text-2xl font-bold sm:text-4xl mt-16 text-gray-500">
                {currentPage}
            </p>
            {(posts.length === 0 && !isLoading) &&(
                <p className="text-center text-2xl sm:text-4xl mt-16 text-gray-500">
                    No se encontraron publicaciones :c
                </p>
            )}
            {isLoading && (
                <Loading />
            )}

            {/*Infinite scroll para la paginacion*/}
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={
                    currentPage !== "Publicaciones Favoritas" &&
                        posts.length > 0 && (
                            <Loading />
                        )
                }
                endMessage={
                    posts.length > 0 && (
                    <p className="text-center text-2xl font-bold sm:text-4xl mt-16 text-gray-500 p-4">
                        Ya has visto todas las publicaciones
                    </p>
                    )
                }
            >
                {
                    posts.map((post) => (
                    <Post
                        key={post._id}
                        activeUsername={username}
                        role={role}
                        post={post}
                        setPosts={setPosts}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setIsHidden={setIsHidden}
                        setIsAddingFavorite={setIsAddingFavorite}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default PostList;
