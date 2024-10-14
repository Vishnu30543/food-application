//import React from 'react'

import { useState } from "react"
import {db} from '../Firebase-config';
import { addDoc, collection } from 'firebase/firestore';

const Form = () => {
    const [price, setP] = useState(0);
    const [name, setN] = useState("");
    const adddata = async() => {
        const q = await addDoc(collection(db,"food"),{
            name:name,
            price:price
        });
        console.log(q.id);
    }
  return (
    <>
    <div>Add Data</div>
    <input type="text" onChange={(e) => setN(e.target.value)} placeholder="Food-name.."></input>
    <input type="number" onChange={(e) => setP(e.target.value)} value={price} placeholder="price"></input>
    <button onClick={adddata}>Add Data</button>
    </>
  )
}

export default Form