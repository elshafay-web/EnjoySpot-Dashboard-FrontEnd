import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error500: FC = () => (
  <>
    <h1 className="fw-bolder fs-2qx text-gray-900 mb-4">System Error</h1>
    <div className="fw-semibold fs-6 text-gray-500 mb-7">
      Something went wrong! Please try again later.
    </div>
    <div className="mb-11">
      <img
        src="media/500-error.png"
        className="mw-100 mh-300px theme-light-show"
        alt=""
      />
    </div>
    <div className="mb-0">
      <Link to="/dashboard" className="btn btn-sm btn-primary">
        Return Home
      </Link>
    </div>
  </>
);

export { Error500 };
