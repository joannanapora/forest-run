import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, FormControl } from '@material-ui/core';
import { useUploadStyles } from './event-image.styles';

const AvatarUploadStep = ({ imageValue, onImageUpload }) => {
    const classes = useUploadStyles();

    return (
        <div className={classes.upload}>
            { imageValue ?
                <FormControl className={classes.formControl}>
                    <img className={classes.image} alt='Success!' src={imageValue} />
                </FormControl>
                :
                <FormControl className={classes.formControl}>
                    <Button
                        variant="contained"
                        component="label"
                    >Upload File
                    <input
                            hidden
                            type="file"
                            onChange={onImageUpload}
                        />
                    </Button>
                </FormControl>}
        </div>
    );

}

export default AvatarUploadStep;