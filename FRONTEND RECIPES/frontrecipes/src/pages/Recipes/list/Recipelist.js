import { faFastBackward , faFastForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    BrowserRouter as Router, 
    Link,
    useLocation,
} from "react-router-dom";
import {UseGet, UseGetRecipesList} from "../../../hooks/api/index";
import {GoHomeButton} from "../../../components/Buttons/GoHome";
import { useState } from "react";


const Recipeslist = (props) => {

    return(
    <div  className="xs30 mb20 mt20 flex backgroundred just_AR borderadius27">
        <Link to= {'/recipes/'+ props.id}>
          <div className="xs100 mb20 p20 textbox">
            <h1 className="size30">{props.title}</h1>
        </div>
        </Link>
        

    </div>
)}

const parseQueryString = (queryString) => {
 
    if(!queryString){
        return {};
    }
    
    var search = queryString.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
} 

const Recipes = () => {




const[page,setpage]=useState(0);
const[pagesize,setpagesize]=useState(9);
const location= useLocation();
const queryString = parseQueryString(location.search);


const{response,loading,error,refresh}= UseGetRecipesList({
    keywords:queryString.search,
    page,
    pagesize,
    //refresh,
 });

 const recipes = response;

 if(loading){
    return <div>Loading...</div>;
}

if(error){
    return <div>Error</div>;
}

const pages = Math.ceil(recipes.totalElements / 10);
return(
    <div >
       

    <div className="xs100 just_AR flex_frw ">
        {recipes.contents.map(r => <Recipeslist {...r}/>  )}
  
    </div>

     <div className="just_AR">
        {page > 0 && <button onClick={() => setpage(page - 1)}><FontAwesomeIcon icon={faFastBackward} /></button>}
        <p>Paginas :{pages}</p>
        {page < pages && <button onClick={() => setpage(page + 1)}><FontAwesomeIcon icon={faFastForward} /></button>}    
        <p>Elementos totales :{recipes.totalElements}</p>
        <GoHomeButton/>
       
     </div>

    </div>
    )
};

export default Recipes 

 