import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 675,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

export const GalleryItem = ({ documents }) => {
  const { id } = useParams();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const classes = useStyles();
  const document = documents[id];
  return (
    <Card className={classes.root} square={true}>
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
        <Button size="small" onClick={goBack}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};
