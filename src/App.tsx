import React from 'react';
import './App.css';
import { MainScreen } from './MainScreen/MainScreen';
import {openingStorage} from "./storage/storage";

function App() {
  return <MainScreen />;
}

window.addEventListener('unload', () => {
  openingStorage.then(storage => storage.close());
});

export default App;
