import React, { Component, useState } from 'react';
import { types } from '../Helper/AnimalType';
import $ from 'jquery';
import './Filter.css'
function Filter(props) {
    const handleChange=(e)=>{
        console.log(e.target.value);
        setType(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let [...test]=e.target;
        console.log(test)
    }
    const toggleAdvanced=()=>{
        $('.advanced-search').slideToggle();
    }
    const handleLocationSubmit=(e)=>{
        e.preventDefault();
        let location=e.target[0].value;
        let type=e.target[2].value;
        let coat=e.target[3].value;
        let color=e.target[4].value;
        let gender=e.target[5].value;
        let filter={location,type,coat,color,gender}
        console.log(filter);
        props.handleSearch(filter);
        // props.handleSearch(e.target[0].value?e.target[0].value:null)
    }
    const [type,setType]=useState("");
    return <div className='filter'>
        <div className='primary-search'>
            <img></img>
            <form onSubmit={handleLocationSubmit}>
                <input type='text' placeholder='Search...'></input>
                <input type='submit' value='Search'></input>
                <span onClick={toggleAdvanced}><img src={require('../Assets/filter.png')}></img></span>
               
                <div className='advanced-search' style={{display:'none'}}>

                <h4>Advanced Search</h4>
                <select onChange={handleChange}>
                    <option value=''>Choose an animal type</option>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                    <option value='rabbit'>Rabbit</option>
                    <option value='small_furry'>Small &#38; Furry</option>
                    <option value='horse'>Horse</option>
                    <option value='bird'>Bird</option>
                    <option value='scale_fin'>Scale, Fins &#38; Other</option>
                    <option value='barnyard'>Barnyard</option>
                </select>
                <select>
                    <option value=''>--Optional--</option>
                    {type!=''&&types[type].coats.map(element=><option key={element} value={element}>{element}</option>)}
                </select>
                <select>
                    <option value=''>--Optional--</option>
                    {type!=''&&types[type].colors.map(element=><option key={element} value={element}>{element}</option>)}
                </select>
                <select>
                <option value=''>--Optional--</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <input type='reset'></input>

                </div>
            </form>
        </div>
     
        <div className='advanced-search' style={{display:'none'}}>
            {/* <h4>Advanced Search</h4>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    <option value=''>Choose an animal type</option>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                    <option value='rabbit'>Rabbit</option>
                    <option value='small_furry'>Small &#38; Furry</option>
                    <option value='horse'>Horse</option>
                    <option value='bird'>Bird</option>
                    <option value='scale_fin'>Scale, Fins &#38; Other</option>
                    <option value='barnyard'>Barnyard</option>
                </select>
                <select>
                    <option value=''>--Optional--</option>
                    {type!=''&&types[type].coats.map(element=><option key={element} value={element}>{element}</option>)}
                </select>
                <select>
                    <option value=''>--Optional--</option>
                    {type!=''&&types[type].colors.map(element=><option key={element} value={element}>{element}</option>)}
                </select>
                <select>
                <option value=''>--Optional--</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <input type='reset'></input>
            </form> */}
        </div>
        
    </div> ;
}

export default Filter;