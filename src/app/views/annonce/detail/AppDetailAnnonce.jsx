import { Box, Stack, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import DetailSupp from './DetailSupp';
import BasicDetailCards from './BasicDetailCards';
import DetailTable from './DetailTable';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Api from 'app/functions/Api';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppDetailAnnonce = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const annonce_id = searchParams.get(`annonce_id`);

  const [annonce, setAnnonce] = useState({});

  // console.log("Id: " + annonce_id);

  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch(
        `https://vehiculeback.onrender.com/api/v1/annonces/${annonce_id}`,
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );

      setAnnonce(response.data); // Assurez-vous que la structure des données est correcte
    };

    fetchAnnonce(); // Appel de la fonction asynchrone
  }, [annonce_id]); // Déclencher l'effet à chaque changement de l'ID

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Detail Annonce' }]}
        />
      </Box>

      <Stack spacing={3}>
        <BasicDetailCards annonce={annonce} />
      </Stack>

      <Stack spacing={3}>
        <SimpleCard title="basic">
          <DetailTable annonce={annonce} />
        </SimpleCard>
      </Stack>
      <br />

      <Stack spacing={3} className="">
        <DetailSupp annonce={annonce} />
      </Stack>
    </Container>
  );
};

export default AppDetailAnnonce;
