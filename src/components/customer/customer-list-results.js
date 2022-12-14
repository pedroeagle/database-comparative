import { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { getAge } from '../../utils/get-age';
import { Comparative } from '../comparative';
import axios from '../../config/axios';
import EditEmployeeModal from '../edit-employee-modal';

export const CustomerListResults = ({ setResponse, response, ...rest }) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({
    emp_no: 0,
    birth_date: '',
    first_name: '',
    last_name: '',
    gender: '',
    hire_date: '',
  })

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres']) {
      const { data: { response, time: t } } = await axios.get(`/api/${db}/employees/all?limit=${limit}&page=${page}`)
      if (db === 'postgres') setResponse(response)
      setTime((time) => ({ ...time, [db]: t }))
    }
    setLoading(false)
  }

  const fetchCount = async () => {
    const { data: { response } } = await axios.get(`/api/postgres/employees/count`)
    setCount(response)
  }

  useEffect(() => {
    fetchCount()
    fetchData()
  }, [])

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    fetchData();
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchData();
  };

  return (
    <Comparative
      time={time}
      fetch={fetchData}
      loading={loading}
      child={<Card {...rest}>
        <Card style={{ maxHeight: 1000, overflow: 'auto' }}>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 100 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>
                      Name
                    </TableCell>
                    <TableCell align='center'>
                      Employment Period
                    </TableCell>
                    <TableCell align='center'>
                      Age
                    </TableCell>
                    <TableCell align='center'>
                      Sex
                    </TableCell>
                    <TableCell align='center'>
                      Hire Date
                    </TableCell>
                    <TableCell align='center'>
                      Birth Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <EditEmployeeModal employee={selectedEmployee} employeeList={response} setEmployeeList={setResponse} open={open} setOpen={setOpen} />
                <TableBody>
                  {response.slice(0, limit).map((employee) => (
                    <TableRow
                      hover
                      key={employee.emp_no}
                      selected={selectedCustomerIds.indexOf(employee.emp_no) !== -1}
                      onClick={() => { setSelectedEmployee(employee); setOpen(true) }}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell align='center'>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <Avatar
                            src={employee.avatarUrl}
                            sx={{ mr: 2 }}
                          >
                            {getInitials(`${employee.first_name} ${employee.last_name}`)}
                          </Avatar>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {employee.first_name} {employee.last_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align='center'>
                        {getAge(employee.hire_date)} years
                      </TableCell>
                      <TableCell align='center'>
                        {getAge(employee.birth_date)} years
                      </TableCell>
                      <TableCell align='center'>
                        {employee.gender}
                      </TableCell>
                      <TableCell align='center'>
                        {employee.hire_date}
                      </TableCell>
                      <TableCell align='center'>
                        {employee.birth_date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
        <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100, 1000, 10000, 1000000]}
        />
      </Card>} />
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
