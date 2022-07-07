import express from "express";
import bodyParser from "body-parser";

const DISH_ROUTE = express.Router();

DISH_ROUTE.use(bodyParser.json());

DISH_ROUTE.route("/")
  .all((req, res, next) => {
    if (req.method == "PUT" || req.method == "DELETE") {
      res.statusCode = 401;
      res.end("Not allowed, you most specify the dish id");
      return;
    }
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .post((req, res) => {
    res.statusCode = 201;
    res.end(
      "This method will post an new row from the table Dishes in the database"
    );
  })
  .get((req, res, next) => {
    res.statusCode = 200;
    res.end("Return all row from the table Dishes");
  });

DISH_ROUTE.route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .put((req, res) => {
    let params: any = req.params;
    if (!params.dishId) {
      res.statusCode = 401;
      res.end("Not allowed, you most specify the dish id");
    } else {
      res.statusCode = 200;
      res.end(`Dish ${params.dishId} was updated successfully by the leader X`);
    }
  })
  .delete((req, res) => {
    let params: any = req.params;
    if (!params.dishId) {
      res.statusCode = 401;
      res.end("Not allowed, you most specify the dish id");
    } else {
      res.statusCode = 200;
      res.end(`Dish ${params.dishId} was deleted successfully by the leader X`);
    }
  });

export default {
  route_names_dish: {
    name: "/dishes",
  },

  route_dish: DISH_ROUTE,
};
