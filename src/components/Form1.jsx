//import React from 'react'

import { useState } from "react"
import {db} from '../Firebase2';
import { addDoc, collection } from 'firebase/firestore';
import { TextField } from "@mui/material";

const Form1 = () => {
    const [price, setP] = useState(0);
    const [name, setN] = useState("");
    const [category, setC] = useState("");
    const [vegetarian, setV] = useState("");
    const [availabilityQuantity, setA] = useState(0);
    const adddata = async() => {
        const q = await addDoc(collection(db,"sampleapp"),{
            name:name,
            category:category,
            price:price,
            vegetarian:vegetarian,
            availabilityQuantity:availabilityQuantity
        });
        console.log(q.id);
    }
  return (
    <>
    <div>Add Data</div>
    <TextField type="text" onChange={(e) => setN(e.target.value)} id="outlined-basic" label="Food-name.." variant="outlined" />
    
    <input type="number" onChange={(e) => setP(e.target.value)} value={price} placeholder="price"></input>
    <input type="text" onChange={(e) => setC(e.target.value)} placeholder="Food-category.."></input>
    <input type="boolean" onChange={(e) => setV(e.target.value)} placeholder="Vegetarian ?"></input>
    <input type="number" onChange={(e) => setA(e.target.value)} placeholder="Quantity"></input>
    <button onClick={adddata}>Add Data</button>
    </>
  )
}

export default Form1