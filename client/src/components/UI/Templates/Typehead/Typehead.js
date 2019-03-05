import React from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import { FormControl, List, ListItem } from '@material-ui/core';

const Typehead = (props) => {

    return (
      <Downshift style={{position: 'relative'}}
        onChange={props.downshiftOnChange} 
        initialInputValue={props.editedSchool ? props.editedSchool.city : ''}
        itemToString={item => (item ? item.city : '')}>
         {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
           <div>
             <FormControl margin="normal" required fullWidth>
             <TextField {...getInputProps({
               placeholder: 'Search',
               label: 'Select city',
               onChange: props.inputChange,
               
             })}/>
             </FormControl>
             {isOpen ? (
               <List 
                style={{position: 'absolute', zIndex: '10000'}}>
                 {
                   props.cities && props.cities.data ?
                   props.cities.data.filter(city => !inputValue || city.city.toLowerCase().includes(inputValue.toLowerCase()))
                   .slice(0, 10)
                   .map((item,index) => (                      
                     <ListItem button
                     key={index}
                      {...getItemProps({key: index, index, item})}
                      style={{
                        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                        borderBottom: '1px solid #ccc',
                        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                      }}>
                       {`${item.city}, ${item.state}`}
                     </ListItem>
                   ))
                 : null}
               </List>
             ) : null }
           </div>
         )}
      </Downshift>
    )
  }

export default Typehead;