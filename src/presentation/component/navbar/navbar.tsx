import React from 'react';
import {User} from "../../../domain/model/user";

interface IProps {
    isLoading: boolean;
    children: any;
    user: User | null;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const NavbarComponent: React.FC<IProps> = (props) => {

    const {user, children, handleLoginOnGoogle, handleLogout} = props;

    return (
        <>
            {user && <div>{user.email}</div>}

            <button onClick={handleLoginOnGoogle}>Login</button>
            <button onClick={handleLogout}>Logout</button>

            {children}

        </>
    );

};


export default NavbarComponent;
