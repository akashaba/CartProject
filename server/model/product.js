let db = [];
let counter = 0;
class Product {
    constructor(id, name, price, image, stock,) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    save(){
        this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(prod => prod.name == this.name);
        db.splice(index, 1, this);
        return this;
    }
  
   
    editStock(name, newStock){
        const index = db.findIndex(prod => prod.name == name);
        db[index].stock = newStock;
        return this;
    }

    

    static getAll(){
        return db;
    }

    static deleteById(prodId){
        const index = db.findIndex(prod => prod.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }
     static getProdById(id){
        const index = db.findIndex(prod => prod.id == id);
        const Prod = db[index];
        return Prod;
    }
}

let prod1 = new Product(1,'Angular', 35,'./angular.png', 5)
prod1.save();
let prod2 = new Product(2,'Node Js', 47,'./node.png', 8)
prod2.save();
let prod3 = new Product(3,'React', 23,'./React.png', 12)
prod3.save();
module.exports = Product;