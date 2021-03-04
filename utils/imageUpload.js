import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  limits: { fieldSize: 25 * 1024 * 1024 },
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "--" + file.originalname);
  },
});

export const upload = multer({ storage: fileStorageEngine });
