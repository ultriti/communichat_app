import React from 'react';
import "./pageNotFound.css"

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <a href="/users/register" className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Go Home
      </a>
    </div>
  );
};

export default PageNotFound;
