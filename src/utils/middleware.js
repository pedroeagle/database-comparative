import { use } from "next-api-middleware";

const getTiming = async (req, res, next) => {
  const { query: { db } } = req
  const start = new Date().getTime()
  await next()
  const end = new Date().getTime()
  const time = end - start
  res.status(200).json({response: res.response, time})
};

export const switchHandlers = async (req, res, mongo, postgres) => {
  const { query: { db } } = req
  switch (db) {
    case 'mongo':
      return mongo(req, res)
    case 'postgres':
      return postgres(req, res)
  }
}

export default (handler) => use(getTiming)(handler)