import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error403: FC = () => (
  <Link to="/">
    <img
      src="/assets/403.png"
      className="h-[100vh] w-[100vw] cursor-pointer"
      alt=""
    />
  </Link>
);

export { Error403 };
