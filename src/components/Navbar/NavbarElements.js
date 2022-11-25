import styled from "styled-components";

import * as colors from "../variables/colors";
import * as font_sizes from "../variables/font-sizes";
import * as font_families from "../variables/font-families";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const NavWrapper = styled.nav`
  padding: 0.75em;
  background-color: ${colors.clr_black_full};
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25em;
`;

export const NavMenu = styled.button`
  background-color: ${colors.clr_black_full};
  border: none;
  cursor: pointer;
`;

export const NavMenuIcon = styled(FontAwesomeIcon)`
  font-size: ${font_sizes.fs_650};
  color: white;
`;

export const NavList = styled.ul`
  margin-top: 1em;
`;

export const NavListItem = styled.li`
  padding: 0.75em 0.25em;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: ${font_sizes.fs_400};

  &:hover {
    text-decoration: underline;
  }
`;

export const NavButtonWrapper = styled.div`
  display: flex;
  align-self: center;
`;
