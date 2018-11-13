module.exports = {
    PORT : process.env.PORT || 5000,
    db:{
        host:process.env.DATABASE_HOST || '127.0.0.1',
        database:'farmacia',
        user:'axel',
        password:'admin',
        port:3306
    }
}