import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { Comparative } from '../comparative';
import { useState } from 'react';
import axios from '../../config/axios';

export const Titles = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(-1)

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres']) {
      const { data: { response, time: t }} = await axios.get(`http://localhost:3000/api/${db}/titles/count`)
      if (db === 'postgres') setResponse(response)
      setTime((time) => ({ ...time, [db]: t }))
    }
    setLoading(false)
  }
  return (
    <Comparative loading={loading}
      time={time}
      fetch={fetchData}
    child={<Card
      sx={{ height: '100%' }}
      {...props}
    >
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
              TITLES
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
                backgroundColor: 'warning.main',
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box sx={{pt: 3}}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box> */}
      </CardContent>
    </Card>} />
)};
