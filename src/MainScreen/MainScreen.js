import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import Gallery from '../Gallery/Gallery';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import {GalleryItem} from "../GalleryItem/GalleryItem";

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

export const MainScreen = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('upload');
  const history = useHistory();
  const onChange = (event, newValue) => {
    console.log('newValue: ', newValue);
    console.log('history: ', history);
    history.push(`/${newValue}`);
    setActiveTab(newValue);
  };
  return (
    <>

      <header className="App-header">Doc Upload</header>
      <div className={classes.container}>
        <Switch>
          <Route exact path="/" children={<UploadForm />} />
          <Route path="/upload" children={<UploadForm />} />
          <Route path="/gallery" children={<Gallery />} />
          <Route path="/item/:id" children={<GalleryItem />} />
        </Switch>
        {/*<div className={classes.content}>
          {activeTab === 'upload' ? <UploadForm /> : null}
          {activeTab === 'gallery' ? <Gallery /> : null}
        </div>*/}

        <BottomNavigation
          className={classes.root}
          value={activeTab}
          onChange={onChange}
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
      </div>
    </>
  );
};
