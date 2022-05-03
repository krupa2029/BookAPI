/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /Books' : 'BooksController.create',
    'GET /Books' : 'BooksController.find',
    'GET /Books/:id' : 'BooksController.findOne',
    'DELETE /Books/:id' : 'BooksController.delete',
    'PATCH /Books/:id' : 'BooksController.update',

    'POST /user/login': 'UserController.login',
    'POST /user/signup': 'UserController.signup'
};
