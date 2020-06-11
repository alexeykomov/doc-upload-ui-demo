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
    minHeight: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
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
  const matchGallery = useRouteMatch('/gallery/:id');
  const matchItem = useRouteMatch('/item/:id');
  const activeTab = (() => {
    if (matchRoot && matchRoot.path === '/' && matchRoot.isExact) {
      return 'upload';
    }
    if (matchUpload && matchUpload.path === '/upload') {
      return 'upload';
    }
    if (matchGallery && matchGallery.path === '/gallery/:id') {
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
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" children={<UploadForm />} />
            <Route path="/upload" children={<UploadForm />} />
            <Route
              path="/gallery/:id"
              children={
                <Gallery setDocuments={setDocuments} documents={documents} />
              }
            />
            <Route
              path="/item/:id"
              children={
                <GalleryItem
                  setDocuments={setDocuments}
                  documents={documents}
                />
              }
            />
          </Switch>
        </div>
      </div>
    </>
  );
};
