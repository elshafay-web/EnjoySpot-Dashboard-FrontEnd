import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error404: FC = () => (
  <Link to="/">
    <img
      src="/assets/404.png"
      className="h-[100vh] w-[100vw] cursor-pointer"
      alt=""
    />
  </Link>
);

export { Error404 };
