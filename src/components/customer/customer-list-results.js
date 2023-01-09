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

export const CustomerListResults = ({ setResponse, response, fetchCount, fetchData, time, loading, count, limit, page, search, setPage, setLimit, ...rest }) => {
  const [open, setOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({
    emp_no: 0,
    birth_date: '',
    first_name: '',
    last_name: '',
    gender: '',
    hire_date: '',
  })

  useEffect(() => {
    fetchCount()
    fetchData()
  }, [])

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

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

  const data = search.length > 0 ? response : response.slice(0, limit)

  return (
    <Comparative
      time={search.length === 0 ? time : { postgres: 0, mongo: 0 }}
      fetch={search.length === 0 ? fetchData : false}
      loading={loading}
      child={<Card {...rest}>
        <Card style={{ maxHeight: 1000, overflow: 'auto' }}>
          {response.length === 0 ? <Typography style={{ display: 'flex', justifyContent: 'center' }} variant='h5'>No employees were found.</Typography> :
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
                  <EditEmployeeModal employee={selectedEmployee} employeesList={response} setEmployeesList={setResponse} open={open} setOpen={setOpen} />
                  <TableBody>
                    {data.map((employee) => (
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
            </PerfectScrollbar>}
        </Card>
        {search.length === 0 && <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100, 1000, 10000]}
        />}
      </Card>} />
  );
};
