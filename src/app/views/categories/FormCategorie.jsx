import { Button, Grid, Icon, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { logoutUser } from '../../../deconnection';
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const FormCategorie = ({ selectedCategory, selectedCategoryId, onFormSubmitSuccess }) => {
  const [categorie, setCategorie] = useState(selectedCategory || '');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setCategorie(value);
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');
    if (selectedCategory) {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const response = await fetch(
        `https://vehiculeback.onrender.com/api/v1/categories/${selectedCategoryId}`,
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({ categorie: categorie })
        }
      );
      const jsonData = await response.json();
      if (jsonData.status_code === '401') {
        alert(jsonData.message);
        const logoutResult = await logoutUser();
        if (logoutResult.success) {
          navigate('/session/signin');
        } else {
          console.error('Échec de la déconnexion:', logoutResult.message);
          alert(logoutResult.message);
        }
      } else if (jsonData.status_code === '404') {
        alert(jsonData.message);
      }
      console.log(jsonData);
    } else {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      headers.append('Content-Type', 'application/json');

      const response = await fetch('https://vehiculeback.onrender.com/api/v1/categories', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ categorie: categorie })
      });
      const jsonData = await response.json();
      if (jsonData.status_code === '401') {
        alert(jsonData.message);
        const logoutResult = await logoutUser();
        if (logoutResult.success) {
          navigate('/session/signin');
        } else {
          console.error('Échec de la déconnexion:', logoutResult.message);
          alert(logoutResult.message);
        }
      }
    }
    onFormSubmitSuccess();
    setCategorie('');
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="Categorie"
              label={selectedCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              onChange={handleChange}
              value={categorie || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>{selectedCategory ? 'edit' : 'send'}</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
            {selectedCategory ? 'Modifier' : 'Valider'}
          </Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default FormCategorie;
