import * as React from 'react';
import Nav from './Nav';

type Props = {
  id: number;
};

export default function Header({ id }: Props) {
  return (
    <header className='bg-white sticky top-0 z-50'>
      <div className='flex h-14 items-center justify-between layout'></div>
    </header>
  );
}
