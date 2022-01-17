import * as React from 'react';
import Nav from './Nav';

type Props = {
  id: number;
};

export default function Header({ id }: Props) {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex justify-between items-center h-14'>
        header
        {/* <Nav links={links} /> */}
      </div>
    </header>
  );
}
