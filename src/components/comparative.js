import React from 'react'
import { Bar } from "react-chartjs-2"
import { CardContent, CircularProgress, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box } from "@mui/system";

const ComparativeLayout = styled('div')(({ theme, ownerState }) => {
  return {
    height: '80px',
    display: 'flex',
    width: '90%',
    alignItems: 'center'
  };
});
const ComparativeLayoutFullWidth = styled('div')(({ theme, ownerState }) => {
  return {
    height: '80px',
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  };
});
const Loading = styled('div')(({ theme, ownerState }) => {
  return {
    display: 'flex',
    minWidth: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  };
});

export const Comparative = ({ time: { mongo, postgres, mongo_indexed }, fetch, child, loading }) => {
  useEffect(() => {
    if (fetch) fetch()
  }, [])
  const theme = useTheme();
  // const options = {
  //   labels: ['mongo', 'postgres', 'mongo_indexed'],
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
        backgroundColor: 'rgba(251,188,4, 0.5)',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [loading ? 0 : mongo],
        label: 'Mongo',
        maxBarThickness: 8,
      },
      {
        backgroundColor: 'rgba(47,103,146, 0.5)',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [loading ? 0 : postgres],
        label: 'Postgres',
        maxBarThickness: 8,
      },
      {
        backgroundColor: 'rgba(82, 171, 76, 0.5)',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [loading ? 0 : mongo_indexed],
        label: 'Mongo Indexed',
        maxBarThickness: 8
      }
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
        {fetch ?
          <ComparativeLayout>
            <Bar
              data={data}
              options={options}
            />
            <Loading>
              <Box sx={{ display: 'flex', justifyItems: 'center' }}>
                {loading ? <CircularProgress color="black" size={15} thickness={5} /> : <RefreshIcon onClick={fetch} style={{ cursor: 'pointer' }} />}
              </Box>
            </Loading>
          </ComparativeLayout> :
          <ComparativeLayoutFullWidth>
            <Bar
              data={data}
              options={options}
            />
          </ComparativeLayoutFullWidth>}
      </div>
    </>
  )
}