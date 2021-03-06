import React, {useState,useRef} from 'react';
import {Avatar, Button, Icon, ListItemIcon, ListItemText, IconButton,Popover,Slide, MenuItem, Typography,Dialog} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';

import {red} from '@material-ui/core/colors';
import {FuseScrollbars, FuseSettings} from '@fuse';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const useStylesSettings = makeStyles(theme => ({
    button               : {
        position               : 'absolute',
        right                  : 0,
        top                    : 160,
        minWidth               : 48,
        width                  : 48,
        height                 : 48,
        opacity                : .9,
        padding                : 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius   : 0,
        zIndex                 : 999,
        color                  : theme.palette.getContrastText(red[500]),
        backgroundColor        : red[500],
        '&:hover'              : {
            backgroundColor: red[500],
            opacity        : 1
        }
    },
    '@keyframes rotating': {
        from: {
            transform: 'rotate(0deg)'
        },
        to  : {
            transform: 'rotate(360deg)'
        }
    },
    buttonIcon           : {
        animation: '$rotating 3s linear infinite'
    },
    dialogPaper          : {
        position       : 'fixed',
        width          : 380,
        maxWidth       : '90vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow      : theme.shadows[5],
        top            : 0,
        height         : '100%',
        minHeight      : '100%',
        bottom         : 0,
        right          : 0,
        margin         : 0,
        zIndex         : 1000,
        borderRadius   : 0
    }
}));

function UserMenu(props)
{
    const classes = useStylesSettings();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if(userMenu)
        setUserMenu(false);
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        
    };
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    
    const [userMenu, setUserMenu] = useState(null);
    
    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };
 
    const userMenuClose = () => {
        setUserMenu(null);
    };
    
    return (
        <React.Fragment>

            <Button className="h-36" onClick={userMenuClick}>
                {user.data.photoURL ?
                    (
                        <Avatar className="rounded-32 w-28 h-28" alt="user photo" src={user.data.photoURL}/>
                    )
                    :
                    (
                        <Avatar className="">
                            {user.data.displayName[0]}
                        </Avatar>
                    )
                }

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {user.data.displayName}
                    </Typography>
                    <Typography className="text-11 capitalize" color="textSecondary">
                        {user.role.toString()}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical  : 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                {!user.role || user.role.length === 0 ? (
                    <React.Fragment>
                        <MenuItem component={Link} to="/login">
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Login"/>
                        </MenuItem>
                        <MenuItem component={Link} to="/register">
                            <ListItemIcon className="min-w-40">
                                <Icon>person_add</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Register"/>
                        </MenuItem>
                        <MenuItem onClick={handleOpen}>
                            <ListItemIcon className="min-w-40">
                                <Icon>settings</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Settings"/>
                        </MenuItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile"/>
                        </MenuItem>
                        <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Inbox"/>
                        </MenuItem>
                        <MenuItem onClick={handleOpen}>
                            <ListItemIcon className="min-w-40">
                                <Icon>settings</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Settings"/>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                dispatch(authActions.logoutUser());
                                userMenuClose();
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>
                    </React.Fragment>
                )}
            </Popover>
            <Dialog
                TransitionComponent={Transition}
                aria-labelledby="settings-panel"
                aria-describedby="settings"
                open={open}
                keepMounted
                onClose={handleClose}
                BackdropProps={{invisible: true}}
                classes={{
                    paper: classes.dialogPaper
                }}
            >
                <FuseScrollbars className="p-24 sm:p-32">
                    <IconButton className="fixed top-0 right-0 z-10" onClick={handleClose}>
                        <Icon>close</Icon>
                    </IconButton>

                    <Typography className="mb-32" variant="h6">Theme Settings</Typography>

                    <FuseSettings/>

                </FuseScrollbars>
            </Dialog>
        </React.Fragment>
    );
}

export default UserMenu;
