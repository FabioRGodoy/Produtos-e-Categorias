import database from "../database";
import {
  deleteProductsService,
  getOnlyOneProductService,
  getproductByCategoryService,
  newProductService,
  patchProductsService,
} from "../Services/productsServices";

export const newProductController = async (req, res) => {
  const [status, product] = await newProductService(req.validatedBody);

  return res.status(status).json(product);
};

export const getAllProductsontroller = async (req, res) => {
  const queryResponse = await database
    .query(`SELECT * FROM products`)
    .then((res) => res.rows);

  return res.json(queryResponse);
};

export const getOnlyOneProductsController = async (req, res) => {
  const id = req.params.id;
  const [status, category] = await getOnlyOneProductService(id);

  return res.status(status).json(category);
};

export const patchProductController = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  const [status, category] = await patchProductsService(data, id);

  return res.status(status).json(category);
};

export const deleteProductsController = async (req, res) => {
  const id = req.params.id;

  const [status, category] = await deleteProductsService(id);

  return res.status(status).json(category);
};

export const getProductsByCategoryController = async (req, res) => {
  const id = req.params.id;
  const [status, product] = await getproductByCategoryService(id);

  return res.status(status).json(product);
};
