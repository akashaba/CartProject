let userDb = []

let counter = 0;
class User{
    username
    password
    constructor(id, username,password){
        this.username = username
        this.password = password
        this.id = id
    }
    static getAll(){
        return userDb
    }
    save(){
        this.id = ++counter; //start with 1;
        userDb.push(this);
        return this;
    }
    static find(username, password){
        return userDb.find(user => user.username === username && user.password === password)
    }
}
let user1 = new User(1,'user1','123456')
let user2 = new User(2, 'user2','123456')

userDb.push(user1)

userDb.push(user2)

module.exports = User