import { useHistory, useLocation } from "react-router-dom";
import { recipeList ,home, recipeof} from '../../constants/urls';


export const usePages = () => {
    const history = useHistory();
    let location = useLocation();
    const isRecipesPage = location.pathname.startsWith('/recipes/');
    const isRecipesList = location.pathname ===recipeList;
    const isHome = location.pathname === home;
    
    return{
        isRecipesPage,
        isRecipesList,
        isHome,
    
        gotolist: search => history.push(recipeList + (search ?('?search='+ search) :'')),
        gotorecipespage: (id) => history.push(recipeof(id)),
        gohome: () => history.push(home)
    }
}
