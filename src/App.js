import React from 'react';
import logo from './logo.svg';
import './App.css';
import UploadForm from "./UploadForm/UploadForm";
import Gallery from "./Gallery/Gallery";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {'This is a form'}
      <UploadForm/>
      {'This is a gallery'}
      <Gallery/>
    </div>
  );
}

export default App;
