import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SetDocuments, UploadedDocument } from '../__types__';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, Typography } from '@material-ui/core';
import { openingStorage } from '../storage/storage';
import { MoreActions } from '../MoreActions';
import { WIDE_SCREEN_MEDIA_QUERY } from '../MainScreen/MainScreenConstants';
import { shouldRenderNewDocuments } from './GalleryItemUtils';
import { useStyles } from './GalleryItemStyles';

interface GalleryItemProps {
  setDocuments: SetDocuments;
  documents: UploadedDocument[];
}

function GalleryItem(props: GalleryItemProps) {
  const { documents: aDocuments, setDocuments } = props;
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const screenIsWide = useMediaQuery(WIDE_SCREEN_MEDIA_QUERY);
  const [screenIsWideState, setScreenIsWideState] = useState(screenIsWide);
  const history = useHistory();

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
        console.log('storage: ', storage);
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

  const resizeListener = () => {
    const screenIsWide = matchMedia('(min-width:400px)');
    if (screenIsWide.matches && !screenIsWideState) {
      history.push(`/gallery/${id}`);
    }
    setScreenIsWideState(screenIsWide.matches);
  };
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  });

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
    <>
      {screenIsWide ? null : (
        <AppBar>
          <Toolbar>
            <Typography variant="h6">{`${document.category}`}</Typography>
            <MoreActions
              setDocuments={setDocuments}
              selectedDocument={document}
              documents={documentList}
            />
          </Toolbar>
        </AppBar>
      )}
      <div
        className={`${classes.readingContainer} ${
          screenIsWide ? classes.readingContainerScreenIsWide : ''
        }`}
      >
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
                <PhotoCamera fontSize={screenIsWide ? 'default' : 'large'} />
              </IconButton>
            </label>
          </>
        )}
      </div>
    </>
  );
}

export default GalleryItem;
