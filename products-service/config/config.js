module.exports={
   port: process.env.PORT || 5002,
   db:{
        host:process.env.DATABASE_HOST || '127.0.0.1',
        database:'farmacia',
        user:'axel',
        password:'admin',
        port:3306
    },
    cloudStorage:{
        cloudName:'YOUR_CLOUD_NAME',
        API_KEY:'YOUR_API_KEY',
        API_SECRET:'YOUR_API_SECRET'
    }
}
