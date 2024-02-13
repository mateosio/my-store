const express = require('express');
const passport = require('passport');
const AuthService = require("../services/auth.service");
const {loginAuthSchema, recoveryAuthSchema} = require("../schemas/auth.schema");
const validatorHandler = require("../middlewares/validatorHandler");

const service = new AuthService();

const router = express.Router();


router.post('/login',
  validatorHandler(loginAuthSchema, "body"),
  passport.authenticate("local", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json( await service.signToken(user));
    } catch (error) {
      next(error);
    }
});


router.post('/recovery',
  validatorHandler(recoveryAuthSchema, "body"),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email)
      res.json(rta)
    } catch (error) {
      next(error);
    }
});

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, mewPassword } = req.body;
      const rta = await service.changePassword(token, mewPassword)
      res.json(rta)
    } catch (error) {
      next(error);
    }
});


module.exports = router;
