// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

interface CountryType {
    name: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


const AutoCompletePlace = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<CountryType[]>([]);
    const loading = open && options.length === 0;
    const [inputValue, setInputValue] = React.useState('');


    const onChange = ({ nativeEvent }) => {
        setInputValue(inputValue + nativeEvent.data)
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch(`https://api.getAddress.io/find/nw119eu?api-key=5wPaYsdCQkSnK7z5Y8ePCA30067`);
            await sleep(1e3); // For demo purposes.
            const locations = await response.json();

            if (active) {
                setOptions(locations.addresses.map((a, i) => ({ name: a, key: i })));

            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }
            }
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    value={inputValue}
                    onChange={onChange}
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    InputProps={{
                        onChange,
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                { loading ? <CircularProgress color="inherit" size={20} /> : null
                                }
                                { params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default AutoCompletePlace;