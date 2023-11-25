const express = require("express");
const ProductsServices = require("../services/product.service");
const validatorHandler = require("../middlewares/validatorHandler");
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema} = require("../schemas/product.schemas");

const router = express.Router();

const service = new ProductsServices();

router.get("/",
  validatorHandler(queryProductSchema, "query"),
  async(req, res, next)=>{
    try{
      const products = await service.find(req.query);
      res.json(products);
    } catch(error){
      next(error)
      }

})

// router.get("/filtro", (req, res) =>{

//   res.send("siempre el parametro fijo va antes que el dinámico")
// });

router.get("/:id",
validatorHandler(getProductSchema, "params"),
async(req, res, next) =>{
 try {
  const {id} = req.params;
  const product = await service.findOne(id);
  res.json(product);
 } catch (error) {
  next(error)
 }
});

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async(req, res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});


router.patch("/:id",
validatorHandler(getProductSchema, "params"),
validatorHandler(updateProductSchema, "body"),
async (req, res, next)=>{
try {
  const {id} = req.params;
  const body = req.body;
  const update = await service.update(id, body);

  res.json(update)
} catch (error) {
  next(error)
}
});


router.delete("/:id", async (req, res) =>{
  const {id} = req.params;
  const rta = await service.delete(id)
  res.json(rta)

});

module.exports = router;
