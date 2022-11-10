import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Comparative } from '../comparative';

export const Salaries = ({ data: { count: { response, time: { mongo, postgres } } }, ...props }) => (
  <Comparative
    mongo={mongo}
    postgres={postgres}
    child={<Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              SALARIES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {response}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>} />
);
