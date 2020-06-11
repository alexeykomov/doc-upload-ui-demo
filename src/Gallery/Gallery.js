import React, { useState, useEffect } from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import { differenceWith, unionWith } from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth: '825px',
    width: '100%',
  },
  containerNarrow: {
    justifyContent: 'center',
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
  let cards = [];
  const history = useHistory();

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
    history.push(`/item/${cardId}`);
  };
  const screenIsNarrow = useMediaQuery('(max-width:550px)');
  console.log('screenIsNarrow: ', screenIsNarrow);

  cards = aDocuments.map((document, index) => (
    <Card className={classes.root} key={document.url} square={true}>
      <CardMedia
        className={classes.media}
        image={document.url}
        title={document.name}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {document.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={makeOnClick(document.name)}>
          Open
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <div
      className={[
        ...[classes.container],
        ...(screenIsNarrow ? [classes.containerNarrow] : []),
      ]}
    >
      {cards}
    </div>
  );
}

export default Gallery;
