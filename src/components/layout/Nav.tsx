import * as React from 'react';
import Link from 'next/link';

type NavLink = { href: string; text: string };
type Props = {
  links: NavLink[];
};

const Nav = ({ links }: Props) => (
  <nav>
    <ul>
      {links.map((link) => (
        <React.Fragment key={link.href}>
          <Link href={link.href}>
            <a>{link.text}</a>
          </Link>{' '}
          |{' '}
        </React.Fragment>
      ))}
    </ul>
  </nav>
);

export default Nav;
