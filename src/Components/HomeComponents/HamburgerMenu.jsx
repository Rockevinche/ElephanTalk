import React from 'react'

const HamburgerMenu = ({showHamburguer, onLogOut, role, onFavoritePost, onAllPosts, onOwnedPosts, onAddPost}) => {
    let HamburguerMenuStyles = `bg-dark-200 font-semibold z-10 rounded-bl-md flex absolute top-0 right-0 transition-all duration-500 transform translate-x-0
                            w-1/2 lg:w-auto
                            px-3 lg:px-0
                            flex-col lg:flex-row
                            lg:translate-y-0
                            lg: top-2
                            lg:shadow-none
                            lg:mt-1 lg:items-center lg:mx-1 lg:uppercase
                            ${showHamburguer ? "mt-14 shadow" : "-translate-y-full"}`

    //las funciones crear publicacion y ver mis publicaciones solo estan disponibles para administrador
    return (
        <div className={HamburguerMenuStyles}>
            <button onClick={onAllPosts} className="font-montserrat text-light-100 font-bold mx-0 sm:mx-2 my-2 border-b-2 border-transparent hover:border-primary-200 hover:text-primary-200 transition-all duration-500 py-1 sm:p-0">Inicio</button>
            {role==="admin" && <button onClick={onAddPost} className="font-montserrat text-light-100 font-bold mx-0 sm:mx-2 my-2 border-b-2 border-transparent hover:border-primary-200 hover:text-primary-200 transition-all duration-500 py-1 sm:p-0">Crear</button>}
            <button onClick={onFavoritePost} className="font-montserrat text-light-100 font-bold mx-0 sm:mx-2 my-2 border-b-2 border-transparent hover:border-primary-200 hover:text-primary-200 transition-all duration-500 py-1 sm:p-0">Favoritas</button>
            {role==="admin" && <button onClick={onOwnedPosts} className="font-montserrat text-light-100 font-bold mx-0 sm:mx-2 my-2 border-b-2 border-transparent hover:border-primary-200 hover:text-primary-200 transition-all duration-500 py-1 sm:p-0">Mis publicaciones</button>}
            <button onClick={onLogOut} className="font-montserrat text-light-100 font-bold mx-0 sm:mx-2 my-2 border-b-2 border-transparent hover:border-primary-200 hover:text-primary-200 transition-all duration-500 py-1 sm:p-0">Cerrar sesión</button>
        </div>
    )
}

export default HamburgerMenu
