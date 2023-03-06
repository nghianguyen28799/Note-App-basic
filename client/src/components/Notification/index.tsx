import React, { useEffect } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "@/utils/constants";
import { Badge, IconButton, Menu, MenuItem, Typography } from "@mui/material";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription pushNotification {
    notification {
      message
    }
  }`;

export const Notification = () => {
  const [invisible, setInvisible] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setInvisible(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    (async () => {
      const onNext = (data: any) => {
        setMessages((message) => [...message, data?.data?.notification?.message]);
        setInvisible(true);
        console.log(data);

        /* handle incoming values */
      };

      let unsubscribe = () => {
        /* complete the subscription */
      };

      await new Promise((resolve: any, reject) => {
        unsubscribe = client.subscribe(
          {
            query: query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Badge color="success" variant={invisible ? "dot" : "standard"}>
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {messages.length ? (
          messages.map((message, index) => {
            return (
              <MenuItem onClick={handleClose} key={index}>
                {message}
              </MenuItem>
            );
          })
        ) : (
          //   <MenuItem onClick={handleClose}>Not found new message.</MenuItem>
          <Typography variant="body2" px={2}>
            Not found new message.
          </Typography>
        )}
      </Menu>
    </React.Fragment>
  );
};
