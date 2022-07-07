const express = require("express");
const { verify,verifyAdmin } = require("../Auth_congig");
const { disconnectDB, connectDB, dbOperationError, dbConnectionError } = require("../config/config");
const { corsOriginFilter, cors } = require("../config/corsconfiguration");
const ROUTE_PROMO = express.Router();
const { PromoModel } = require("../models/promotion");

ROUTE_PROMO.route("/")
    .all(
        (req, res, next) => {
            res.setHeader("content-type", "application/json")
            if (req.method == "PUT" || req.method == "DELETE") {
                res.statusCode = 404;
                return res.json({ error: true, message: `Operation ${req.method} require an id` })
            }
            res.statusCode = 200;
            next()
        }
    )
    .post(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
            connectDB().then(() => {
                PromoModel.create(req.body).then(() => {
                    disconnectDB()
                    res.statusCode = 201;
                    res.json({ error: false, message: "Promotion added successfuly", data: true })
                }).catch((err) => dbOperationError(err, res))
            }).catch((err) => dbConnectionError(err, res))
        }
    )
    .get(cors,verify,
        (_, res) => {
            connectDB().then(() => {
                PromoModel.find({}).then((data) => {
                    disconnectDB()
                    res.statusCode = 200;
                    res.json({ error: false, message: "All doument", data })
                }).catch((err) => dbOperationError(err, res))
            }).catch((err) => dbConnectionError(err, res))
        }
    );

//DANGER SEC1
ROUTE_PROMO.route("/:promoId")
    .all(
        (_, res, next) => {
            res.setHeader("content-type", "application/json")
            res.statusCode = 200;
            next()
        }
    )
    .put(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
            connectDB().then(() => {
                const promoId = req.params.promoId;
                PromoModel.findByIdAndUpdate(promoId, req.body, { new: true }).then((data) => {
                    disconnectDB()
                    res.statusCode = 201;
                    res.json({ error: false, message: `Document ${promoId} updated successfuly`, data })
                }).catch((err) => dbOperationError(err, res))

            }).catch((err) => dbConnectionError(err, res))
        }
    )
    .delete(corsOriginFilter,verify,verifyAdmin,
        (req, res) => {
            connectDB().then(() => {
                const promoId = req.params.promoId;
                PromoModel.findByIdAndDelete(promoId).then(() => {
                    disconnectDB()
                    res.statusCode = 200;
                    res.json({ error: false, message: `Document ${promoId} deleted success` })
                }).catch((err) => dbOperationError(err, res))
            }).catch((err) => dbConnectionError(err, res))
        }
    );

module.exports = {
    route_name_promo: {
        name: "/promotion"
    },
    route_promo: ROUTE_PROMO
}
