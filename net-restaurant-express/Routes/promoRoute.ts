import express from "express";
import bodyParser from "body-parser";

const PROMOTION_ROUTE = express.Router();

PROMOTION_ROUTE.use(bodyParser.json());

PROMOTION_ROUTE.route("/")
  .all((req, res, next) => {
    if (req.method == "PUT" || req.method == "DELETE") {
      res.statusCode = 401;
      res.end("Not allowed, you most specify the promotion id");
      return;
    }
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .post((_, res) => {
    res.statusCode = 201;
    res.end(
      "This method will post an new row from the table Promotions in the database"
    );
  })
  .get((_, res) => {
    res.statusCode = 200;
    res.end("Return all row from the table Promotions");
  });

PROMOTION_ROUTE.route("/:promotionId")
  .all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .put((req, res) => {
    let params: any = req.params;
    res.statusCode = 200;
    res.end(
      `Promotion ${params.promotionId} was updated successfully by the leader X`
    );
  })
  .delete((req, res) => {
    let params: any = req.params;
    res.statusCode = 200;
    res.end(
      `Promotion ${params.promotionId} was deleted successfully by the leader X`
    );
  });

export default {
  route_names_promo: {
    name: "/promotion",
  },

  route_promo: PROMOTION_ROUTE,
};
