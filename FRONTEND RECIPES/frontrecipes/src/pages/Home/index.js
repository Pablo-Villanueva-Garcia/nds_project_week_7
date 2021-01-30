import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import { recipeList } from "../../constants/urls";  
const Myhome = () => {
    return(
    <div>
         
            <Link to={recipeList}>
                <p>Lista de recetas</p>
            </Link>
    </div>
       
    )
}

export default Myhome ; 