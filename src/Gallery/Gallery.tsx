import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import differenceWith from 'lodash/differenceWith';
import unionWith from 'lodash/unionWith';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SetDocuments, UploadedDocument } from '../__types__';

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
    maxWidth: '320px',
    backgroundColor: '#fff',
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
});

interface GalleryItemProps {
  setDocuments: SetDocuments;
  documents: UploadedDocument[];
}

const compareDocuments = (
  documentA: UploadedDocument,
  documentB: UploadedDocument
) => {
  if (documentA.name === documentB.name && documentA.ext === documentB.ext) {
    return true;
  }
  return false;
};

const shouldRenderNewDocuments = (
  oldDocuments: UploadedDocument[],
  newDocuments: UploadedDocument[]
) => {
  let union = unionWith(newDocuments, oldDocuments, compareDocuments);
  const difference = differenceWith(union, oldDocuments, compareDocuments);
  return difference.length;
};

function Gallery(props: GalleryItemProps) {
  const { documents: aDocuments, setDocuments } = props;
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  console.log('id: ', id);

  let items = [
    { name: "Driver's License", selected: false },
    { name: 'Your Photo', selected: false },
    { name: 'Insurance Card', selected: true },
    { name: 'W2', selected: false },
    { name: 'Pay Stub', selected: false },
  ].map((item, index) => ({ ...item, selected: id === String(index) }));

  useEffect(() => {
    fetch('./doc')
      .then((response) => response.json())
      .then((documents) => {
        if (shouldRenderNewDocuments(aDocuments, documents)) {
          setDocuments(documents);
        }
      })
      .catch((e) => console.log(`Error when fetching documents: ${e}`));
  });
  const makeOnClick = (cardId: number) => () => {
    history.push(`/gallery/${cardId}`);
  };

  const itemsElements = items.map((item, index) => (
    <ListItem
      button
      onClick={makeOnClick(index)}
      className={item.selected ? classes.listItemSelected : ''}
      key={item.name}
    >
      <ListItemText primary={item.name} className={classes.itemText} />
    </ListItem>
  ));

  return (
    <div className={classes.mainContainer}>
      <div className={classes.listContainer}>
        <Typography variant="body1" component="h3" className={classes.header}>
          Your Uploaded Documents (5)
        </Typography>
        <List component="nav" aria-label="List of documents">
          {itemsElements}
        </List>
      </div>
      <div className={classes.readingContainer}>
        <img
          width={300}
          src={`../screen${id}.png`}
          alt={'Стив Макконнелл - Совершенный код, 2-е издание - 2010.png'}
          className={classes.pageView}
        />
      </div>
    </div>
  );
}

export default Gallery;
