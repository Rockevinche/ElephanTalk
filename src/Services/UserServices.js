const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

const UserServices = {};

//Funciones para conectar con la api

const getOnePost = async (token, id) => {
    const response = await fetch(`${BASE_URL}/post/one/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const post = await response.json();
        return post;
    }

    return {};
}

UserServices.getOnePost = getOnePost;

UserServices.login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        const {token} = await response.json();
        return token;
    }

    return undefined;
}

UserServices.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();;
        return data;
    }

    return undefined;
}

UserServices.getAllPosts = async (token, pages) => {
    const response = await fetch(`${BASE_URL}/post/all?limit=10&page=${pages}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {data:posts} = await response.json();
        return posts;
    }

    return [];
}

UserServices.getOwnedPosts = async (token, pages) => {
    const response = await fetch(`${BASE_URL}/post/owned?limit=10&page=${pages}}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {data:posts} = await response.json();
        return posts;
    }

    return [];
}

UserServices.getFavoritePosts = async (token) => {
    const response = await fetch(`${BASE_URL}/post/fav`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {favorites} = await response.json();

        const favoritePostsPromises = favorites.map(async(favorite)=>{
            return await getOnePost(token, favorite);
        });

        const favoritePosts = await Promise.all(favoritePostsPromises);
        const filteredPosts = favoritePosts.filter(post => Object.keys(post).length > 0);
        return filteredPosts;
    }

    return [];
}

UserServices.getFavoritesIds = async (token) => {
    const response = await fetch(`${BASE_URL}/post/fav`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {favorites} = await response.json();
        return favorites;
    }

    return [];
}

UserServices.createPost = async (token, post) => {
    const response = await fetch(`${BASE_URL}/post/create`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.updatePost = async (token, post, id) => {
    const response = await fetch(`${BASE_URL}/post/update/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.toggleActive = async (token, id) => {
    const response = await fetch(`${BASE_URL}/post/toggle/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.like = async (token, id) => {
    const response = await fetch(`${BASE_URL}/post/like/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.favorite = async (token, id) => {
    const response = await fetch(`${BASE_URL}/post/fav/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.comment = async (token, comment, id) => {
    const response = await fetch(`${BASE_URL}/post/comment/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        return true;
    }

    return false;
}

UserServices.getPagesAll = async (token) => {
    const response = await fetch(`${BASE_URL}/post/all?limit=10&page=0`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {pages} = await response.json();
        return pages;
    }

    return [];
}

UserServices.getPagesOwned = async (token) => {
    const response = await fetch(`${BASE_URL}/post/owned?limit=10&page=0`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const {pages} = await response.json();
        return pages;
    }

    return [];
}
export default UserServices;