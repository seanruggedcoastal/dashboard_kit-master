import Link from "next/link";
import {withRouter} from "next/router";
import {Children} from "react";
import React from "react";
import styled from 'styled-components'

const ActiveLink = styled.a`
  color: ${props => props.active ? props.theme.altColor : props.theme.normalText};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.altColor};
  }
`

export default withRouter(({router, render, children, as, href, ...rest}) => (
    <Link {...rest} href={href} as={as}>
        <ActiveLink active={(router.asPath === href || router.asPath === as) ? true : false}>{render}</ActiveLink>
    </Link>
));