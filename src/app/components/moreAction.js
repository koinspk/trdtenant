import PropTypes from 'prop-types'; 
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { MoreVert } from '@mui/icons-material';
import { Popover } from '@mui/material';
 

export default function MoreActionMenu({ onDelete, editRowId, openModal  }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          py : 2,
          width: 160,
          '& .MuiMenuItem-root': { px: 2, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <DeleteOutline sx={{ mr : 1 }} />
          Delete
        </MenuItem>

        <MenuItem component={RouterLink}  to={`edit/${editRowId}`}>
          <EditOutlined sx={{ mr : 1 }}/>
          Edit 
        </MenuItem>
      </Popover>
    </>
  );
}
