const multer = require('multer');
const { v4 } = require('uuid');

const typeMap = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 300000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/images');
    },
    filename: (req, file, callback) => {
      const ext = typeMap[file.mimetype];
      callback(null, v4() + '.' + ext);
    }
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!typeMap[file.mimetype];
    const error = isValid ? null : new Error('Invalid file type');
    callback(error, isValid);
}});

module.exports = fileUpload;