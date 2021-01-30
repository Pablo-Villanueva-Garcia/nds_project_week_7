
const {Router} = require ('express');
const router  = Router ();

const {getallrecipes,getbyid,getbytitle,getbykeywords,UpdateRecipe,createrecipes,deletebyid,validateKeywords ,validatetitle,validateRecipe} = require('../services/index');



const isInt = text => !isNaN(parseInt(text));

router.get("/", (req, res) => {


    if (req.query.keywords) {
        const page= parseInt(req.query.page || 0);
        const pagesize= parseInt(req.query.pagesize || 10);
        const keywords = req.query.keywords.split(",")
        const { error, value } = validateKeywords(keywords)
        if (error) {
        res.status(400).json({ error: error.message })
        return
        }
        
        const recipes = getbykeywords(value,page,pagesize) 
        res.status(200).json(recipes)
        return
    }
 
    if (req.query.title) {
        const title = req.query.title
        const { error, value } = validatetitle(title)
        if (error) {
        res.status(400).json({ error: error.message })
        return
        }
        const recipes = getbytitle(value) 
        res.status(200).json(recipes)
        return
    }
    


      const page= parseInt(req.query.page || 0);
      const pagesize= parseInt(req.query.pagesize || 10);

        if(!isInt(page) || page < 0){
            res.status(400).json({"messsage":"la página no debe ser un número no negativo"})
            return
        }
        if(!isInt(pagesize) || page < 0){
            res.status(400).json({"messsage":"el tamaño de página no debe ser un número no negativo"})
            return
        }
        const recipes = getallrecipes({
        page,
        pagesize,
        })
        res.status(200).json(recipes)
        return



})



router.get('/:id',(req,res)=>{
   
    const recipesbyid = getbyid(req.params.id)
    res.status(200).json(recipesbyid)
   
});


router.post('/', async (req,res)=>{
    const { error, value } = validateRecipe(req.body)
    if (error) {
        res.status(400).json({ error: error.message })
        return
        }
    const recipe = await createrecipes(value)
    
    res.status(201).json(recipe)
});


router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const recipe = UpdateRecipe(id, req.body)
    res.status(201).json(recipe)
});


router.delete("/:id",(req,res)=>{
    deletebyid(req.params.id)
    res.status(204).end();
});


module.exports=router;