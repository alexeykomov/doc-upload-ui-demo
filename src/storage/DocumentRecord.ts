export interface DocumentRecord {
  category: DocumentCategory
  name: string
  file: Blob,
  mimeType: string,
}

export interface DocumentRecordForStorage {
  category: DocumentCategory
  name: string
  buffer: ArrayBuffer,
  mimeType: string,
}

export enum DocumentCategory {
  DriverLicense = 'DriverLicense',
  YourPhoto = 'YourPhoto',
  InsuranceCard = 'InsuranceCard',
  W2 = 'W2',
  PayStub = 'PayStub'
}
