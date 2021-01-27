import React from 'react';
import { useSearchPostStyles } from './search-post.styles';
import { Button, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';


const SearchPost = ({ onSearch }) => {
    const classes = useSearchPostStyles();
    const [search, setSearch]: [string, any] = React.useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (search.length < 1) {
            alert('Input is empty')
            return;
        };
        onSearch(search);
    };

    return (
        <div className={classes.root}>
            <TextField
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={handleSearch}
            />
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