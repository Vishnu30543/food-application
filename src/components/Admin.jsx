//import React from 'react'
import { useEffect, useState } from 'react';
import {db} from '../Firebase-config';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Form from './Form';

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [isediting, setisEdit] = useState(false);
  const [currfood, setcurrFood] = useState({name:'',price:'',id:''})  
  // object type useState
  
  useEffect(() => {
      fetchFoods();
  },[])

  const fetchFoods = async() => {
    let farray = [];
    const q = await getDocs(collection(db,"food"));
    q.forEach((temp) => {
      farray.push({...temp.data(), id:temp.id});
    })
    setFoods(farray);
  }

const deletefood = async(id) => {
    await deleteDoc(doc(db,"food",id));
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
    await updateDoc(doc(db,"food",currfood.id), {
      name:currfood.name,
      price:currfood.price
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
    <div>Menu</div>
    <Form /> <br/><br/>
    <div id='table'>
        <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td><button onClick={() => deletefood(item.id)}>Delete</button></td>
              <td><button onClick={() => editfood(item)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        isediting && (
          <form onSubmit={updatefood}>
            <input type='text' value={currfood.name} onChange={(e) => setcurrFood({...currfood, name:e.target.value})}></input>
            <input type='number' value={currfood.price} onChange={(e) => setcurrFood({...currfood, price:e.target.value})}></input>
            <button type='submit' onClick={updatefood}>Save</button>
            <button type='button' onClick={()=>isediting(false)}>Cancel</button>
          </form>
        )
      }
      </div>
    </>
  );
}

export default Admin