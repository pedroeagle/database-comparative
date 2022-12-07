import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Comparative } from '../comparative';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import axios from '../../config/axios';
import { config } from 'dotenv'
config()

const products = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: subHours(Date.now(), 3),
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: subHours(Date.now(), 5),
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: subHours(Date.now(), 9),
  },
];

const TitlesAndSalaries = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: '100%'
}));

const Titles = styled('div')(({ theme }) => ({
  display: 'block',
  width: '48%',
  justifyItems: 'center',
}));

const Salaries = styled('div')(({ theme }) => ({
  display: 'block',
  width: '30%',
  justifyItems: 'center',
}));

export const LatestHirings = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState([])

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres']) {
      const { data: { response, time: t }} = await axios.get(`/api/${db}/last/hirings`)
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
        <CardHeader
          subtitle={`${products.length} in total`}
          title="Latest Hirings"
        />
        <Divider />
        <List>
          {response.map((employee, i) => (
            <ListItem
              divider={i < response.length - 1}
              key={response.emp_no}
            >
              {/* <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
            </ListItemAvatar> */}
              <TitlesAndSalaries>
                <ListItemText
                  primary={<h4>{`${employee.first_name} ${employee.last_name}`}</h4>}
                  sx={{ justifyContent: 'space-between', display: 'flex' }}
                  secondary={`Hired at ${employee.hire_date}`}
                />
                <p>Salary Updates: {employee.salaries.length - 1}</p>
                <p>Titles: {employee.titles.map(({ title }) => title).join(', ')}</p>
              </TitlesAndSalaries>
              {/* <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>} />
  )
};
