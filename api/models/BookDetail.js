/**
 * BookDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    author: {
      type: 'String',
      required: true
    },
    description : {
      type: 'String',
      required: true
    }
  },

};

