import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Comparative } from '../comparative';
import { useState } from 'react';
import axios from '../../config/axios';
import { config } from 'dotenv'
config()

export const EmployeesByYear = (props) => {
  const [time, setTime] = useState({ mongo: 0, postgres: 0 })
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(-1)

  const fetchData = async () => {
    setLoading(true)
    for (const db of ['mongo', 'postgres', 'mongo_indexed']) {
      const { data: { response, time: t }} = await axios.get(`/api/${db}/employees/by/year`)
      if (db === 'postgres') setResponse(response)
      setTime((time) => ({ ...time, [db]: t }))
    }
    setLoading(false)
  }
  const theme = useTheme();
  const data = loading ? { datasets: [] } : {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: Object.keys(response[2001]).map(date => response[2001][date]),
        label: '2001',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: Object.keys(response[2000]).map(date => response[2000][date]),
        label: '2000',
        maxBarThickness: 10,
      },
    ],
    labels: Object.keys(response[2001]),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Comparative loading={loading}
      time={time}
      fetch={fetchData}
      child={<Card {...props}>
        <CardHeader
          // action={(
          //   <Button
          //     endIcon={<ArrowDropDownIcon fontSize="small" />}
          //     size="small"
          //   >
          //     25-07 to 31-07
          //   </Button>
          // )}
          title="Hirings on July Last Week"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative',
            }}
          >
            <Bar
              data={data}
              options={options}
            />
          </Box>
        </CardContent>
        {/* <Divider />
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
          >
            Overview
          </Button>
        </Box> */}
      </Card>} />
  );
};
