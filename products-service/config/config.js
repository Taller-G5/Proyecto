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
        cloudName:'axel123',
        API_KEY:'367482552436946',
        API_SECRET:'f6AOPFYkNcMXBqvsoohPgCMMpgE'
    }
}
