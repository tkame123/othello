import React from 'react';
import {User} from "../../../domain/model/user";

import NavbarMenuComponent from "./navbar_menu";

interface IProps {
    isLoading: boolean;
    isOpenDrawnMenu: boolean;
    children: any;
    user: User | null;
    handleDrawMenuToggle: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const HeaderComponent: React.FC<IProps> = (props) => {

    const {isOpenDrawnMenu, user, children, handleDrawMenuToggle, handleLoginOnGoogle, handleLogout} = props;

    return (
        <>
            <NavbarMenuComponent
                isOpenDrawnMenu={isOpenDrawnMenu}
                user={user}
                handleDrawMenuToggle={handleDrawMenuToggle}
                handleLoginOnGoogle={handleLoginOnGoogle}
                handleLogout={handleLogout}
            />

            {children}

        </>
    );

};


export default HeaderComponent;
