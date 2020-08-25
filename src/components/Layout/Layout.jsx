import React from 'react';
import "./layout.scss";

const Layout = (props) => {
    return (
        <div>
            <header>
                <h1>Weather App</h1>
            </header>
            {props.children}
        </div>
    );
}

export default Layout;