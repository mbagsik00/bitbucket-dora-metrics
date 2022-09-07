import { ReactElement } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

interface IProps {
  children: ReactElement;
  headerText: ReactElement;
}

export default function Layout({ children, headerText }: IProps) {
  return (
    <div className='min-h-full'>
      <NavBar />
      <Header text={headerText} />
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
}
