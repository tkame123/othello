import React from 'react';
import {User} from "../../../domain/model/user";

import NavbarMenuComponent from "./navbar_menu";

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
            <NavbarMenuComponent
                user={user}
                handleLoginOnGoogle={handleLoginOnGoogle}
                handleLogout={handleLogout}
            />

            {children}

        </>
    );

};


export default NavbarComponent;
