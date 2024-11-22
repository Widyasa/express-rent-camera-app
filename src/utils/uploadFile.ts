import multer from 'multer'
import path from "path";
import * as fs from "node:fs";

// Pastikan folder 'public/upload/' ada
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// Fungsi untuk mengganti file lama dengan file baru
const replaceFile = (filenamePattern:string, dirName:string) => {
    const files = fs.readdirSync(dirName); // Baca semua file di folder
    for (const file of files) {
        if (file.startsWith(filenamePattern)) {
            fs.unlinkSync(path.join(dirName, file)); // Hapus file yang cocok
            console.log(`File replaced: ${file}`);
        }
    }
};
export const uploadFile = (filePattern:string, imgPath:string, fileId:string) => {
    replaceFile(filePattern, imgPath);
    return multer({
        limits: {
            fileSize: 8024 * 8024 * 8024,
        },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                let ext = path.extname(file.originalname);
                cb(null, imgPath)
            }, filename: (req, file, cb) => {
                const ext = path.extname(file.originalname) || '';
                const uniqueName = `${fileId}-${ext}`;
                cb(null, uniqueName);
            }
        }),
        fileFilter: (req, file, cb) => {

            const allowedFileTypes = ["png", "jpeg", "jpg"];
            if (allowedFileTypes.includes(file.mimetype.split("/")[1])) {
                cb(null, true)
            } else {
                cb(null, false);
            }
        }
    })
}