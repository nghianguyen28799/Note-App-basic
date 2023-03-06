import { useAuthContext } from "@/context/AuthProvider";
import { Avatar, Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Header = () => {
  const { user } = useAuthContext();
  const useAuth = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        useAuth.handleSetUser?.(null);
        handleClose();
      })
      .catch((error) => {
        console.log("error logout:" + error);
      });
  };

  return (
    <Box>
      <Stack
        gap={1}
        flexDirection={"row"}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={(e: any) => handleClick(e)}
      >
        <Typography variant="body1" sx={{ height: "max-content" }}>
          {user?.displayName}
        </Typography>
        <Avatar alt="Avatar" src={user?.photoURL || ""} />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
