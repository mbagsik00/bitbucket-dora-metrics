import { ReactElement } from 'react';

interface IProps {
  text?: ReactElement;
}

export default function Header({ text }: IProps) {
  return (
    <header className='bg-white shadow'>
      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{text}</div>
    </header>
  );
}
