import React from 'react';
import logo from './logo.svg';
import './App.css';
import UploadForm from "./UploadForm/UploadForm";
import Gallery from "./Gallery/Gallery";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Doc Upload
      </header>
      {'This is a form'}
      <UploadForm/>
      {'This is a gallery'}
      <Gallery/>
    </div>
  );
}

export default App;
