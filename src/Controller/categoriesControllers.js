import database from "../database";
import {
  deleteCategoryService,
  getOnlyOneCategoryService,
  newCategoryService,
  patchcategoryService,
} from "../Services/categoriesServices";

export const getAllCategoriesController = async (req, res) => {
  const queryResponse = await database
    .query("SELECT * FROM CATEGORIES;")
    .then((res) => res.rows);

  return res.json(queryResponse);
};

export const newCategoryController = async (req, res) => {
  const [status, category] = await newCategoryService(req.validatedBody);

  return res.status(status).json(category);
};

export const getOnlyOneCategoryController = async (req, res) => {
  const id = req.params.id;
  const [status, category] = await getOnlyOneCategoryService(id);

  return res.status(status).json(category);
};

export const patchCategoryController = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  const [status, category] = await patchcategoryService(data, id);

  return res.status(status).json(category);
};

export const deleteCategoryController = async (req, res) => {
  const id = req.params.id;

  const [status, category] = await deleteCategoryService(id);

  return res.status(status).json(category);
};
