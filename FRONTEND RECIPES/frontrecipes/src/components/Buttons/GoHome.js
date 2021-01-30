import {
    BrowserRouter as Router,
    Switch,
    Link
  } from "react-router-dom";
import {home} from '../../constants/urls'
export const GoHomeButton = () => {

 

    return (
        <div className="xs50">
            
            <Link to={home}>
                <button>Atras</button>
            </Link>

        </div>
       
    )
   }