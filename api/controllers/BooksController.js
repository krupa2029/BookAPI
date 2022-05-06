/**
 * BooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Books = require("../models/Books");

module.exports = {
  async create(req, res) {
    try {
      let params = req.allParams();

      if (!params.title) {
        return res.badRequest({ err: "Book-Title is required!" });
      }
      if (!params.author) {
        return res.badRequest({ err: "Book-Author is required!" });
      }
      const bookDetail = await sails.models.bookdetail
        .create({
          author: params.author,
          description: params.description,
        })
        .fetch();
      const book = await sails.models.books
        .create({
          title: params.title,
          bookDetail: bookDetail.id,
          user: req.user,
        })
        .fetch();
      return res.ok(book);
    } catch (err) {
      return res.serverError(err);
    }
  },
  async find(req, res) {
    try {
      const result = await sails.models.books.find({user: req.user}).populate("bookDetail");
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findOne(req, res) {
    try {
      const result = await sails.models.books
        .findOne({
          id: req.params.id,
        })
        .populate("bookDetail");

        if(result.user !== req.user){
          return res.badRequest({err: "Unauthorized!"});
        }
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  },
  async update(req, res) {
    try {
      let params = req.allParams();
      let attribute = {};

      if (params.title) {
        attribute.title = params.title;
      }
      if (params.author) {
        attribute.author = params.author;
      }
      if (params.description) {
        attribute.description = params.description;
      }

      const result = await sails.models.books
        .update({ id: req.params.id }, attribute)
        .fetch();
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  },
  async delete(req, res) {
    try {
      const bookData = await sails.models.books.findOne({ id: req.params.id });
      const deleteBookDetail = await sails.models.bookdetail.destroy({
        id: bookData.bookDetail,
      });
      const deleteBook = await sails.models.books.destroy({
        id: req.params.id,
      });
      return res.ok(deleteBook);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
