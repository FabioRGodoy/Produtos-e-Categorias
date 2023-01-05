import database from "../database";
import { AppError } from "../errors/errors";

export const productNotExistMiddleware = async (req, res, next) => {
  try {
    const queryResponse = await database.query(
      `
        SELECT * FROM products WHERE products.id = $1;
    `,
      [req.params.id]
    );

    const products = queryResponse.rows;

    if (products.length === 0) {
      throw new AppError("Product not found", 404);
    }
  } catch (error) {
    throw new AppError("Product not found", 404);
  }
  next();
};
