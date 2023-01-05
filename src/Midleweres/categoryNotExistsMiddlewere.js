import database from "../database";
import { AppError } from "../errors/errors";

export const categoryNotExistMiddleware = async (req, res, next) => {
  try {
    const queryResponse = await database.query(
      `
          SELECT * FROM categories WHERE categories.id = $1;
      `,
      [req.params.id]
    );

    const category = queryResponse.rows;

    if (category.length === 0) {
      throw new AppError("Category not found", 404);
    }
  } catch (error) {
    throw new AppError("Category not found", 404);
  }
  next();
};
