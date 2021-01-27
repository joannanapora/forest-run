import React from 'react';
import { useAvatarStyles } from './avatar.styles';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, Typography } from '@material-ui/core';
import { CameraAlt, Edit } from '@material-ui/icons';

const UserAvatar = () => {
    const classes = useAvatarStyles();

    const actions = [
        { icon: < Edit />, name: 'Change Username' },
        { icon: <CameraAlt />, name: 'Change Image' },
    ];

    const handleTools = () => {

    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" >cesarzowa</Typography>
            <Avatar alt="cs-go-player" className={classes.large} src="https://blog.mapmyrun.com/wp-content/uploads/2017/07/5-Runners-Share-Their-Morning-Routines-Rachel.jpg" />
            <div className={classes.profileButtons}>
                {actions.map((action) => (
                    <IconButton
                        key={action.name}
                        onClick={handleTools}
                    >{action.icon}
                    </IconButton>
                ))}
            </div>
        </div>
    );
}

export default UserAvatar;