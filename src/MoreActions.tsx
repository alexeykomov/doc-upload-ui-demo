import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Delete from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { openingStorage } from './storage/storage';
import {SetDocuments, UploadedDocument} from './__types__';

interface MoreActionsProps {
  setDocuments: SetDocuments;
  document: UploadedDocument;
  aDocuments: UploadedDocument[];
}

export const MoreActions = ({
  document,
  aDocuments,
  setDocuments,
}: MoreActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // @ts-ignore
  const onMenuClick = (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget as Element);
  };
  const open = !!anchorEl;
  const onClose = () => {
    openingStorage
      .then((storage) => {
        return storage.delete(document.category);
      })
      .then(() => {
        const deletedDocument = document;
        URL.revokeObjectURL(deletedDocument.url);
        deletedDocument.url = '';
        const documents = [...aDocuments];
        const indexToReplace = documents.findIndex(
          (document) => document.category === deletedDocument.category
        );
        documents.splice(indexToReplace, 1, deletedDocument);
        setDocuments(documents);
      });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="More actions"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onMenuClick}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={onClose}
      >
        <MenuItem onClick={onClose}>
          <Delete />
          {`Delete ${document.category}`}
        </MenuItem>
      </Menu>
    </>
  );
};
