import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import Gallery from '../Gallery/Gallery';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { GalleryItem } from '../GalleryItem/GalleryItem';

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
    alignItems: 'center',
    maxWidth: '825px',
    margin: '0 auto',
  },
});

export const MainScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const onChange = (event, newValue) => {
    history.push(`/${newValue}`);
  };
  const matchRoot = useRouteMatch('/');
  const matchUpload = useRouteMatch('/upload');
  const matchGallery = useRouteMatch('/gallery');
  const matchItem = useRouteMatch('/item/:id');
  const activeTab = (() => {
    if (matchRoot && matchRoot.path === '/' && matchRoot.isExact) {
      return 'upload';
    }
    if (matchUpload && matchUpload.path === '/upload') {
      return 'upload';
    }
    if (matchGallery && matchGallery.path === '/gallery') {
      return 'gallery';
    }
    if (matchItem && matchItem.path === '/item/:id') {
      return 'gallery';
    }
    return 'upload';
  })();

  const [documents, setDocuments] = useState([]);

  return (
    <>
      <div className={classes.container}>
        <header className="App-header">Doc Upload</header>
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" children={<UploadForm />} />
            <Route path="/upload" children={<UploadForm />} />
            <Route
              path="/gallery"
              children={
                <Gallery setDocuments={setDocuments} documents={documents} />
              }
            />
            <Route
              path="/item/:id"
              children={<GalleryItem documents={documents} />}
            />
          </Switch>
        </div>
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
