const { Router } = require("express");
const { verify } = require("../Auth_congig");
const { connectDB, dbConnectionError, dbOperationError } = require("../config/config");
const { corsOriginFilter, cors } = require("../config/corsconfiguration");
const { DishModel } = require("../models/Dishe");
const { Favorite_Model } = require("../models/favorites");


const route = Router("/")
    .all("/", verify, (req, res, next) => {
        res.setHeader("Content-Type", "application/json");
        if (req.method == "POST" || req.method == "POST") {
            res.statusCode = 400;
            return res.json({ err: true, message: "Spesify the dich id" })
        }
        res.statusCode = 200;
        next()
    })
    .post("/:disheId", cors, verify, (req, res) => {
        connectDB().then(() => {
            const idish = req.params.disheId;
            DishModel.findById(idish, (err, dich) => {
                if (err) {
                    res.statiusCode = 400;
                    return res.json({ error: true, message: err, data: null })
                }
                Favorite_Model.findOne({ user: req.user._id },null, (err, favorite) => {
                    console.log();
                    if (!err) {
                        favorite.favorite_dishes.push(dich._id);
                        console.log(favorite);
                        favorite.save((err_, favoriteRes) => {
                            console.log(favoriteRes);
                            if (err_) {
                                res.statiusCode = 400;
                                return res.json({ error: true, message: err, data: null })
                            }
                            res.statusCode = 201;
                            return res.json({ error: false, message: `Favorite dish ${favorite._id} aded successfuly`, data: null })

                        })
                    } else {
                       let newFavorites=new Favorite_Model({});
                       newFavorites.user=req.user._id;
                       newFavorites.favorite_dishes=req.dich._id;
                       favonewFavoritesrite.save((err_, favoriteRes) => {
                        console.log(favoriteRes);
                        if (err_) {
                            res.statiusCode = 400;
                            return res.json({ error: true, message: err, data: null })
                        }
                        res.statusCode = 201;
                        return res.json({ error: false, message: `Favorite dish ${favorite._id} aded successfuly`, data: null })

                    })
                     }
                })
            })
        }).catch((err) => dbConnectionError(err, res))

    })
    .delete("/:dishId", cors, verify, (req, res,) => {
        connectDB().then(() => {
            Favorite_Model.findOne({user:req.user._id}, (err, favorite) => {
                const dish_id = req.params.dishId;
                favorite.favorite_dishes = favorite.favorite_dishes.filter(id => id != dish_id);
                favorite.save((err, favoriteRes) => {
                    if (err) {
                        res.statiusCode = 400;
                        return res.json({ error: true, message: err, data: null })
                    }
                    res.statusCode = 200;
                    return res.json({ error: false, message: `Favorite dish ${favoriteRes._id} deleted successfuly`, data: null })
                })
            })

        }).catch((err) => dbConnectionError(err, res))
    })
    .delete("/", (req, res) => {
        connectDB().then(() => {
            Favorite_Model.findOne({user:req.user._id}, (err, favorite) => {
                favorite.favorite_dishes = [];
                favorite.save((err, favoriteRes) => {
                    if (err) {
                        res.statiusCode = 400;
                        return res.json({ error: true, message: err, data: null })
                    }
                    res.statusCode = 200;
                    return res.json({ error: false, message: `All favorites was deleted successfuly`, data: null })
                })
            })
        }).catch((err) => dbConnectionError(err, res))
    })
    .get("/", verify, (req, res) => {
        connectDB().then(() => {
            Favorite_Model.findOne({user:req.user._id})
               .populate("favorite_dishes")
               .populate("user")
                .then((favorites) => {
                    res.statiusCode = 200;
                    res.json({ error: false, message: "", data: favorites })
                }).catch((err) =>{
                    console.log(err);
                     dbOperationError(err, res)
                    })
        }).catch((err) => dbConnectionError(err, res))
    });

module.exports.route_favorites = route;