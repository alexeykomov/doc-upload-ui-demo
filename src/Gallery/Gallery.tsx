import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SetDocuments, UploadedDocument } from '../__types__';

import { openingStorage } from '../index';
import GalleryItem from '../GalleryItem/GalleryItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Delete} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  header: {
    color: 'rgb(141,175,192)',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  mainContainer: {
    flexDirection: 'row',
    display: 'flex',
    height: '100%',
    width: '100%',

    position: 'absolute',
  },
  readingContainer: {
    backgroundColor: 'rgb(233,239,246)',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    height: '100%',
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  listContainerWideScreen: {
    maxWidth: '320px',
  },
  listItemSelected: {
    backgroundColor: 'rgb(233,239,246)',
  },
  itemText: {
    color: 'rgb(121,120,121)',
  },
  pageView: {
    width: '80%',
    maxWidth: '600px',
    cursor: 'grab',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  uploadForm: {
    position: 'absolute',
    visibility: 'hidden',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    justifySelf: 'flex-end',
  },
});

interface GalleryItemProps {
  setDocuments: SetDocuments;
  documents: UploadedDocument[];
}

function Gallery(props: GalleryItemProps) {
  const { documents: aDocuments, setDocuments } = props;
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [count, setCount] = useState(-1);
  const screenIsWide = useMediaQuery('(min-width: 400px)');
  const documentList = aDocuments.map((document, index) => ({
    ...document,
    selected: id === String(index),
  }));
  if (!id) {
    documentList[0].selected = true;
  }

  useEffect(() => {
    openingStorage
      .then((storage) => {
        return storage.count();
      })
      .then((count) => setCount(count));
  });

  const makeOnClick = (cardId: number) => () => {
    if (screenIsWide) {
      history.push(`/gallery/${cardId}`);
      return;
    }

    history.push(`/item/${cardId}`);
  };

  const itemsElements = documentList.map((item, index) => (
    <ListItem
      button
      onClick={makeOnClick(index)}
      className={item.selected ? classes.listItemSelected : ''}
      key={item.category}
    >
      <ListItemText primary={item.category} className={classes.itemText} />
    </ListItem>
  ));

  return (<>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">{`Your Uploaded Documents (${count < 0 ? '-' : count})`}</Typography>
          <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
              className={classes.buttonDelete}
          >
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>
    <div className={classes.mainContainer}>
      <div
        className={`${classes.listContainer} ${
          screenIsWide ? classes.listContainerWideScreen : ''
        }`}
      >
        <Typography variant="body1" component="h3" className={classes.header}>
          {`Your Uploaded Documents (${count < 0 ? '-' : count})`}
        </Typography>
        <List component="nav" aria-label="List of documents">
          {itemsElements}
        </List>
      </div>
      {screenIsWide && (
        <GalleryItem setDocuments={setDocuments} documents={aDocuments} />
      )}
    </div>
  </>);
}

export default Gallery;
