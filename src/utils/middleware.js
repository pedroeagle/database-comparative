import {use} from 'next-api-middleware';

const getTiming = async (req, res, next) => {
  const {query: {db}} = req;
  const start = new Date().getTime();
  await next();
  const end = new Date().getTime();
  const time = end - start;
  console.log({[db]: time});
  await storeResponseTime(req, {start, end, time});
  res.status(200).json({response: res.response, time});
};

const storeResponseTime = async (req, {start, end, time}) => {
  const {query: {id, db}, url} = req;
  console.log({id});
  const path = url.replace(`/api/${db}`, '').match(/[^?]+/)[0];
};

export const switchHandlers = async (req, res, mongo, postgres) => {
  const {query: {db}} = req;
  switch (db) {
    case 'mongo':
      return mongo(req, res);
    case 'postgres':
      return postgres(req, res);
  }
};

export default (handler) => use(getTiming)(handler);
