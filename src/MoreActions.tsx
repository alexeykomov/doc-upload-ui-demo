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
  selectedDocument: UploadedDocument;
  documents: UploadedDocument[];
}

export const MoreActions = ({
  selectedDocument,
  documents,
  setDocuments,
}: MoreActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // @ts-ignore
  const onMenuClick = (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget as Element);
  };
  const open = !!anchorEl;
  const onClose = () => {
    setAnchorEl(null);
  }
  const onDeleteClick = () => {
    openingStorage
      .then((storage) => {
        return storage.delete(selectedDocument.category);
      })
      .then(() => {
        const deletedDocument = selectedDocument;
        URL.revokeObjectURL(deletedDocument.url);
        deletedDocument.url = '';
        const modifiedDocuments = [...documents];
        const indexToReplace = modifiedDocuments.findIndex(
          (document) => document.category === deletedDocument.category
        );
        modifiedDocuments.splice(indexToReplace, 1, deletedDocument);
        setDocuments(modifiedDocuments);
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
        <MenuItem onClick={onDeleteClick}>
          <Delete />
          {`Delete ${selectedDocument.category}`}
        </MenuItem>
      </Menu>
    </>
  );
};
