import database from "../database";
import { AppError } from "../errors/errors";

export const categoryAlreadyExistsMiddlewere = async (req, res, next) => {
  const queryResponse = await database.query(
    `
        SELECT * FROM categories WHERE name ILIKE $1;
        `,
    [req.body.name]
  );

  const category = queryResponse.rows[0];

  if (category) {
    throw new AppError("Category already exists");
  }

  next();
};
