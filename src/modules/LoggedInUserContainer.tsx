import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUser } from '../apis/user';

interface IProps {
  children: ReactElement;
}

export default function LoggedInUserContainer({ children }: IProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate('/signin');
    }
  });

  return <>{children}</>;
}
