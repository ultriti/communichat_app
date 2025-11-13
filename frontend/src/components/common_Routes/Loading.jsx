import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      ease: 'power1.inOut',
      transformOrigin: 'center center'
    });
  }, []);

  return (
    <div className="spinner-wrapper">
      <div className="spinner" ref={spinnerRef}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
