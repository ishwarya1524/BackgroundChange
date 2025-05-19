import React, { useState } from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Setcolor from './components/Setcolor/Setcolor';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [page, setPage] = useState('register'); // tracks which component to show
  const [color, setcolor] = useState('');
  const [email, setemail] = useState(localStorage.getItem('email') || '');

  const goTo = (newPage) => setPage(newPage); // helper function to change page

  return (
    <ErrorBoundary>
      <div>
        {page === 'register' && (
          <Register goTo={goTo} />
        )}

        {page === 'login' && (
          <Login setcolor={setcolor} setemail={setemail} goTo={goTo} />
        )}

        {page === 'color' && (
          <Setcolor color={color} setcolor={setcolor} email={email} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
