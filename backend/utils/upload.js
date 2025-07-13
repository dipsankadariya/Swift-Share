import multer from "multer";

const upload = multer({
  dest: 'uploads',
  limits: {
    fileSize: 100 * 1024 * 1024 
  }
});

export default upload;
