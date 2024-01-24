import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DoughnutChart from './shared/Doughnut';
import StatCards from './shared/StatCards';
import StatVente from './shared/StatVente';
import UpgradeCard from './shared/UpgradeCard';
import ListVente from './shared/ListVente';
import { SimpleCard } from 'app/components';

import { useState, useEffect } from 'react';
import Api from 'app/functions/Api';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const Analytics = () => {
  const { palette } = useTheme();
  const [site, setSite] = useState({});

  useEffect(() => {
    const fetchStat = async () => {
      const response = await Api.fetch(
        'https://vehiculeback.onrender.com/api/v1/statistique',
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );

      console.log(response.data);
      setSite(response.data); // Assurez-vous que la structure des données est correcte
    };

    fetchStat(); // Appel de la fonction asynchrone
  }, []);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <StatCards site={site} />
            <StatVente
              height="350px"
              color={[palette.primary.main, palette.primary.light]}
              site={site}
            />
          </Grid>

          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <Grid item xs={12} md={8} key={1}>
              <UpgradeCard />
            </Grid>

            <Grid item xs={12} md={4} key={2}>
              <Card sx={{ p: 2, ml: 2 }}>
                <Title>Les annonces</Title>
                <SubTitle>(Ce moi-ci)</SubTitle>

                <DoughnutChart
                  height="242px"
                  color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                  site={site}
                />
              </Card>
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SimpleCard className="mb-0" title="#Top vente">
              <ListVente site={site} />
            </SimpleCard>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
