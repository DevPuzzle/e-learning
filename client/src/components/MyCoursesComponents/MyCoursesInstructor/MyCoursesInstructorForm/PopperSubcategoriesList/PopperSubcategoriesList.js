import React from 'react';
import {
  Popper,
  List, 
  ListItem, 
  Paper,
  Fade } from '@material-ui/core';

const PopperSubcategoriesList = (props) => {
  return (
    <Popper
      placement='right-start'
      style={{zIndex: '100100'}}
      open={props.openSubcategoriesList}
      anchorEl={props.selectedSubcategoryEl}
      transition>
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                {props.subcategories.map(subcategory => (
                  <ListItem 
                    onMouseOver={(e) => props.showThemesHandler(e, subcategory._id)}
                    key={subcategory._id}
                    button>
                    {subcategory.name}
                  </ListItem>
                ))}
                <Popper
                  placement='right-start'
                  style={{zIndex: '100200'}}
                  open={props.openThemesList}
                  anchorEl={props.selectedThemeEl}
                  transition>
                  {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <List>
                          {props.themes.map(theme => (
                            <ListItem
                              key={theme._id}
                              button
                              onClick={() => props.selectedThemeItemHandler(theme)}>
                                {theme.name}
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </List>
            </Paper>
          </Fade>
        )}
    </Popper>
  )
}

export default PopperSubcategoriesList;