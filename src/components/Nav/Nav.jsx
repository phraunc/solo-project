import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Nav() {
  const user = useSelector((store) => store.user);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Welcome to Two Pair, {user.username}</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        <div>
          {user.id && (
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            variant="contained"
            disableElevation
            onClick={handleToggle}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Dashboard
          </Button>
          )}
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {user.id && (
                        <MenuItem
                          component={Link}
                          to={"/user"}
                          onClick={handleClose}
                        >
                          Home
                        </MenuItem>
                      )}
                      {user.id && (
                        <MenuItem
                          component={Link}
                          to={"/info"}
                          onClick={handleClose}
                        >
                          Info Page
                        </MenuItem>
                      )}
                      {user.id && (
                        <MenuItem
                          component={Link}
                          to={"/message"}
                          onClick={handleClose}
                        >
                          Your Messages
                        </MenuItem>
                      )}
                      <MenuItem
                        component={Link}
                        to={"/about"}
                        onClick={handleClose}
                      >
                        About
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <LogOutButton />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {/* If a user is logged in, show these links */}
          {/* {user.id && (
            <>
              <Link className="navLink" to="/user">
                Home
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link> */}
          {/* If a user is logged in, show these links */}
          {/* {user.id && (
                <>
                  <Link className="navLink" to="/message">
                    Your Messages
                  </Link>
                </>
              )}

              <LogOutButton className="navLink" />
            </>
          )}

          <Link className="navLink" to="/about">
            About
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default Nav;
