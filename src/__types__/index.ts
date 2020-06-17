import {DocumentCategory} from "../storage/DocumentRecord";

export interface UploadedDocument {
  ext: string;
  name: string;
  url: string;
  category: DocumentCategory,
  selected: boolean;
}
export type SetDocuments = (
  documents: UploadedDocument[]
) => void | React.Dispatch<React.SetStateAction<UploadedDocument[]>>;
