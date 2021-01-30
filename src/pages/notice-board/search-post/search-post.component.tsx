import React, { useState } from 'react';
import { useSearchPostStyles } from './search-post.styles';
import { Button, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';


const SearchPost = ({ onSearch }) => {
    const classes = useSearchPostStyles();
    const [search, setSearch]: [string, any] = useState('');
    const [errorEmptyInput, setErrorEmptyInput]: [boolean, any] = useState(false);
    const [error2Characters, seterror2Characters]: [boolean, any] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const offAlert = () => {
        setTimeout(() => {
            setErrorEmptyInput(false);
            seterror2Characters(false);
        }, 5000);
    }

    const handleSearchButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (search.length < 1) {
            setErrorEmptyInput(true);
            offAlert();
            return;
        };
        if (search.length < 2) {
            seterror2Characters(true);
            offAlert();
            return;
        };

        onSearch(search);
    };


    return (
        <div className={classes.root}>
            <TextField
                placeholder="Search by title, author or keywords…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={handleSearch}
            />
            {
                errorEmptyInput ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Search field is empty</Alert></div>
                ) : null
            }
            {
                error2Characters ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Please enter at least 2 characters</Alert></div>
                ) : null
            }
            <Button
                onClick={handleSearchButton}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<Search />}
            >
                Submit
      </Button>
        </div>
    );
}

export default SearchPost;