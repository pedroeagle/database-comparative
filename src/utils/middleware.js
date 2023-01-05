import { use } from 'next-api-middleware';
import { v4 as uuid } from 'uuid';
const fs = require('fs-extra');
const converter = require('json-2-csv');
const parse = require('csvtojson/v2');

const getTiming = async (req, res, next) => {
  const { query: { db } } = req;
  const start = new Date().getTime();
  await next();
  const end = new Date().getTime();
  const time = end - start;
  console.log({ [db]: time });
  await storeResponseTime(req, { start, end, time });
  res.status(200).json({ response: res.response, time });
};

const storeResponseTime = async (req, { start, end, time }) => {
  const { query: { id, db, ...query }, url } = req;
  const random = uuid()
  const filename = `reports/${id}-${random}.csv`
  await fs.ensureFile(filename);

  const path = url.replace(`/api/${db}`, '').match(/[^?]+/)[0];

  converter.json2csv([{ start, end, time, db, path, ...query }], (_, res) => {
    fs.writeFileSync(filename, res + '\n');
  }, { prependHeader: false });
};

export const switchHandlers = async (req, res, mongo, postgres) => {
  const { query: { db } } = req;
  switch (db) {
    case 'mongo':
      return mongo(req, res);
    case 'postgres':
      return postgres(req, res);
  }
};

export default (handler) => use(getTiming)(handler);
