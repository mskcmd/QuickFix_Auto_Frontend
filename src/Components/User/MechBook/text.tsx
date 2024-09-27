

// // File: MechanicHeader.tsx



// // File: LocationModal.tsx

  
//   // File: index.tsx (or App.tsx)
//   import React from 'react';
//   import ReactDOM from 'react-dom';
//   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//   import { Provider } from 'react-redux';
//   import { store } from './app/store';
//   import MechBooking from './components/MechBooking/MechBooking';
//   // Import other components as needed
  
//   ReactDOM.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <Router>
//           <Routes>
//             <Route path="/book/:id" element={<MechBooking />} />
//             {/* Add other routes as needed */}
//           </Routes>
//         </Router>
//       </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );