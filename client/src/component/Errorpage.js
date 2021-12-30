import React from 'react';
import { NavLink } from 'react-router-dom';
const Errorpage = () => {
    return (
        <>
            <div>Error 404 Page not found</div>
            <NavLink to="/">Back to Homepage</NavLink>
        </>
    )
}

export default Errorpage;