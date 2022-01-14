import * as React from 'react';
import Nav from '@/components/layout/Nav';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='flex-column'>
      <Header id={1} />
      <>{children}</>;
    </div>
  );
}
