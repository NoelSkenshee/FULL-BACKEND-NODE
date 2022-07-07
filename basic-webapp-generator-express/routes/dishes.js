const express = require("express");
const { DishModel } = require("../models/Dishe");
const ROUTE_DISHES = express.Router();
const ROUTE_DISHES_COMENT = express.Router();
const { disconnectDB, connectDB, dbOperationError, dbConnectionError } = require("../config/config");
const { verify,verifyAdmin } = require("../Auth_congig");
const { corsOriginFilter, cors } = require("../config/corsconfiguration");

ROUTE_DISHES.route("/")
  .all((req, res, next) => {
      res.setHeader("content-type", "application/json")
      if (req.method == "PUT" || req.method == "DELETE") {
        res.statusCode = 404;
        return res.json({ error: true, message: "You most specify the id", data: null })
      }
      next();
    }
  )
  .post(cors,verify, (req, res) => {
      connectDB().then(() => {
        DishModel.create(req.body).then(() => {
          disconnectDB();
          res.statusCode = 201;
          res.json({ error: false, message: "Dishe added successfuly", data: null })
        }).catch((err) => dbOperationError(err, res));
      }).catch((err) => dbConnectionError(err, res))

    }
  )
  .get(cors,verify,
    (_, res) => {
      connectDB().then(() => {
        DishModel.find({}).then((result) => {
          disconnectDB();
          res.statusCode = 200;
          res.json({ error: false, message: "", data: result })
        }).catch((err) => dbOperationError(err, res));

      }).catch((err) => dbConnectionError(err, res))


    }
  );


/***********************************************************************************************************************
 * 
 * 
 * 
 ********************************************************************************************************************/


ROUTE_DISHES.route("/:dishId")
  .put(corsOriginFilter,verify,verifyAdmin,
    (req, res) => {
      connectDB().then(() => {
        const dishId = req.params.dishId;
        DishModel.findByIdAndUpdate(dishId, { $set: { ...req.body } }).then(() => {
          disconnectDB();
          res.statusCode = 200;
          res.json({ error: false, messages: "Successfuly updated", data: null })

        }).catch((err) => dbOperationError(err, res))

      }).catch((err) => dbConnectionError(err, res))

    }
  )
  .delete(cors,verify,
    (req, res) => {
      connectDB().then(() => {
        const dishId = req.params.dishId;
        DishModel.findByIdAndRemove(dishId).then(() => {
          disconnectDB()
          res.statusCode = 200;
          res.json({ error: false, message: "Successfuly Updated" })
        }).catch((err) => dbOperationError(err, res))

      }).catch((err) => dbConnectionError(err, res))
    }
  );







/***************************************************************************************************************************
 * 
 * 
 ***********************************************************************************************************************/
ROUTE_DISHES_COMENT.route("/")
  .all((req, res, next) => {
    res.setHeader("contecnt-type", "application/json")
    res.statusCode = 200;
    next();
  })
  .delete(corsOriginFilter,verify,verifyAdmin,(req, res) => {
    res.setHeader("content-type", "application/json")
    connectDB().then(() => {
      const dishId = req.query.dishId;
      DishModel.findById(dishId).then((dish) => {
        if (!dish) {
          disconnectDB()
          res.statusCode = 404;
          return res.json({ error: true, message: `Dish with Id ${dishId} not found` })
        }
        dish.comment = [];
        dish.save().then(() => {
          disconnectDB()
          res.statusCode = 200;
          res.json({ error: false, message: "All documents removed", data: null })
        }).catch((err) => dbOperationError(err, res))
      })
    }).catch((err) => dbConnectionError(err, res))

  })
  .get(cors,verify,(req, res) => {
    connectDB().then(() => {
      const dishId = req.query.dishId;
      DishModel.findById(dishId).then((dishe) => {
        disconnectDB()
        res.statusCode = 200;
        res.json({ error: false, message: "All comments", data: dishe.comments })
      }).catch((err) => dbOperationError(err, res))
    }).catch((err) => dbConnectionError(err, res))
  })
  .post(corsOriginFilter,verify,verifyAdmin,(req, res) => {
    connectDB().then(() => {
      const dishId = req.query.dishId;
      DishModel.findById(dishId).then((dish) => {
        res.statusCode = 404;
        if (!dish) return res.json({ error: true, message: "Cant find document with id :" + dishId, data: null });
        else {
          dish.comments.push(req.body)
          dish.save();
          disconnectDB()
          res.statusCode = 200;
          res.json({ error: false, message: "Comment added successfuly", data: null })
        }
      }).catch((err) => dbOperationError(err, res))
    }).catch((err) => dbConnectionError(err, res))
  })
  .put(corsOriginFilter,verify,verifyAdmin,(req, res) => {
    connectDB().then(() => {
      const dishId = req.query.dishId;
      DishModel.findById(dishId)
        .then((doc) => {
          const commentId = req.query.commentId, comment = doc.comments.id(commentId);
          comment.rating = req.body.rating;
          comment.comment = req.body.comment;
          doc.save().then(() => {
            disconnectDB()
            res.json({ error: false, message: "Comment updated successfuly", data: null })
          })
        }).catch((err) => dbOperationError(err, res))

    }).catch((err) => dbConnectionError(err, res))


  });










/**************************************************************************************
 * 
 * ***********************************************************************************/


module.exports = {
  route_name_dich: {
    name: "/diches",
    name_coment: "/comments"
  },
  route_dich: ROUTE_DISHES,
  route_dish_comment: ROUTE_DISHES_COMENT
}


