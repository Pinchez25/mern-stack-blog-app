const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true

}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//multer config, for uploading image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
})
const upload = multer({storage: storage})
app.use(upload.single('image'));

app.use(authRoutes);
app.use(postsRoutes);

//error catcher
app.use((err, req, res, next) => {
    res.status(400).json({
        "Error": err.message
    })
})

module.exports = app;
