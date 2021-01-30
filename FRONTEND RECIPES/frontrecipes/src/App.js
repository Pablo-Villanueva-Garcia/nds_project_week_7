import './css/App.css';
import './css/estructura.css';
import Myhome from './pages/Home/index';
import Recipes from './pages/Recipes/list/Recipelist';
import {OneRecipe} from './pages/Recipes/one_recipe/index';
import HeaderMain  from './components/header/header';
import {Createrecipe} from "./pages/Recipes/new_recipe/newrecipe";
import {Editrecipe} from "./pages/Recipes/edit_recipe/editrecipe";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { recipeList ,recipebyid ,recipenew ,home, editrecipeof } from './constants/urls';


function App() {
  return (
    <div>
  
        <Router>
              <HeaderMain/>
              <Switch>

              <Route path={editrecipeof(":id")}>
                  <Editrecipe/>
                </Route>

                <Route path={recipenew}>
                  <Createrecipe/>
                </Route>

                <Route path={recipebyid}>

                  <OneRecipe/>

                </Route>

                <Route path={recipeList}>

                        <Recipes/>

                </Route>

                <Route exact path={home}>
                  
                        <Myhome/>
                    
                  </Route>

              </Switch>
          
        </Router>


    </div>
    
  );
}

export default App;
