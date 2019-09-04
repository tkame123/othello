import React from 'react';
import styled from 'styled-components'

import {User} from "../../../domain/model/user";

import {config} from "../../../util/config";

interface IProps {
    user: User | null;
    handleLoginOnGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavbarMenuComponent: React.FC<IProps> = (props) => {

    const {user, handleLoginOnGoogle, handleLogout} = props;

    return (
        <Nav>
            <Title >Othello</Title>
            <Inner>
                <Menu area={"menu"}>
                    {user && user.email}
                    { !user
                        ? <button onClick={handleLoginOnGoogle}>Login</button>
                        : <button onClick={handleLogout}>Logout</button>
                    }
                </Menu>
            </Inner>
        </Nav>
    );

};

export default NavbarMenuComponent;

const template = `
    " . title menu ."
`;

interface ComponentProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
        > {
    area: string;
}

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
  background-color: #ffffff;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.05);
  
`;

const Inner = styled.div`
  display: grid;
  position: relative;
  grid-template-areas: ${template};
  grid-template-columns: 10px 1fr 400px 10px;
  padding: 20px 0px;
`;

const Title = styled.div`
  padding-left: 20px;
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: left;
  font-family: 'Amatic SC', cursive;
  font-size: 26px;
`;

const Menu = styled.div`
  grid-column: ${(props: ComponentProps) => props.area};
  text-align: right;
  position: relative;
`;
