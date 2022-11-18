import fs from 'fs';

export default async (req, res) => {
  const {query: {id}} = req;
  const file = fs.readFileSync(`reports/${id}.csv`);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition',
      `attachment; filename=${id}_${new Date().getTime()}_report.csv`);
  res.send(file);
};
