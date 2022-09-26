import React from 'react';
import './App.css';
import RouteMain from './RouteMain';
import { BrowserRouter } from 'react-router-dom';

export default function Root() {
  return (
    
      <BrowserRouter>
        <RouteMain/>
      </BrowserRouter>
    
  );
}