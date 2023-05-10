const db = require('../database');

function Users (id,name,email,password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
}

Users.signup = function (name,email,password){
    return db.execute(
        'INSERT INTO users (name,email,password) VALUES (?,?, ?)',
        [name,email,password]
      );
}

Users.Signin = function (name,email,password){
    return db.execute('SELECT * FROM users WHERE email = ?', [email])
}

Users.GetUser = function(id){
    return db.execute('SELECT * from users WHERE id=?',[id])
}

module.exports = { Users }