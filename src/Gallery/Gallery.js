import React, { useState, useEffect } from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import { differenceWith, unionWith } from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    maxWidth: '700px',
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

const compareDocuments = (documentA, documentB) => {
  if (documentA.name === documentB.name && documentA.ext === documentB.ext) {
    return true;
  }
  return false;
};

const shouldRenderNewDocuments = (oldDocuments, newDocuments) => {
  let union = unionWith(newDocuments, oldDocuments, compareDocuments);
  const difference = differenceWith(union, oldDocuments, compareDocuments);
  return difference.length !== 0;
};

function Gallery({ setDocuments, documents: aDocuments }) {
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
  const makeOnClick = (cardId) => () => {
    history.push(`/gallery/${cardId}`);
  };

  const itemsElements = items.map((item, index) => (
    <ListItem
      button
      onClick={makeOnClick(index)}
      className={item.selected ? classes.listItemSelected : {}}
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
