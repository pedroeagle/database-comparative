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

export const LatestProducts = ({ data: { response, time: { mongo, postgres } }, ...props }) => (
  <Comparative
    mongo={mongo}
    postgres={postgres}
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
            <ListItemText
              primary={`${employee.first_name} ${employee.last_name}`}
              secondary={`Hired at ${employee.hire_date}`}
            />
            <h4>Salaries</h4>
            <div>
            {employee.salaries.map(salary=>(
              <p>{salary.salary}<br/></p>
            ))}
            </div>
            <h4>Titles</h4>
            <div>
            {employee.titles.map(title=>(
              <p>{title.title}<br/></p>
            ))}
            </div>
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
);
