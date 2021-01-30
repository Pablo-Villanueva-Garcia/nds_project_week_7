import {
    useParams,
    useHistory,
    Link
} from "react-router-dom";
import {UseRecipe,UseDeleteRecipe} from "../../../hooks/api/index";
import { usePages } from "../../../hooks/usePages/Usepages";
import {  editrecipeof } from '../../../constants/urls';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

export const OneRecipe = () => {
    
    const {id}= useParams();
    const recipes = UseRecipe(id);
    const {gotolist}=usePages();
    const Deleterecipe = UseDeleteRecipe(id);

    const handledelete = (id) =>{
        Deleterecipe(id).then(response => gotolist())
    }
    return(
        <div className="xs100 just_center">
            <div className="flex_dir_col centrado">
            
            <h1>{recipes.title}</h1>
            {recipes.keywords?.map(keywords=><span>{keywords}</span>)}
            <img alt="" className="xs50" src={recipes.photo}></img>
            <div>
                <button className="xs20" onClick={handledelete}>Borrar</button>
                <Link className="xs20" to={editrecipeof(id)}>
                <button className="xs20">Editar</button>
                </Link>
            </div>
            
           
            </div>
        </div>
        )
}

 
    

    