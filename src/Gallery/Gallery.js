import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

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
    width: '100%'
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
  const history = useHistory();
  const makeOnClick = cardId => () => { history.push(`/item/${cardId}`) }
  for (let counter = 0; counter < 10; counter++) {
    cards.push(
      <Card className={classes.root} key={counter} square={true}>
        <CardContent>
          <Typography variant="body2" component="p">
            {`This is uploaded document #${counter}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={makeOnClick(counter)}>Open</Button>
        </CardActions>
      </Card>
    );
  }
  return <div className={classes.container}>{cards}</div>;
}

export default Gallery;
