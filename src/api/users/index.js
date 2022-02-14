// require the express module
import _ from 'lodash'
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, function (request, response) {
  return response.json(_.map(db.users.list(), (user) => _.omit(user, 'password')));
});

router.get("/:id", function (request, response) {
  const element = db.users.get(request.params.id)
  return element ? response.json(_.omit(element, 'password')) : response.sendStatus(404);
});

router.post("/", function (request, response) {
  db.users.insert(request.body);
  return response.sendStatus(201);
});

router.put("/:id", function (request, response) {
  db.users.update(request.params.id, request.body);
  const element = _.find(db.users.list(), (i) => i.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", function (request, response) {
  db.users.delete(request.params.id);
  return response.sendStatus(204);
});

export default router;