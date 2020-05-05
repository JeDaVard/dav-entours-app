import React from "react";

function Layout(props) {
    return (
        <>
            <header>{props.header}</header>
            <main>
                {props.children}
            </main>
            <footer>{props.footer}</footer>
        </>
    )
}

export default Layout