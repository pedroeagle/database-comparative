import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import { Comparative } from '../comparative';
import { useState } from 'react';
import axios from '../../config/axios';
import { config } from 'dotenv'
config()

export const Departments = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(-1)

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres']) {
      const { data: { response, time: t }} = await axios.get(`/api/${db}/departments/count`)
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
                DEPARTMENTS
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
                  backgroundColor: 'error.main',
                  height: 56,
                  width: 56,
                }}
              >
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
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
