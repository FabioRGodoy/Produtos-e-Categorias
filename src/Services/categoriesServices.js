import database from "../database";

export const newCategoryService = async (dataCategory) => {
  const queryResponse = await database.query(
    `
      INSERT INTO categories
        (name)
      VALUES
        ($1)
          RETURNING*;
      `,
    [dataCategory.name]
  );
  return [201, queryResponse.rows[0]];
};

export const getOnlyOneCategoryService = async (categoryId) => {
  try {
    const queryResponse = await database
      .query(
        `
    SELECT * FROM categories WHERE id = $1;
    `,
        [categoryId]
      )
      .then((res) => res.rows[0]);
    return [200, queryResponse];
  } catch (error) {
    return [400, { message: error.errors }];
  }
};

export const patchcategoryService = async (dataCategory, id) => {
  try {
    const queryResponse = await database
      .query(
        `
      UPDATE
        categories 
      SET 
        name = $1
      WHERE
        id = $2
        RETURNING *;
      `,
        [dataCategory.name, id]
      )
      .then((res) => res.rows[0]);

    return [200, queryResponse];
  } catch (error) {
    return [400, { message: error.errors }];
  }
};

export const deleteCategoryService = async (categoryId) => {
  const queryResponse = await database
    .query(
      `
    DELETE FROM
      categories
    WHERE
      id = $1
      RETURNING *;
    `,
      [categoryId]
    )
    .then((res) => res.rows);

  return [204, queryResponse];
};
