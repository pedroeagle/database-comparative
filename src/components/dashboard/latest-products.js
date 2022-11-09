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
  width: '60%'
}));

const Titles = styled('div')(({ theme }) => ({
  display: 'block',
  width: '48%',
  justifyItems: 'center',
}));

const Salaries = styled('div')(({ theme }) => ({
  display: 'block',
  width: '48%',
  justifyItems: 'center',
}));

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
            <TitlesAndSalaries>
              <Salaries>
                <h4>Salaries</h4>
                {employee.salaries.map(salary => (
                  // <p>${salary.salary}</p>
                  <ListItemText
                  sx={{display: 'flex', justifyContent: 'space-between'}}
                  primary={`$${salary.salary}`}
                  secondary={salary.from_date}
                />
                ))}
                
              </Salaries>
              <Titles>
                <h4>Titles</h4>
                {employee.titles.map(title => (
                  <p>{title.title}<br /></p>
                ))}
              </Titles>
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
);
