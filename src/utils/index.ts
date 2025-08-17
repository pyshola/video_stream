import { bunnyStorageUrl } from '../config';

export const getFileUrl = async (id:string, filename:string) => {
    return `${bunnyStorageUrl}/${id}/${filename}`;
}