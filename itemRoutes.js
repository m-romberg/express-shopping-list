"use strict";

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { BadRequestError, NotFoundError } = require("./expressError");

/** GET /items/:
 *
 * returns { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 },
  ...
]}
*/
router.get('/', function (req, res) {
  return res.json(db);
});

/** POST /items/:
 *
 * returns { added:{ name: "popsicle", price: 1.45 } }
*/
router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const item = req.body;
  db.items.push(item);
  return res.json({ added: item });
});


/** GET /items/:name: returns item {item} or 404. */

router.get("/:name", function (req, res, next) {
  const item = db.items.find(item => item.name === req.params.name);
  if (!item){
    throw new NotFoundError();
  }
  return res.json(item);
});






module.exports = router;

