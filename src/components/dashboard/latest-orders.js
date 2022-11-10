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
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { Comparative } from '../comparative';

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

export const LatestOrders = ({ data: { response, time: { mongo, postgres } }, ...props }) => (
  <Comparative
    mongo={mongo}
    postgres={postgres}
    child={<Card {...props}>
      <CardHeader title="Latest Promotions to Manager" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 600 }}>
          <Table>
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
            </TableHead>
            <TableBody>
              {response.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.employee.first_name} {order.employee.last_name}
                  </TableCell>
                  <TableCell>
                    {order.department.dept_name}
                  </TableCell>
                  <TableCell>
                    {order.from_date}
                  </TableCell>
                  <TableCell>
                    {order.employee.dept_emps.find(dept_emp => dept_emp.dept_no === order.department.dept_no).from_date}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={order.employee.gender==='F'?'pink':'blue'}
                    >
                      {order.employee.gender==='F'?'Female':'Male  '}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
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
      </Box>
    </Card>} />
);
