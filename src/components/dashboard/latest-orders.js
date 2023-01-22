import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { Comparative } from '../comparative';
import React, { useState } from 'react';
import axios from '../../config/axios';
import { config } from 'dotenv'
config()

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova',
    },
    createdAt: 1555016400000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu',
    },
    createdAt: 1555016400000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson',
    },
    createdAt: 1554930000000,
    status: 'refunded',
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer',
    },
    createdAt: 1554757200000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert',
    },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov',
    },
    createdAt: 1554670800000,
    status: 'delivered',
  },
];

export const LatestPromotedEmployees = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState([])

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres', 'mongo_indexed']) {
      const { data: { response, time: t } } = await axios.get(`/api/${db}/last/promotions`)
      if (db === 'postgres') setResponse(response)
      setTime((time) => ({ ...time, [db]: t }))
    }
    setLoading(false)
  }
  return (
    <Comparative loading={loading}
      time={time}
      fetch={fetchData}
      child={<Card {...props}>
        <CardHeader title="Latest Promotions to Manager" />
        <Box>
          <TableContainer>
            <Table sx={{ width: '100%', minWidth: '700px' }}>
              {response.length > 0 &&
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Employee
                    </TableCell>
                    <TableCell>
                      Department
                    </TableCell>
                    <TableCell>
                      Promotion
                    </TableCell>
                    <TableCell>
                      Since
                    </TableCell>
                    <TableCell>
                      Sex
                    </TableCell>
                  </TableRow>
                </TableHead>}
              <TableBody>
                {response.map((order) => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell style={{ fontSize: '15px', paddingTop: 37.5 }}>
                      {order.employee.first_name} {order.employee.last_name}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px', paddingTop: 37.5 }}>
                      {order.department.dept_name}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px', paddingTop: 37.5 }}>
                      {order.from_date}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px', paddingTop: 37.5 }}>
                      {order.employee?.dept_emps.find(dept_emp => dept_emp.dept_no === order.department.dept_no).from_date}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px', paddingTop: 37.5 }}>
                      <SeverityPill
                        color={order.employee.gender === 'F' ? 'pink' : 'blue'}
                      >
                        {order.employee.gender === 'F' ? 'Female' : 'Male  '}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box> */}
      </Card>} />
  )
};
