import React from 'react';
import { Button, FormControl } from '@material-ui/core';
import { useUploadStyles } from './upload-event-image-step.styles';

const AvatarUploadStep = () => {
    const classes = useUploadStyles();
    const [selectedFile, setFile] = React.useState('');
    const [image, saveImage] = React.useState(false);

    const onImageUpload = ({ target }: any) => {
        setFile(target.files[0])
    };

    const handleSubmit = () => {
        saveImage(true);
    };


    return (
        <div className={classes.upload}>
            { selectedFile ?
                <FormControl className={classes.formControl}>
                    <img className={classes.image} alt='Success!' src={selectedFile} />
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