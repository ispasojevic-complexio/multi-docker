import React from 'react';
import { Link } from 'react-router-dom';

export const OtherPage = () => {
    return (
        <div>
            I'm some other page!
            <Link to="/">Go back to home</Link>
        </div>
    )
}