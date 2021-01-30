import './header.css';
import {usePages} from "../../hooks/usePages/Usepages";

import {
    BrowserRouter as Router, 
    Link,
  } from "react-router-dom";


function HeaderMain() {
    
    const {isRecipesPage,isRecipesList,isHome,gotolist}= usePages();
    const searchHandler = (e) =>{
        if(e.key === 'Enter'){
            const search = e.target.value;
            gotolist(search);
        }
        console.log(e);
    }


    return (
        <div className="header just_AR">
            
            {isHome && (<h1>HOME</h1>)}
            {isRecipesPage && (<h1>RECETA</h1>)} 
            {isRecipesList && (<h1>LISTA DE RECETAS</h1>)} 
            {<input type="text" placeholder="Busqueda palabras clave" onKeyPress={searchHandler}></input>}
            {isRecipesPage && (<button onClick={e=>gotolist()}>Atras</button>)} 
            {isRecipesList && (<Link to="/recipes/new"><p>Crear Receta</p></Link>)} 
             
        </div>
    );
}



export default HeaderMain;