import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Departments } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { Titles } from '../components/dashboard/tasks-progress';
import { Employees } from '../components/dashboard/total-customers';
import { Salaries } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = ({ data }) => (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Departments data={data.departments} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Employees data={data.employees} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Titles data={data.titles} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Salaries sx={{ height: '100%' }} data={data.salaries} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} data={data.employeesByDepartment} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getServerSideProps() {
  //Tables counting
  const data = {}
  const models = ['employees', 'departments', 'salaries', 'titles']
  for (const model of models) {
    data[model] = {}
    data[model]['count'] = {}
    data[model]['count']['time'] = {}
    for (const db of ['mongo', 'postgres']) {
      const { response, time } = await (await fetch(`http://localhost:3000/api/${db}/${model}/count`)).json()
      data[model]['count']['response'] = response
      data[model]['count']['time'][db] = time
    }
  }

  //Employees counting by Department
  data['employeesByDepartment'] = {}
  data['employeesByDepartment']['time'] = {}
  for (const db of ['mongo', 'postgres']) {
    const { response, time } = await (await fetch(`http://localhost:3000/api/${db}/employees/by/department`)).json()
    data['employeesByDepartment']['response'] = response
    data['employeesByDepartment']['time'][db] = time
  }

  console.log(data)
  return {
    props: { data }
  };
}

export default Page;
