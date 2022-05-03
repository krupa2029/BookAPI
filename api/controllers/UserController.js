/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require("joi");
const JWTService = require("../services/JWTService");
const UtilService = require("../services/UtilService");



module.exports = {

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
   try{
     const schema = Joi.object().keys({
       email : Joi.string().required().email(),
       password: Joi.string().required()
     });

     const {email, password} = await schema.validate(req.allParams()).value;
     const encryptedPassword = await UtilService.hashPassword(password);

     const createdUser =  await sails.models.user.create({
      email: email, password:encryptedPassword
    }).fetch();
     return res.ok(createdUser);
   }
   catch(err){
     if(err.name == 'ValidationError'){
       return res.badRequest({err});
     }
     return res.serverError(err);
   }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try{
      const schema = Joi.object().keys({
        email : Joi.string().required().email(),
        password: Joi.string().required()
      });
 
      const {email, password} = await schema.validate(req.allParams()).value;
      const user = await sails.models.user.findOne({email});
      if(!user){
        return res.notFound({err:'User does not exist'})
      }
      const matchedPassword = await UtilService.comparePassword(password, user.password);
      if(!matchedPassword){
        return res.badRequest({err: "unauthorized!"});
      }
      const token = JWTService.issuer({user: user.id},'1 day');
     return res.ok({token});
    }
    catch(err){
      if(err.name == 'ValidationError'){
        return res.badRequest({err});
      }
      return res.serverError(err);
    }
  }

};

