import { DocumentRecord, DocumentRecordForStorage } from './DocumentRecord';

export const bufferToBlob = ({
  name,
  mimeType,
  category,
  buffer,
}: DocumentRecordForStorage): DocumentRecord => {
  const blob = new Blob([buffer], { type: mimeType });

  return {
    name,
    mimeType,
    category,
    file: blob,
  };
};

export const blobToBuffer = ({
  name,
  mimeType,
  category,
  file,
}: DocumentRecord): Promise<DocumentRecordForStorage> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const buffer = reader.result;
      resolve({
        name,
        mimeType,
        category,
        buffer: buffer as ArrayBuffer,
      });
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(file);
  });
};
