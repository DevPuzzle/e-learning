import React from 'react';
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Paper, MenuItem } from '@material-ui/core';


const suggestions = [
 
];


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const renderInput = (inputProps) => {
  const { InputProps, classes, ref, onChange, ...other } = inputProps;
  return(
    <TextField 
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}/>
  )
}

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  //POST REQUEST

  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep = 
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if(keep) {
          count += 1;
        }
        return keep;
    })
}

  const renderSuggestion = ({suggestion, index, itemProps, highlightedIndex, selectedItem}) =>{
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component='div'
        style={{fontWeight: isSelected ? 500 : 400 }}>
        {suggestion.label}
      </MenuItem>
    );
  }


const Typehead = (props) => {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <Downshift>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Search a country'
              })
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion,index) => 
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem
                    }))}
                </Paper>
              )
              : null}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  )
}

export default withStyles(styles)(Typehead);