import * as usersQueries from "../database/queries/users.js";
import * as categoriesQueries from "../database/queries/categories.js";
import * as linksQueries from "../database/queries/links.js";

export const getDashboard = (req, res) => {
  const userId = req.user.id;
  if (!req.user.id) {
    throw new Error("Un Authorized User ");
  }
  if (typeof userId != "number") {
    throw new Error("UserId Must be a Type Of Number ");
  }

  Promise.all([
    usersQueries.getUserById(userId), // User info
    categoriesQueries.getCategories(userId), // User's categories // Optional: all links
    ,
  ]).then(([user, categories]) => {
    const categoriesPromises = categories.map((category) => {
      return linksQueries
        .getLinksByCategory(category.id, userId)
        .then((links) => {
          category.links = links;
          return category;
        });
    });
    Promise.all(categoriesPromises)
      .then((categoriesWithLinks) => {
        const userData = {
          user: user,
          categories: categoriesWithLinks,
        };
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        res
          .status(500)
          .json({ error: "Server error fetching dashboard data." });
      });
  });

};
