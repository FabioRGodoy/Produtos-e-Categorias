import {
  deleteCategoryController,
  getAllCategoriesController,
  getOnlyOneCategoryController,
  newCategoryController,
  patchCategoryController,
} from "../Controller/categoriesControllers";
import { Router } from "express";
import {
  deleteProductsController,
  getAllProductsontroller,
  getOnlyOneProductsController,
  getProductsByCategoryController,
  newProductController,
  patchProductController,
} from "../Controller/productsControllers";
import { dataIsValidMiddlewere } from "../Midleweres/dataisValidMiddlewere";
import { createCategorySchema } from "../Serializers/categoriesSchemas";
import { createProductSchema } from "../Serializers/productsSchemas";
import { categoryNotExistMiddleware } from "../Midleweres/categoryNotExistsMiddlewere";
import { productNotExistMiddleware } from "../Midleweres/productNotExistMiddlewere";
import { categoryAlreadyExistsMiddlewere } from "../Midleweres/categoryAlreadyExistsMiddlewere";

export const routes = Router();

routes.get("/categories", getAllCategoriesController);

routes.post(
  "/categories",
  dataIsValidMiddlewere(createCategorySchema),
  categoryAlreadyExistsMiddlewere,
  newCategoryController
);

routes.get(
  "/categories/:id",
  categoryNotExistMiddleware,
  getOnlyOneCategoryController
);

routes.patch(
  "/categories/:id",
  categoryNotExistMiddleware,
  patchCategoryController
);

routes.delete(
  "/categories/:id",
  categoryNotExistMiddleware,
  deleteCategoryController
);

routes.post(
  "/products",
  dataIsValidMiddlewere(createProductSchema),
  newProductController
);

routes.get("/products", getAllProductsontroller);

routes.get(
  "/products/:id",
  productNotExistMiddleware,
  getOnlyOneProductsController
);

routes.patch(
  "/products/:id",
  productNotExistMiddleware,
  patchProductController
);

routes.delete(
  "/products/:id",
  productNotExistMiddleware,
  deleteProductsController
);

routes.get("/products/category/:id", getProductsByCategoryController);
