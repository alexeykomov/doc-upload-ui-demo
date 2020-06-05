import React, { useState } from 'react';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import Gallery from '../Gallery/Gallery';
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export const GalleryItem = () => {
  const { id } = useParams();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" component="p">
          {`This is uploaded document #${id}`}
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
