CREATE USER 'axel'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'axel'@'%' WITH GRANT OPTION;

