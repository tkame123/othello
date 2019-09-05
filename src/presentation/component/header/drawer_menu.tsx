import React from 'react';
import styled from 'styled-components';
import {ReactModalAdapter} from "../common/modal";

import {config} from "../../../util/config";
import {Link} from "react-router-dom";
import {User} from "../../../domain/model/user";
import Button from "../common/button";

interface IProps {
    user: User | null;
    isOpenDrawnMenu: boolean;
    handleDrawMenuToggle: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const DrawerMenuComponent: React.FC<IProps> = (props) => {
    const {user, isOpenDrawnMenu, handleDrawMenuToggle, handleLoginOnGoogle, handleLogout} = props;

    return (
        <DrawerMenu
            isOpen={isOpenDrawnMenu}
            onRequestClose={handleDrawMenuToggle}
            contentLabel="Drawer Menu"
        >
            <Title>Othello</Title>
            <MenuUl>
                <MenuLi><MenuLink to={"/playrooms"} onClick={handleDrawMenuToggle}>PlayRooms</MenuLink></MenuLi>
                <MenuLi><MenuLink to={"/games"} onClick={handleDrawMenuToggle}>Games</MenuLink></MenuLi>
                <MenuLi/>
                <MenuLi>
                    {user && <p>{user.email}</p>}
                    {user && <Button onClick={handleLogout}>Logout</Button>}
                    {!user && <p>Guest</p>}
                    {!user && <Button onClick={handleLoginOnGoogle}>Login</Button>}
                </MenuLi>
            </MenuUl>
        </DrawerMenu>
    );

};

export default DrawerMenuComponent;

const DrawerMenu = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0);
    z-index: ${config().style.zindex.defaultModal};
    opacity: 0;
    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: ${config().style.color.background};
    box-shadow: 8px 0px 8px 0px rgba(0, 0, 0, 0.05);
    &.ReactModal__Content--after-open {
    }
    &.ReactModal__Content--before-close {
    }
  }
`;

const Title = styled.div`
  padding: 10px;
  text-align: left;
  font-family: 'Amatic SC', cursive;
  font-size: 26px;
`;

const MenuUl = styled.ul`
  padding-inline-start: 0px;

`;

const MenuLi = styled.li`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  list-style: none;
  font-size: 16px;
  border-bottom: #eee solid;
  border-width: thin; 
  :first-child {
    border-top: ${config().style.color.border} solid;  
    border-width: thin; 
  }
  
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  :link {
    color: #000000;
  }
  :visited {
    color: #000000;
  }
  ::before {
    margin-right: 1em;
    content: "\f04b";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
  }
`;
