import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

export default {
  upload(folder: string) {
    const storage = multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    });

    return multer({ storage }); // Retorna a instância do multer configurada
  },
};
