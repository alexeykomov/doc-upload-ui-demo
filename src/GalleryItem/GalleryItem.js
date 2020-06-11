import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 675,
  },
  progress: {
    minHeight: 275,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

export const GalleryItem = ({ setDocuments, documents }) => {
  const { id } = useParams();
  const history = useHistory();
  const goBack = () => {
    history.push('/gallery');
  };
  const classes = useStyles();
  const document = documents.find((document) => document.name === id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }

    setLoading(true);
    new Promise((res) => setTimeout(res, 1000)).then(() =>
      fetch(`../doc/${id}`)
        .then((response) => response.json())
        .then((retrievedDocument) => {
          const foundDocument = documents.find(
            (document) => document.name === retrievedDocument.name
          );
          if (!foundDocument) {
            setDocuments([...documents, retrievedDocument]);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(`Error when fetching documents: ${e}`);
          setLoading(false);
        })
    );
  });

  return (!document && loading) ? (
    <Card className={[classes.root, classes.progress]} square={true}>
      <CircularProgress />
    </Card>
  ) : document ? (
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
  ) : (
    <Card className={classes.root} square={true}>
      <CardContent>
        <Typography variant="body2" component="p">
          {'No such document'}
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
