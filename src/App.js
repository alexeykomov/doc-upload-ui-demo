import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadForm from './UploadForm/UploadForm';
import Gallery from './Gallery/Gallery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import grey from '@material-ui/core/colors/grey';

import { makeStyles } from '@material-ui/core/styles';
import { MainScreen } from './MainScreen/MainScreen';

function App() {
  return <MainScreen />;
}

export default App;
