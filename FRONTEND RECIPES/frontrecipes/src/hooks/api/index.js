import { useEffect, useState } from "react";

const hostname = 'http://localhost:8000';

const options = {
    headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
    }
}

export const UseGet = (url) =>{
    const [response,setResponse]=useState();
    const [loading,setloading]=useState(true);
    const [error,seterror]=useState();

useEffect ( () => {
        setloading(true);
        fetch(hostname + url,
        {
            method:'GET',
            ...options,
        }).then(response => response.json())
        .then(response => {
            setResponse(response);
            setloading(false);
        }).catch(error=>{
            setloading(false);
            seterror(error);
        })
    },[url]);
 
    
    return {
        response,
        loading,
        error,
        
    }
}


export const UseGetRecipesList = (keywords) =>{
    let url = '/recipes';
  

     const params = Object.keys(keywords)
     .filter(key=>keywords[key] !==undefined)
     .reduce((prev ,next) => ({...prev,[next]:keywords[next]}),{});
     
 
     const querystring = new URLSearchParams(params).toString();
    
    if(querystring){
     url =  url + '?' + querystring;
    
    }
    return UseGet(url);
}


export const UseRecipe = (id) => {
 
 
 const [response,setResponse]=useState({});
 useEffect ( () => {
         fetch('http://localhost:8000/recipes/'+ id,
         {
             method:'GET',
             ...options,
         }).then(response => response.json())
         .then(response => {
             setResponse(response);  
         })
     },[id]);
     
     return response;
}
export const UseCreateRecipe = () => {
    const [loading,setloading]= useState(false);
    return {
        createRecipes: (body) => {
            setloading(true);
            return fetch('http://localhost:8000/recipes/',{
                method:'POST',
                body:JSON.stringify(body),
                ...options,
                }).then(response => response.json())
                .then(response =>{
                    setloading(false);
                    return response;
                })
        },
        loading,
    }   
}

 
//HOOK EDIT 

export const UseEditRecipe = (id) => {
    const [loading,setloading]= useState(false);
    return {
        editRecipes: (body) => {
            setloading(true);
            return fetch('http://localhost:8000/recipes/'+ id,{
                method:'PUT',
                body:JSON.stringify(body),
                ...options,
                }).then(response => response.json())
                .then(response =>{
                    setloading(false);
                    return response;
                })
        },
        loading,
    }   
}




export const UseDeleteRecipe = (id) => {
 return () => 
  fetch('http://localhost:8000/recipes/'+ id,
    {
     method:'DELETE',
    })
}
