'use client';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AppButton from '../../Ui/Admin/AppButton';
import { MdOutlineMenuOpen } from "react-icons/md";
interface NavbarProps {
  onMenuClick: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // logout hook
  // const { logout, isPending } = useLogout();

  const handleConfirm = async () => {
    try {
      // await logout();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#F5F6FA',
          color: '#000',
          borderBottom: '2px solid #e7e9ed',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              aria-label="Toggle sidebar menu"
              onClick={onMenuClick}
              sx={{
                borderWidth: 2,
                borderColor: '#e7e9ed',
                minWidth: 36,
                width: 44,
                height: 44,
              }}
            >
              <MdOutlineMenuOpen size={40}/>
            </Button>

            <Image
              src="/assets/images/flat-taxi-logo.jpg"
              onClick={() => {
                router.push('/admin');
              }}
              alt="Taxxiinparis Logo"
              width={60}
              height={60}
              style={{
                objectFit: 'contain',
                cursor: 'pointer',
              }}
            />
          </Box>
          <AppButton color="error" aria-label="Logout" onClick={() => setOpen(true)}>
            Logout
          </AppButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <AppButton variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </AppButton>
          <AppButton
            // disabled={isPending}
            // loading={isPending}
            variant="contained"
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </AppButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminNavbar;
