import React from 'react';

import { useUploadStyles } from './event-image.styles';

import { Button, FormControl } from '@material-ui/core';

const ImageUploud = ({ imageValue, imageLoading, onImageUpload }) => {
    const classes = useUploadStyles();

    return (
        <div className={classes.upload}>
            {imageValue || imageLoading ?
                <FormControl className={classes.formControl}>
                    <img className={classes.image} alt={imageLoading ? "Uploading..." : "Success!"} />
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

export default ImageUploud;