import React from 'react';
import {User} from "../../../domain/model/user";

import NavbarMenuComponent from "./navbar_menu";
import DrawerMenuComponent from "./drawer_menu";

interface IProps {
    isLoading: boolean;
    isOpenDrawnMenu: boolean;
    user: User | null;
    handleDrawMenuToggle: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const HeaderComponent: React.FC<IProps> = (props) => {

    const {isOpenDrawnMenu, user, handleDrawMenuToggle, handleLoginOnGoogle, handleLogout} = props;

    return (
        <>
            <NavbarMenuComponent
                user={user}
                handleDrawMenuToggle={handleDrawMenuToggle}
                handleLoginOnGoogle={handleLoginOnGoogle}
                handleLogout={handleLogout}
            />

            <DrawerMenuComponent
                user={user}
                isOpenDrawnMenu={isOpenDrawnMenu}
                handleDrawMenuToggle={handleDrawMenuToggle}
                handleLoginOnGoogle={handleLoginOnGoogle}
                handleLogout={handleLogout}
            />
        </>
    );

};


export default HeaderComponent;
