import React from 'react';
import { useSearchPostStyles } from './search-post.styles';
import { TextField } from '@material-ui/core';


const SearchPost = ({ onChange, value }) => {
    const classes = useSearchPostStyles();

    return (
        <div className={classes.root}>
            <TextField
                className={classes.textfield}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchPost;