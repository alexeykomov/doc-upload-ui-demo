import { UploadedDocument } from '../__types__';
import unionWith from 'lodash/unionWith';
import differenceWith from 'lodash/differenceWith';

export const compareDocuments = (
  documentA: UploadedDocument,
  documentB: UploadedDocument
) => {
  return (
    documentA.name === documentB.name &&
    documentA.ext === documentB.ext &&
    documentA.url === documentB.url
  );
};

export const shouldRenderNewDocuments = (
  oldDocuments: UploadedDocument[],
  newDocuments: UploadedDocument[]
) => {
  let union = unionWith(newDocuments, oldDocuments, compareDocuments);
  const difference = differenceWith(union, oldDocuments, compareDocuments);
  return difference.length;
};
