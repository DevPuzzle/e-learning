const mongoose = require('mongoose');
//const jsonQuery = require('json-query')

const School = require('../models/school');
const Course = require('../models/course');
const data = require('../../data/cities.json');

exports.cities_filter = (req, res, next) => {
  const city = req.body.city;
  console.log('city', req.body.city);

  if(city){

    const text = city.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const regex = new RegExp(text, 'gi');

    let filtered = data.filter( obj => {
      if(regex.test(obj.city)) {
        console.log('obj.city', obj.city)
        return obj.city
      }
      return false
    })

    let doc = filtered.map(obj => {

      return {
        state : obj.state,
        city : obj.city
      }
    })      

    res.status(200).json({
      data: doc
    }); 
    
  } else {
    res.status(401).json({
      error: 'Error send city'        
    });
  }

}

exports.state_filter = (req, res, next) => {
    
  const state = req.body.state;
  console.log('state', req.body.state);

    if(state){
      const text = state.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(text, 'gi');

      let filtered = data.filter( stateObj => {
        if(regex.test(stateObj.state)) {
          console.log('stateObj.state', stateObj.state)
          return stateObj.state                     
        }
        return false
      })
        
      let doc = filtered.map(docObj => docObj.state ); 
      let uniqDoc = Array.from(new Set(doc));        
     
      res.status(200).json({
        data: uniqDoc,                
        message: 'Successfuly'
      });
    } else {
      res.status(401).json({
        error: 'Error send state'        
      });
    }

}

exports.state_cities_filter = (req, res, next) => {  
  const state = req.body.state;
  console.log('state == ', state)
  if(state){       

    let filtered = data.filter( Obj => {      
      if(Obj.state == state) {
        //console.log('Obj', Obj.state)
        return Obj.state
      }
      return false
    })

    let doc = filtered.map(docObj => docObj.city ); 
    
    res.status(200).json({
      data: doc,
      message: 'Successfuly'
    });
  } else {
    res.status(401).json({
      error: 'Error send state'        
    });
  }

}

