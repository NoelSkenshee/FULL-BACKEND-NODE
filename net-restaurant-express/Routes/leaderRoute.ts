import express from "express";
import bodyParser from "body-parser";

const LEADER_ROUTE = express.Router();

LEADER_ROUTE.use(bodyParser.json());

LEADER_ROUTE.route("/")
  .all((req, res, next) => {
    if (req.method == "PUT" || req.method == "DELETE") {
      res.statusCode = 401;
      res.end("Not allowed, you most specify the leader id");
      return;
    }
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .post((_, res) => {
    res.statusCode = 201;
    res.end(
      "This method will post an new row from the table Leaders in the database"
    );
  })
  .get((_, res) => {
    res.statusCode = 200;
    res.end("Return all row from the table Leaders");
  });

LEADER_ROUTE.route("/:leaderId")
  .all((_, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    next();
  })
  .put((req, res) => {
    let params: any = req.params;
    res.statusCode = 200;
    res.end(
      `Leader ${params.leaderId} was updated successfully by the admin X`
    );
  })
  .delete((req, res) => {
    let params: any = req.params;
    res.statusCode = 200;
    res.end(
      `Leader ${params.leaderId} was deleted successfully by the leader X`
    );
  });

export default {
  route_names_leader: {
    name: "/leadership",
  },

  route_leader: LEADER_ROUTE,
};
