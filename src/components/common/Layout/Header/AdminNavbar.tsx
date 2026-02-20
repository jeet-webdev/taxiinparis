'use client';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
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
import AppButton from '../Ui/Button/AppButton';
import { useState } from 'react';
import { useLogout } from '@/features/auth/hooks/useLogout';

interface NavbarProps {
  onMenuClick: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // logout hook
  const { logout, isPending } = useLogout();

  const handleConfirm = async () => {
    try {
      await logout();
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
              <MenuOpenIcon sx={{ width: 20, height: 20 }} />
            </Button>

            <Image
              src="/assets/images/logo.png"
              onClick={() => {
                router.push('/admin/dashboard');
              }}
              alt="Perennialmath Logo"
              width={120}
              height={30}
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
            disabled={isPending}
            loading={isPending}
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
