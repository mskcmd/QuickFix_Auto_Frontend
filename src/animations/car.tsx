// import React, { useEffect, useRef } from 'react';
// import Lenis from '@studio-freight/lenis';

// const CarAnimation: React.FC = () => {
//   const animationRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       direction: 'vertical',
//       gestureDirection: 'vertical',
//       smooth: true,
//       mouseMultiplier: 1,
//       smoothTouch: false,
//       touchMultiplier: 2,
//       infinite: false,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     const animateCars = () => {
//       if (animationRef.current) {
//         const cars = animationRef.current.querySelectorAll('.car');
//         cars.forEach((car, index) => {
//           const speed = 0.5 + (index * 0.1);
//           const position = (Date.now() * speed) % window.innerWidth;
//           (car as HTMLElement).style.transform = `translateX(${position}px)`;
//         });
//       }
//       requestAnimationFrame(animateCars);
//     };

//     animateCars();

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <div ref={animationRef} className="fixed inset-0 pointer-events-none z-0">
//       <div className="car absolute" style={{top: '20%', left: '-100px'}}>🚗</div>
//       <div className="car absolute" style={{top: '40%', left: '-100px'}}>🚙</div>
//       <div className="car absolute" style={{top: '60%', left: '-100px'}}>🚕</div>
//       <div className="car absolute" style={{top: '80%', left: '-100px'}}>🏎️</div>
//     </div>
//   );
// };

// export default CarAnimation;