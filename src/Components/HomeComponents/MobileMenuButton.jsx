import React from 'react'

const MobileMenuButton = ({showHamburguer, setShowHamburguer}) => {
    let buttonCloseStyles = `w-6 h-6 ${showHamburguer ? "" : "hidden"}`

    let buttonOpenStyles = `w-6 h-6 ${showHamburguer ? "hidden" : ""}`

    //Boton para cerrar el menu hamburguesa
    return (
        <button id="mobileMenuButton" className="p-3 focus:outline-none lg:hidden" title="Open side menu" onClick={()=>setShowHamburguer(!showHamburguer)}>
        {/* <!-- SVG For "x" button --> */}
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#E4E6EB"
            className={buttonCloseStyles}
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
            ></path>
            </svg>
            {/* <!-- SVG For "Menu burger" button --> */}
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#E4E6EB"            className={buttonOpenStyles}
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            ></path>
            </svg>
        </button>
    )
}

export default MobileMenuButton
