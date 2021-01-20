import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        favselects: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 400,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const maps = [
    'Cache',
    'Dust II',
    'Inferno',
    'Overpass',
    'Mirage',
];

const guns = [
    'AK47',
    'M4A4',
    'AWP',
    'USP-S',
    'SG 553',
    'MP7'
]

function getStyles(name: string, mapList: string[], theme: Theme) {
    return {
        fontWeight:
            mapList.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [mapList, setMapList] = React.useState<string[]>([]);
    const [gunList, setGunList] = React.useState<string[]>([]);

    const handleChange = (name: string, value: string[]) => {
        if (name === 'maps') {
            console.log(value)
            setMapList(value);
        }
        if (name === 'guns') {
            console.log(value)
            setGunList(value);
        }

    };


    return (
        <div className={classes.favselects}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Favourite Maps</InputLabel>
                <Select
                    name='maps'
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={mapList}
                    onChange={(e) =>
                        handleChange(e.target.name, e.target.value as string[])
                    }
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {maps.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, mapList, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Favourite Maps</InputLabel>
                <Select
                    name='guns'
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={gunList}
                    onChange={(e) =>
                        handleChange(e.target.name, e.target.value as string[])
                    }
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {guns.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, gunList, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
