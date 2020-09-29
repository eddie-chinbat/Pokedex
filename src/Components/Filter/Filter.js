import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Filter({ types, typeFilter, weaknesses, weaknessFilter, handleInputChange, handleTypeFilter, handleWeaknessFilter }) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Search</InputLabel>
                <Input onChange={handleInputChange} color="secondary"/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                    multiple
                    value={typeFilter}
                    onChange={handleTypeFilter}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    color="secondary"
                >
                    {
                        types.map((value) => (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={typeFilter.indexOf(value) > -1} />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Weakness</InputLabel>
                <Select
                    multiple
                    value={weaknessFilter}
                    onChange={handleWeaknessFilter}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    color="secondary"
                >
                    {
                        weaknesses.map((value) => (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={weaknessFilter.indexOf(value) > -1} />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Filter
