//import React from 'react'
import { useEffect, useState } from 'react';
import {db} from '../Firebase2';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Form1 from './Form2';
import Navbar from './Navbar';
//import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Admin2 = () => {
  const [foods, setFoods] = useState([]);
  const [isediting, setisEdit] = useState(false);
  const [currfood, setcurrFood] = useState({name:'',category:'', price:'',vegetarian:'',availabilityQuantity:'',image:'', id:''})  
  // object type useState
  
  useEffect(() => {
      fetchFoods();
  },[])

  const fetchFoods = async() => {
    let farray = [];
    const q = await getDocs(collection(db,"sampleapp"));
    q.forEach((temp) => {
      farray.push({...temp.data(), id:temp.id});
    })
    setFoods(farray);
  }

const deletefood = async(id) => {
    await deleteDoc(doc(db,"sampleapp",id));
    console.log("Record Deleted");
    fetchFoods();
}

const editfood = (item) => {
    setisEdit(true);
    setcurrFood(item);
}

const updatefood = async (e) => {
  e.preventDefault();
  try{
    await updateDoc(doc(db,"sampleapp",currfood.id), {
      name:currfood.name,
      category:currfood.category,
      price:currfood.price,
      vegetarian:currfood.vegetarian,
      availabilityQuantity:currfood.availabilityQuantity,
      image:currfood.image
    });
    setisEdit(false);
    fetchFoods();
  }
  catch(error){
    console.log("Error occured here : ",error)
  }
}

  return (
    <>
    <Navbar/>
     <div id='container'>
     <Form1 /> <br/><br/> {/*<strong style={{display:'flex',justifyContent:'center'}}>Available Food :</strong> */}
    <TableContainer component={Paper}>
    <Table >
        <TableHead>
        <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Vegetarian</TableCell>
            <TableCell align="right">Available Quantity</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {foods.map((item) => (
                <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.vegetarian ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">{item.availabilityQuantity}</TableCell>
                <TableCell>
                    <img src={item.image} alt={item.name} id='img'/>
                </TableCell>
                <TableCell>
                    <Button onClick={() => editfood(item)} variant='contained' color='success' size='small'>Update</Button>
                </TableCell>
                <TableCell>
                    <Button  onClick={() => deletefood(item.id)} variant="outlined" color="error" size='small'>Delete</Button>
                </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
</div>
      {
        isediting && (
          <form onSubmit={updatefood} style={{margin:15, display:'flex',flexDirection:'column',alignItems:'center'}}>
            <input type='text' value={currfood.name} onChange={(e) => setcurrFood({...currfood, name:e.target.value})}></input><br/>
            <input type='text' value={currfood.category} onChange={(e) => setcurrFood({...currfood, category:e.target.value})}></input><br/>
            <input type='number' value={currfood.price} onChange={(e) => setcurrFood({...currfood, price:e.target.value})}></input><br/>
            <input type='boolean' value={currfood.vegetarian} onChange={(e) => setcurrFood({...currfood, vegetarian:e.target.value})}></input><br/>
            <input type='number' value={currfood.availabilityQuantity} onChange={(e) => setcurrFood({...currfood, availabilityQuantity:e.target.value})}></input><br/>
            <input type='text' value={currfood.image} onChange={(e) => setcurrFood({...currfood, image:e.target.value})}></input><br/>
            <Button type='submit' onClick={updatefood} variant='contained'>Save</Button>
            <Button type='button' onClick={()=>isediting(false)}>Cancel</Button>
          </form>
        )
      }
    </>
  );
}

export default Admin2