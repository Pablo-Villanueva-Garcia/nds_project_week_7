import { useRef, useState } from "react";
import { UseCreateRecipe, UseRecipe } from "../../../hooks/api/index";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
import { usePages } from "../../../hooks/usePages/Usepages";
export const Createrecipe = () =>{

    const {gotorecipespage}= usePages();
    const titleref = useRef();
    const keywordsref = useRef();
    const{loading,createRecipes}= UseCreateRecipe();
    const handlecreate = () =>{

        const body={
            title:titleref.current.value,
            keywords:keywordsref.current.value.split(','),
        }
        createRecipes(body).then(response=>gotorecipespage(response.id));
    }
    return(
    <div className="xs100 just_center">
        <div className="flex_dir_col centrado">
    
       
        <h1>Nueva Receta</h1>
        <div className="xs70 flex_dir_col ali_center">
            <input className="xs50 mb20" type="text" placeholder="Nombre receta" ref={titleref}></input>
            <input className="xs50 mb20" type="text" placeholder="Keywords" ref={keywordsref}></input>
            <button className="xs30" onClick={handlecreate} disabled={loading}>
                {loading ? "Loading" : "Crear"}
                </button>
        </div>
        
            
        </div>
    </div>
    )
}
