import Link from "next/link";
import {withRouter} from "next/router";
import {Children} from "react";
import React from "react";

export default withRouter(({router, render, children, as, href, ...rest}) => (
   <li className={(router.asPath === href || router.asPath === as) ? `active` : null}>
    {console.log(router.asPath)}
    <Link {...rest} href={href} as={as}>
        {render}
    </Link>
   </li>
));