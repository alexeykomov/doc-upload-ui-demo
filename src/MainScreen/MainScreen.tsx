import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadForm from '../UploadForm/UploadForm';
import Gallery from '../Gallery/Gallery';
import GalleryItem from '../GalleryItem/GalleryItem';
import { UploadedDocument } from '../__types__';
import { DocumentCategoryOrder } from '../storage/DocumentRecord';

export const MainScreen = () => {
  const [documents, setDocuments] = useState(
    DocumentCategoryOrder.map((category) => ({
      ext: '',
      name: '',
      url: '',
      category,
      selected: false,
    })) as UploadedDocument[]
  );

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          children={
            <Gallery setDocuments={setDocuments} documents={documents} />
          }
        />
        <Route path="/upload" children={<UploadForm />} />
        <Route
          path="/gallery/:id"
          children={
            <Gallery setDocuments={setDocuments} documents={documents} />
          }
        />
        <Route
          path="/item/:id"
          children={
            <GalleryItem setDocuments={setDocuments} documents={documents} />
          }
        />
      </Switch>
    </>
  );
};
