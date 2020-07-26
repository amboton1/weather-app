import React from 'react';
import "../scss/layout.scss";

const Layout = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

export default Layout;