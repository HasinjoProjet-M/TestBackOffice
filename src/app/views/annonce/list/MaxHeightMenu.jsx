// MaxHeightMenu.jsx
import { Box, Icon, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';

const options = [
  { label: 'Detail', path: '/annonces/detail' , icon: 'info_outline'},
  { label: 'Valider', path: '/' , icon: 'check'},
  { label: 'Supprimer', path: '/' , icon: 'delete'},
];

const ITEM_HEIGHT = 48;

function MaxHeightMenu({ annonce_id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRedirect(path) {
    navigate(`${path}?annonce_id=${annonce_id}`);
    handleClose();
  }

  return (
    <Box>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>more_vert</Icon>
      </IconButton>

      <Menu
        open={open}
        id="long-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
      >
        {/* Utilisez annonce_id ici */}
        #{annonce_id}
        {options.map((option) => (
          <MenuItem key={option.label} selected={option === "Pyxis"} onClick={() => handleRedirect(option.path)}>
            <Icon>{option.icon}</Icon>&nbsp;&nbsp;{option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MaxHeightMenu;
