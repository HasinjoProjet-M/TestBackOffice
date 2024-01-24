import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import MaxHeightMenu from './MaxHeightMenu';
import { useState, useEffect } from 'react';

import * as Util from 'app/functions/Util';
import Api from 'app/functions/Api';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const SimpleTable = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchAnnonce = async () => {
      const response = await Api.fetch('https://vehiculeback.onrender.com/api/v1/annonces', 'GET', {
        'Content-Type': 'application/json'
      });

      setAnnonces(response.data); // Assurez-vous que la structure des données est correcte
    };

    fetchAnnonce(); // Appel de la fonction asynchrone
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Auteur</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Voiture</TableCell>
            <TableCell align="center">Prix</TableCell>
            <TableCell align="center">Statut</TableCell>
            <TableCell align="right">Autre</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {annonces.map((annonce, index) => (
            <TableRow key={index}>
              <TableCell align="left">{annonce.auteur}</TableCell>
              <TableCell align="center">{Util.formatDate(annonce.date_annonce)}</TableCell>
              <TableCell align="center">{annonce.detailvoiture.marque}</TableCell>
              <TableCell align="center">Ar {Util.formatNumber(annonce.prix_vente)}</TableCell>
              <TableCell align="center">{Util.getStatus(annonce.statut)}</TableCell>
              <TableCell align="right">
                {/* <IconButton> */}
                <MaxHeightMenu annonce_id={annonce.annonce_id} />
                {/* </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
