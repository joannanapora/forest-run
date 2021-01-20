import React, { SyntheticEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        upload: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        successUpload: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    }));


const AvatarUploadStep = () => {
    const classes = useStyles();
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
                <div className={classes.successUpload}>
                    <img alt='Success!' src={selectedFile} />
                    <Button
                        variant="contained"
                        component="label"
                    >Update
                    <input
                            hidden
                            type="file"
                            onChange={onImageUpload}
                        />
                    </Button>
                </div>
                :
                <Button
                    variant="contained"
                    component="label"
                >Upload File
                    <input
                        hidden
                        type="file"
                        onChange={onImageUpload}
                    />
                </Button>}
        </div>
    );

}

export default AvatarUploadStep;