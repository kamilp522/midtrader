import styled from "styled-components";
import * as colors from "../variables/colors";
import * as font_sizes from "../variables/font-sizes";

import { Link } from "react-router-dom";

export const FooterWrapper = styled.footer`
  height: 4.25em;
  background-color: ${colors.clr_black_full};
  color: white;
`;

export const FooterContainer = styled.div`
  padding: 1.25em 0.75em;
  background-color: ${colors.clr_black_full};
`;

export const FooterLinks = styled.ul`
  display: flex;
  flex-direction: column;
  padding-block: 0.75em;
`;

export const FooterListItem = styled.li`
  padding-block: 0.4em;
`;

export const FooterLink = styled(Link)`
  color: ${colors.clr_cream_500};
  padding-block: 0.4em;
  line-height: 0.4em;
  text-decoration: none;

  &:hover {
    color: ${colors.clr_cream_900};
  }
`;

export const FooterCredits = styled.div`
  line-height: 1.25em;
`;

export const Credit = styled.div`
  margin-block: 0.25em;
  color: ${colors.clr_cream_900};

  & p {
    display: inline-flex;
    margin-right: 0.5em;
  }

  & a {
    display: inline-flex;
    font-size: ${font_sizes.fs_350};
    letter-spacing: 0.5px;
    padding: 0.1em;
    color: ${colors.clr_blue_800};
    text-decoration: none;
  }

  & a:hover {
    color: ${colors.clr_cream_900};
  }
`;

export const FooterCopyright = styled.div`
  margin-top: 0.75em;
`;

export const WebsiteRights = styled.small`
  color: ${colors.clr_cream_900};
  font-size: ${font_sizes.fs_350};
`;
