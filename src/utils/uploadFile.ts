import multer from 'multer';
import path from 'path';
import * as fs from 'node:fs';

const replaceFile = (filenamePattern: string, dirName: string) => {
    try {
        const files = fs.readdirSync(dirName);
        for (const file of files) {
            if (file.startsWith(filenamePattern)) {
                fs.unlinkSync(path.join(dirName, file));
                console.log(`File replaced: ${file}`);
            }
        }
    } catch (error:any) {
        console.error(`Error replacing file: ${error.message}`);
    }
};

export const uploadFile = (filePattern: string, imgPath: string) => {
    return multer({
        limits: {
            fileSize: 10 * 1024 * 1024, // 10 MB
        },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                replaceFile(filePattern, imgPath); // Pindahkan replaceFile ke sini
                cb(null, imgPath);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName = `${filePattern}-${Date.now()}${ext}`;
                cb(null, uniqueName);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedFileTypes = ['png', 'jpeg', 'jpg'];
            if (allowedFileTypes.includes(file.mimetype.split('/')[1])) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type. Only PNG, JPEG, and JPG are allowed.'));
            }
        },
    });
};
