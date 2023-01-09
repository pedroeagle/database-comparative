import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';
import { Comparative } from '../comparative';

export const CustomerListToolbar = (props) => {
  const [loading, setLoading] = useState(true)
  const { response: employeesList, setResponse: setEmployeesList, time: employeesTime, loading: employeesLoading, search, setSearch, fetchData } = props
  const [response, setResponse] = useState([])
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [randomEmployee, setRandomEmployee] = useState({
    emp_no: 0,
    gender: '',
    birth_date: '',
    hire_date: '',
    first_name: '',
    last_name: '',
    salaries: [
      {
        salary: 0,
        from_date: '',
        to_date: '',
        emp_no: 0
      }
    ],
    titles: [
      {
        title: '',
        from_date: '',
        to_date: '',
        emp_no: 0
      }
    ]
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      await fetchData()
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  const newRandomEmployee = async () => {
    const { data } = await axios.get('/api/employee/random')
    setRandomEmployee(data)
  }

  const insertRandomEmployee = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres', 'mongo_indexed']) {
      const { data: { response, time: t } } = await axios.post(`/api/${db}/employees/new`, randomEmployee)
      if (db === 'postgres') {
        setEmployeesList([response.employee, ...employeesList])
        setResponse(response)
      }
      setTime((time) => ({ ...time, [db]: t }))
    }
    newRandomEmployee()
    setLoading(false)
  }

  useEffect(() => {
    newRandomEmployee()
  }, [])

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Employees
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ maxWidth: '49%', width: '49%' }}>
              <Comparative
                child={<TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  onChange={e => { setTime({ postgres: 0, mongo: 0 }); setSearch(e.target.value) }}
                  value={search}
                  placeholder="Search employee"
                  variant="outlined"
                />}
                fetch={search.length > 0 ? fetchData : false}
                loading={employeesLoading}
                time={search.length > 0 ? employeesTime : { mongo: 0, postgres: 0 }}
              />
            </Box>
            <Box sx={{ maxWidth: '49%', width: '49%' }}>
              <Comparative
                time={time}
                loading={loading}
                child={
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={insertRandomEmployee}
                    style={{ width: '100%', height: '55px' }}
                  >
                    Add Random Employee
                  </Button>
                } />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};
