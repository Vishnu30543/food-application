//import React from 'react'

import { useState } from "react"
import {db} from '../Firebase2';
import { addDoc, collection } from 'firebase/firestore';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

const Form1 = () => {
    const [price, setP] = useState(0);
    const [name, setN] = useState("");
    const [category, setC] = useState("");
    const [vegetarian, setV] = useState(false);
    const [availabilityQuantity, setA] = useState(0);
    const [image, setI] = useState("");
    const adddata = async() => {
        const q = await addDoc(collection(db,"sampleapp"),{
            name:name,
            category:category,
            price:price,
            vegetarian:vegetarian,
            availabilityQuantity:availabilityQuantity,
            image:image
        });
        console.log(q.id);
    }
  return (
    <>
    <div id="adddata"><strong>Add New Food</strong><br/>
    <TextField type="text" onChange={(e) => setN(e.target.value)} id="outlined-basic" label="Food-name.." variant="outlined" />
    {/* <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl> */}
    <TextField type="number" onChange={(e) => setP(e.target.value)} id="outlined-basic" label="price" variant="outlined" />
    {/* <FormControl HalfWidth variant="outlined" margin="dense">
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
      <Select
        value={category}
        onChange={(e) => setC(e.target.value)}
        labelId="demo-simple-select-label"
      >
        <MenuItem value={'Main Course'}>Main Course</MenuItem>
        <MenuItem value={'Italian'}>Italian</MenuItem>
      </Select>
    </FormControl> */}
    <select id='select2' //onChange={this.handleCategoryChange} >
            onChange={(e) => setC(e.target.value)}>
            <option value=''>All Categories</option>  {/* Default option */}
            <option value='Italian'>Italian</option>
            <option value='Main Course'>Main Course</option>
            <option value='Desserts'>Desserts</option>
    </select>
    <TextField type="boolean" onChange={(e) => setV(e.target.value)} id="outlined-basic" label="Vegetarian ?" variant="outlined" />
    <TextField type="number" onChange={(e) => setA(e.target.value)} id="outlined-basic" label="Quantity" variant="outlined" />
    <TextField type="text" onChange={(e) => setI(e.target.value)} id="outlined-basic" label="Image path" variant="outlined" /><br/>
    <Button onClick={adddata} variant="contained" size="small">Add Data</Button>
    </div>
    </>
  )
}

export default Form1