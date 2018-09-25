module.exports={
   port: process.env.PORT || 5001,
   db:{
        host:process.env.DATABASE_HOST || '127.0.0.1',
        database:'farmacia',
        user:'axel',
        password:'admin',
        port:3306
    },
    SECRET : "Pr0y3ct0F4rW4c1@"
}
