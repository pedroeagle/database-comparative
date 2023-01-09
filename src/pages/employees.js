import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import axios from '../config/axios';

const Page = () => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres', 'mongo_indexed']) {
      const url = search.length === 0 ? `/api/${db}/employees/all?limit=${limit}&page=${page}` : `/api/${db}/employees/search?search=${search}`
      const { data: { response, time: t }, status } = await axios.get(url)
      if (db === 'postgres') setResponse(response)
      setTime((time) => ({ ...time, [db]: t }))
    }
    setLoading(false)
  }
  const fetchCount = async () => {
    const { data: { response } } = await axios.get(`/api/postgres/employees/count`)
    setCount(response)
  }
  const [response, setResponse] = useState([])
  return (
    <>
      <Head>
        <title>
          Employees | Material Kit
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
          <CustomerListToolbar response={response} setResponse={setResponse} time={time} loading={loading} search={search} setSearch={setSearch} fetchData={fetchData} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults response={response} setResponse={setResponse} fetchCount={fetchCount} fetchData={fetchData} time={time} loading={loading} count={count} limit={limit} page={page} search={search} setPage={setPage} setLimit={setLimit} />
          </Box>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
