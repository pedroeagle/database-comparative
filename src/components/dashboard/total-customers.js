import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { Comparative } from '../comparative';
import { useState } from 'react';
import axios from '../../config/axios';

export const Employees = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(-1)

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres']) {
      const { data: { response, time: t }} = await axios.get(`http://localhost:3000/api/${db}/employees/count`)
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
                EMPLOYEES
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
                  backgroundColor: 'success.main',
                  height: 56,
                  width: 56,
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pt: 2,
            }}
          >
            {/* <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1,
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
          </Box>
        </CardContent>
      </Card>} />
  )
};
