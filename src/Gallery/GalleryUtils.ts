import {
    DocumentCategory,
    DocumentCategoryOrder
} from '../storage/DocumentRecord';
import {UploadedDocument} from "../__types__";

export const getDocumentKeyById = (
  documents: { name: string; selected: boolean },
  id: string
): DocumentCategory => {
    if (!id || !DocumentCategoryOrder[+id]) {
        return DocumentCategoryOrder[0];
    }
    return DocumentCategoryOrder[+id]
};

export const shouldRenderNewDocument = (
    oldDocument: UploadedDocument,
    newDocument: UploadedDocument
): boolean => {
    return !oldDocument.url && !!newDocument.url;
};
