const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connect_DB = require('./mongodb/db.js');
const userRoutes = require('./routes/User.routes.js')
const message = require('./routes/Message.routes.js')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination directory for uploaded files
const {server,app,io} = require('./socket/socket.js')
// const path = require('path');


dotenv.config(); // Load environment variables from.env file

const PORT = process.env.PORT || 3000;
// const _dirname = path.resolve();
// console.log('dirname:',_dirname);


// const app = express(); use app from socket

// app.use(upload.single('profilePicture'));

console.log('-->',process.env.cors_frontend);

connect_DB();
app.use(cors({
    credentials: true,
    // origin: `${process.env.cors_frontend}` // Replace with your frontend URL
    origin: process.env.cors_frontend // Replace with your frontend URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});



app.use('/users',userRoutes);
app.use('/users/thoughts',userRoutes);
app.use('/users/message',message);

// app.use(express.static(path.join(_dirname,"/frontend/build")));
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(_dirname,"frontend","build", "index.html"  ));
// });


server.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})