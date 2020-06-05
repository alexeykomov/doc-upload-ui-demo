import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadForm from './UploadForm/UploadForm';
import Gallery from './Gallery/Gallery';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import grey from '@material-ui/core/colors/grey';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    borderTop: `1px solid ${grey[300]}`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
  content: {
    flex: 1,
  },
});

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('upload');
  return (
    <div className={classes.container}>
      <header className="App-header">Doc Upload</header>
      <Router>
        <div className={classes.content}>
          {activeTab === 'upload' ? <UploadForm /> : null}
          {activeTab === 'gallery' ? <Gallery /> : null}
        </div>

        <BottomNavigation
          className={classes.root}
          value={activeTab}
          onChange={(event, newValue) => {
            console.log('newValue: ', newValue);
            setActiveTab(newValue);
          }}
        >
          <BottomNavigationAction
            label="Upload"
            value="upload"
            icon={<AddIcon />}
          />
          <BottomNavigationAction
            label="Gallery"
            value="gallery"
            icon={<ListIcon />}
          />
        </BottomNavigation>
      </Router>
    </div>
  );
}

export default App;
