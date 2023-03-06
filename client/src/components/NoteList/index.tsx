import { ADD_NOTE, GET_NOTES } from "@/services/noteService";
import { useMutation, useQuery } from "@apollo/client";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import Note from "../Note";

const NoteList = () => {
  const { folderId = "", noteId = "" } = useParams();
  const navigate = useNavigate();

  const { data, refetch } = useQuery(GET_NOTES, {
    variables: { folderId },
  });

  const [addNote, { data: addedData }] = useMutation(ADD_NOTE);

  const [activeNoteId, setActiveNoteId] = useState<string>("");

  useEffect(() => {
    if (addedData) {
      refetch({
        folderId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedData]);

  useEffect(() => {
    setActiveNoteId(noteId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      setActiveNoteId(id);
      navigate(`note/${id}`);
    },
    [navigate]
  );

  const handleAddNote = () => {
    addNote({
      variables: {
        content: "",
        folderId,
      },
    });
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#F0EBE3",
            position: "relative",
            overflow: "auto",
            height: "100%",
            p: 2,
            ".MuiButtonBase-root": {
              "&:hover": {
                bgcolor: "#b5ab9c !important",
                color: "#fff",
              },
            },

            ".Mui-selected": {
              bgcolor: "#b5ab9c !important",
              color: "#fff",
            },
          }}
          subheader={
            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} mb={1}>
              <Typography variant="h6" color="#fff" textAlign={"start"}>
                Notes
              </Typography>
              <Tooltip title="Add Folder">
                <IconButton onClick={handleAddNote}>
                  <AddIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        >
          <Stack gap={1}>
            {data?.folder.notes?.map(({ id, content, updatedAt }: any) => {
              return (
                <ListItem disablePadding key={id}>
                  <ListItemButton
                    selected={activeNoteId === id}
                    onClick={() => handleNavigate(id)}
                    sx={{
                      bgcolor: "#fff",
                    }}
                  >
                    <ListItemText
                      primary={
                        content ? (
                          <div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content.substring(0, 20),
                              }}
                            />
                            <Typography variant="subtitle2" sx={{ fontSize: 10, color: "#3e3e3e" }}>
                              {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                            </Typography>
                          </div>
                        ) : (
                          "Empty"
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Stack>
        </List>
      </Grid>

      <Grid item xs={8}>
        <Note folderId={folderId} refetchNotesList={refetch} />
      </Grid>
    </Grid>
  );
};

export default NoteList;
