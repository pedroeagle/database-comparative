import fs from 'fs-extra';

export default async (req, res) => {
  const { query: { id } } = req;
  const filename = `reports/${id}.csv`
  await fs.ensureFile(filename);
  const files = fs.readdirSync(`reports/`).filter(name => name !== `${id}.csv`).filter(name => name.indexOf(id) === 0)
  files.forEach(name => {
    const content = fs.readFileSync(`reports/${name}`);
    fs.appendFileSync(filename, content);
    fs.unlinkSync(`reports/${name}`);
  })
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition',
    `attachment; filename=${id}_${new Date().getTime()}_report.csv`);
  const complete = fs.readFileSync(filename);
  res.send(complete);
};
