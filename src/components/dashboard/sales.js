import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Comparative } from '../comparative';

export const EmployeesByYear = ({ data: { response: { 2001: currentYear, 2000: lastYear }, time: { mongo, postgres } }, ...props }) => {
  const theme = useTheme();
  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: Object.keys(currentYear).map(date => currentYear[date]),
        label: '2001',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: Object.keys(lastYear).map(date => lastYear[date]),
        label: '2000',
        maxBarThickness: 10,
      },
    ],
    labels: Object.keys(currentYear),
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
    <Comparative
      mongo={mongo}
      postgres={postgres}
      child={<Card {...props}>
        <CardHeader
          action={(
            <Button
              endIcon={<ArrowDropDownIcon fontSize="small" />}
              size="small"
            >
              25-07 to 31-07
            </Button>
          )}
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
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
          >
            Overview
          </Button>
        </Box>
      </Card>} />
  );
};
