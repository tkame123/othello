import React from 'react';
import styled from 'styled-components'
import {config} from "../../../util/config";
import Button from "../common/button";
import {User} from "../../../domain/model/user";

interface IProps {
    user: User | null;
    handleDrawMenuToggle: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavbarMenuComponent: React.FC<IProps> = (props) => {

    const {user, handleDrawMenuToggle, handleLoginOnGoogle, handleLogout} = props;

    return (
        <Nav>
            <Title>Othello</Title>
            <Inner>
                <DrawMenu className="fas fa-bars fa-fw" onClick={handleDrawMenuToggle} />
                <AuthMenu>
                    {user && <Button onClick={handleLogout}>Logout</Button>}
                    {!user && <Button onClick={handleLoginOnGoogle}>Login</Button>}
                </AuthMenu>
            </Inner>

        </Nav>
    );

};

export default NavbarMenuComponent;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${config().style.zindex.nav};
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 65px;
  background-color: ${config().style.color.primary};
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.05);

`;

const Inner = styled.div`
  position: relative;
  top: 10px;
  height: 2em;
  width: 100%;
`;

const Title = styled.div`
  z-index: 0;
  position: absolute;
  top: 5px;
  width: 100%;
  color: ${config().style.color.onPrimary};
  font-family: 'Amatic SC', cursive;
  text-align: center;
  vertical-align: middle;
  font-size: 2em;
`;

const DrawMenu = styled.i`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 10px;
  color: ${config().style.color.onPrimary};
  text-align: center;
  vertical-align: middle;
  font-size: 2em;
`;

const AuthMenu = styled.div`
  z-index: 1;
  position: absolute;
  top: 5px;
  right: 10px;
  text-align: center;
`;
