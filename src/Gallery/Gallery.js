import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Gallery() {
  const classes = useStyles();
  const cards = [];
  for (let counter = 0; counter < 10; counter++) {
    cards.push(
      <Card className={classes.root} key={counter} square={true}>
        <CardContent>
          <Typography variant="body2" component="p">
            {`This is uploaded document #${counter}`}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return <div className={classes.container}>{cards}</div>;
}

export default Gallery;
