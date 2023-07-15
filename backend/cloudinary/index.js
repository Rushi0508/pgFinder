const cloudinary = import('cloudinary').v2
import {CloudinaryStorage} from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'pgFinder',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports =  {
    cloudinary,
    storage
}