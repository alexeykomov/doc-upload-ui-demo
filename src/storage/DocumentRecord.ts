export interface DocumentRecord {
  category: DocumentCategory;
  name: string;
  file: Blob;
  mimeType: string;
}

export interface DocumentRecordForStorage {
  category: DocumentCategory;
  name: string;
  buffer: ArrayBuffer;
  mimeType: string;
}

export enum DocumentCategory {
  DriverLicense = 'DriverLicense',
  YourPhoto = 'YourPhoto',
  InsuranceCard = 'InsuranceCard',
  W2 = 'W2',
  PayStub = 'PayStub',
}

export const DocumentName = {
  [DocumentCategory.DriverLicense]: "Driver's License",
  [DocumentCategory.YourPhoto]: 'Your Photo',
  [DocumentCategory.InsuranceCard]: 'Insurance Card',
  [DocumentCategory.W2]: 'W2',
  [DocumentCategory.PayStub]: 'Pay Stub',
};

export const DocumentCategoryOrder = [
  DocumentCategory.DriverLicense,
  DocumentCategory.YourPhoto,
  DocumentCategory.InsuranceCard,
  DocumentCategory.W2,
  DocumentCategory.PayStub,
];
