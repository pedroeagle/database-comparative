import { Bar } from "react-chartjs-2"
import { CardContent, useTheme } from '@mui/material';
import {styled} from '@mui/material/styles';

const ComparativeLayout = styled('div')(({theme, ownerState}) => {
  return {
    height: '80px'
  };
});

export const Comparative = ({ mongo, postgres, child }) => {
  const theme = useTheme();
  // const options = {
  //   labels: ['Mongo', 'Postgres'],
  //   datasets: [
  //     {
  //       label: 'Mongo',
  //       data: [mongo],
  //       backgroundColor: 'rgba(82, 171, 76, 0.5)',
  //     },
  //     {
  //       label: 'Postgres',
  //       data: [postgres],
  //       backgroundColor: 'rgba(47,103,146, 0.5)'
  //     }
  //   ]
  // }
  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(82, 171, 76, 0.5)',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [mongo],
        label: 'Mongo',
        maxBarThickness: 8,
      },
      {
        backgroundColor: 'rgba(47,103,146, 0.5)',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [postgres],
        label: 'Postgres',
        maxBarThickness: 8,
      },
    ],
    labels: [''],
  };

  const options = {
    indexAxis: 'y',
    animation: true,
    cornerRadius: 20,

    plugins: {
      legend: { display: false },
      layout: { padding: 0 }
    },
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
    <>
      <div>
        {child}
        <ComparativeLayout>
          <Bar
            data={data}
            options={options}
          />
        </ComparativeLayout>
      </div>
    </>
  )
}