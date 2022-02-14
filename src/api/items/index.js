// require the express module
import _ from 'lodash'
import { Router } from 'express';
import Items from './model.js'

const router = new Router();

router.get("/", async function (request, response) {
  return response.json(await Items.find());
});

router.get("/:id", async function (request, response) {
  const element = await Items.findOne({ _id: request.params.id });
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", async function (request, response) {
  return response.json(await Items.create(request.body));
});

router.put("/:id", async function (request, response) {
  const element = await Items.findOne({ _id: request.params.id });
  if (element) {
    element.set(request.body)
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", async function (request, response) {
  const result = await Items.deleteOne({ _id: request.params.id });
  return result.deletedCount > 0 ? response.sendStatus(204) : response.sendStatus(404);
});

export default router;