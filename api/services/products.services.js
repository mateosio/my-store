const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");


class ProductsServices {

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
  const limit = 100;

  for(let i = 0; i < limit; i++){
    this.products.push({
      id: i + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      isBlock: faker.datatype.boolean(),
    })
  };
}

  async create(data) {
    const producto = this.products[this.products.length - 1]

    const newProduct = {
      id: producto.id + 1,
      ...data
    }

    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return this.products;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === parseInt(id));
    if(!product){
      throw boom.notFound("product not found");
    }else if(product.isBlock){
      throw boom.conflict("product is block");
    }
    else{
      return product;
    }
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === parseInt(id));
    if(index === -1){
      throw boom.notFound("product not found")
    } else{
      this.products[index] = {
        ...this.products[index],
        ...changes
      };
      return this.products[index];
    }
  }

  delete(id){
    const index = this.products.findIndex(item => item.id === parseInt(id));
    if(index === -1){
      throw boom.notFound("product not found")
    };

    this.products.splice(index, 1)
    return {id}
  }
}

module.exports = ProductsServices;
