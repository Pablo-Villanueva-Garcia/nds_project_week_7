import { useEffect, useRef, useState } from "react";
import { UseCreateRecipe, UseRecipe ,UseEditRecipe } from "../../../hooks/api/index";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
import { usePages } from "../../../hooks/usePages/Usepages";
import {
    useParams,
    useHistory
} from "react-router-dom";

export const Editrecipe = () =>{
    
    const {id}= useParams();
    const recipe = UseRecipe(id);
    const {gotolist}=usePages();
    const {gotorecipespage}= usePages();
    //const titleref = useRef();
    //const keywordsref = useRef();
    const [title,setTitle]=useState();
    const [keywords,setKeywords]=useState();
    useEffect( () => {
        if(recipe){
            setTitle(recipe.title);
            setKeywords(recipe.keywords /*.join(',') ¿porque join es undifined ?*/);
        }
    },[recipe]);
    


    const{loading,editRecipes}= UseEditRecipe(id);

    const handle_edit = () =>{
      
        const body={
            title,
            keywords:keywords,
        }
        editRecipes(body).then(response=>gotorecipespage(response.id));
    }
    return(
    <div className="xs100 just_center">
        <div className="flex_dir_col centrado">
    
       
        <h1>Editar Receta</h1>
        <div className="xs70 flex_dir_col ali_center">
            <input className="xs50 mb20" type="text" placeholder="editar receta"    onChange={e=>setTitle(e.target.value)} value={title}></input>
            <input className="xs50 mb20" type="text" placeholder="editar Keywords"  onChange={e=>setKeywords(e.target.value)} value={keywords}></input>
            <button className="xs30" onClick={handle_edit} disabled={loading}>
                {loading ? "Loading" : "Editar"}
                </button>
        </div>
        
            
        </div>
    </div>
    )
}
