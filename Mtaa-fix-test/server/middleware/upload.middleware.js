import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Storage setup: upload to cloudinary folder "mtaa-fix"
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mtaa-fix',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

const upload = multer({ storage });

export default upload;