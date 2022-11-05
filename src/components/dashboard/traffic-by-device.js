import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { Comparative } from '../comparative';

export const TrafficByDevice = ({ data: { response, time: { mongo, postgres } }, ...props }) => {
  const theme = useTheme();
  const departments = Object.keys(response).map(department => response[department])
  const count = departments.reduce((prev, curr) => prev + curr, 0)
  console.log(count)
  const data = {
    datasets: [
      {
        data: departments,
        backgroundColor: ['#F44336', '#E64A19', '#C2185B', '#7B1FA2', '#689F38', '#512DA8', '#303F9F', '#1976D2', '#388E3C', ],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: Object.keys(response),
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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
    <Comparative mongo={mongo} postgres={postgres}
      child={<Card {...props}>
        <CardHeader title="Employees by Department" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: 'relative',
            }}
          >
            <Doughnut
              data={data}
              options={options}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2,
            }}
          >
            {/* {devices.map(({
            color,
            icon: Icon,
            title,
            value,
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))} */}
          </Box>
        </CardContent>
      </Card>} />
  );
};
