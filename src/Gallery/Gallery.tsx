import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import differenceWith from 'lodash/differenceWith';
import unionWith from 'lodash/unionWith';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SetDocuments, UploadedDocument } from '../__types__';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import { openingStorage } from '../index';

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
});

interface GalleryItemProps {
  setDocuments: SetDocuments;
  documents: UploadedDocument[];
}

const compareDocuments = (
  documentA: UploadedDocument,
  documentB: UploadedDocument
) => {
  return documentA.name === documentB.name &&
      documentA.ext === documentB.ext &&
      documentA.url === documentB.url;

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
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(-1);

  const documentList = aDocuments.map((document, index) => ({
    ...document,
    selected: id === String(index),
  }));
  if (!id) {
    documentList[0].selected = true;
  }

  const document = documentList.reduce(
    (firstSelected: UploadedDocument, nextDocument: UploadedDocument) => {
      if (!firstSelected.selected && nextDocument.selected) {
        return nextDocument;
      }
      return firstSelected;
    },
    documentList[0]
  );

  useEffect(() => {
    if (document.url) {
      return;
    }

    setLoading(true);
    openingStorage
      .then((storage) => {
        let category = document.category;
        return storage.select(category);
      })
      .then((documentRecord) => {
        if (!documentRecord) {
          setLoading(false);
          return;
        }
        const url = URL.createObjectURL(documentRecord.file);
        const retrievedDocument: UploadedDocument = {
          name: documentRecord.name,
          ext: documentRecord.mimeType,
          category: documentRecord.category,
          url: url,
          selected: false,
        };

        const documents = aDocuments.map((document) => {
          if (document.url) {
            URL.revokeObjectURL(document.url);
          }
          return { ...document, url: '' };
        });
        const indexToReplace = documents.findIndex(
          (document) => document.category === documentRecord.category
        );
        documents.splice(indexToReplace, 1, retrievedDocument);
        const renderNewDocuments = shouldRenderNewDocuments(
          aDocuments,
          documents
        );
        if (renderNewDocuments) {
          setDocuments(documents);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(`Error when fetching documents: ${e}`);
        setLoading(false);
      });
  }, [document.category, aDocuments, setDocuments]);

  useEffect(() => {
    openingStorage
      .then((storage) => {
        return storage.count();
      })
      .then((count) => setCount(count));
  });

  const makeOnClick = (cardId: number) => () => {
    history.push(`/gallery/${cardId}`);
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

  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    const input = inputRef.current as HTMLInputElement;
    const files = input.files;
    if (!files || !files.length) {
      return;
    }
    const firstFile = files[0];
    openingStorage
      .then((storage) => {
        return storage.store({
          file: firstFile,
          name: firstFile.name,
          category: document.category,
          mimeType: firstFile.type,
        });
      })
      .then(() => setDocuments([...aDocuments]));
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.listContainer}>
        <Typography variant="body1" component="h3" className={classes.header}>
          {`Your Uploaded Documents (${count < 0 ? '-' : count})`}
        </Typography>
        <List component="nav" aria-label="List of documents">
          {itemsElements}
        </List>
      </div>
      <div className={classes.readingContainer}>
        {loading ? (
          <CircularProgress className={classes.progress} />
        ) : document.url ? (
          <img
            width={300}
            src={document.url}
            alt={document.name}
            className={classes.pageView}
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/*,application/pdf"
              id="upload-form-mini"
              className={classes.uploadForm}
              onChange={onChange}
              ref={inputRef}
            />
            <label htmlFor="upload-form-mini">
              <IconButton
                color="primary"
                aria-label="Upload document"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default Gallery;