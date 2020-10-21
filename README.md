# API-Upload-Multiple-Images-Using-Multer-Express-in-Node.

1. The package used to upload array of files is Multer. Multer package supports
muliple files upload to database in the form of array. 
2. The API is tested with Postman as well as with browser using index.ejs file. 
3. Server.js file is the basic file which contains all the necessary information to start
the server.
4. Users.js file is the routes file which has /upload_files route which uploads the
images in an array using upload.fields() multer utility. 
5. To posts the file to the database, multer-gridfs-storage which generates storage
engine which automatically checks the database(Mongodb) connectivity. 
6. The file uploading is restricted to 2Mb also various errors are fetched using
MulterError Class.
