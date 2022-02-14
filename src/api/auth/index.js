// require the express module
import _ from 'lodash'
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'
import jwt from 'jsonwebtoken'

const router = new Router();

router.post("/login", function (request, response) {
  const decoded = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary')
  const username = decoded.split(":")[0]
  const user = _.find(db.users.list(), (u) => u.username = username)
  if (user) {
    const token = jwt.sign({
      user: { id: user.id }
    }, 'secret');
    return response.json({
      token
    })
  }
  return response.sendStatus(401)
});

export default router;