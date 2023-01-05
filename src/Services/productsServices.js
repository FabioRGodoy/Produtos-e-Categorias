import database from "../database";
import { createProductSchema } from "../Serializers/productsSchemas";

export const newProductService = async (dataProduct) => {
  const queryResponse = await database.query(
    `
      INSERT INTO products
          (name, price, category_id)
      VALUES
          ($1, $2, $3)
      RETURNING*;
      `,
    [dataProduct.name, dataProduct.price, dataProduct.category_id]
  );

  return [201, queryResponse.rows[0]];
};

export const getOnlyOneProductService = async (productId) => {
  const queryResponse = await database
    .query(
      `
    SELECT * FROM products WHERE id = $1;
      `,
      [productId]
    )
    .then((res) => res.rows[0]);
  return [200, queryResponse];
};

export const patchProductsService = async (dataProduct, id) => {
  delete dataProduct.category_id;
  delete dataProduct.id;

  let query = "UPDATE products SET ";
  const keys = Object.keys(dataProduct);
  const values = Object.values(dataProduct);

  keys.forEach((key, index) => {
    query += `${key} = \$${(index += 1)}, `;
  });

  query = query.slice(0, -2);

  query += ` WHERE id = \$${(keys.length += 1)} RETURNING *;`;

  const queryResponse = await database
    .query(query, [...values, id])
    .then((res) => res.rows[0]);

  return [200, queryResponse];
};

export const deleteProductsService = async (productId) => {
  const queryResponse = await database
    .query(
      `
    DELETE FROM
      products
    WHERE
      id = $1
      RETURNING *;
    `,
      [productId]
    )
    .then((res) => res.rows);

  return [204, queryResponse];
};

export const getproductByCategoryService = async (categoryId) => {
  const queryResponse = await database
    .query(
      `
    SELECT
      *, categories.name category
    FROM 
      categories
    JOIN 
      products
      ON categories.id = products.category_id
    WHERE
      products.category_id = $1;
    `,
      [categoryId]
    )
    .then((res) => res.rows);

  return [200, queryResponse];
};
