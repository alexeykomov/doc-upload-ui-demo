export interface UploadedDocument {
  ext: string;
  name: string;
  url: string;
}
export type SetDocuments = (
  documents: UploadedDocument[]
) => void | React.Dispatch<React.SetStateAction<UploadedDocument[]>>;
