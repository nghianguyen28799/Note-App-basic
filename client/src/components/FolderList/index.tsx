import { IFolderList } from "@/pages/Home";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@apollo/client";
import { ADD_FOLDER } from "@/services/folderService";

const FolderList = ({ folders, refetch }: IFolderList) => {
  const { folderId = "" } = useParams();
  const navigate = useNavigate();

  const [addFolder, { data, loading }] = useMutation(ADD_FOLDER);

  const [open, setOpen] = React.useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string>(folderId);
  const [folderName, setFolderName] = useState<string>("");

  const handleNavigate = (id: string) => {
    setActiveFolderId(id);
    navigate(`/folders/${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (data) {
      refetch();
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClose = () => {
    setFolderName("");
    setOpen(false);
  };

  const handleCreateFolder = () => {
    addFolder({ variables: { name: folderName } });
    if (data) {
      handleClose();
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#7D9D9C",
        position: "relative",
        overflow: "auto",
        height: "100%",
        p: 2,

        "& ul": { padding: 0 },
        ".MuiButtonBase-root": {
          "&:hover": {
            bgcolor: "#459b98 !important",
            color: "#fff",
          },
        },
        ".Mui-selected": {
          bgcolor: "#459b98 !important",
          color: "#fff",
        },
      }}
      subheader={
        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} mb={1}>
          <Typography variant="h6" color="#fff" textAlign={"start"}>
            Folders
          </Typography>
          <Tooltip title="Add Folder">
            <IconButton onClick={handleClickOpen}>
              <AddIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <Stack gap={1}>
        {folders?.map((folder) => (
          <ListItemButton
            key={folder.id}
            selected={folder.id === activeFolderId}
            sx={{
              bgcolor: "#fff",
            }}
            onClick={() => handleNavigate(folder.id)}
          >
            <ListItemText primary={folder.name} />
          </ListItemButton>
        ))}
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>Add a Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateFolder} disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default FolderList;
