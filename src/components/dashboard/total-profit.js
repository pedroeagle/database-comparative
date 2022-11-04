import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Titles = ({ data: { count: { response, time: { mongo, postgres } } }, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{justifyContent: 'space-between'}}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TITLES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
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
  </Card>
);
