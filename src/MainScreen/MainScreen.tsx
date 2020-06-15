import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import Gallery from '../Gallery/Gallery';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { UploadedDocument } from '../__types__';

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
  const [documents, setDocuments] = useState([] as UploadedDocument[]);

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
