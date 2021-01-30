const Joi = require("joi")

const {findrecipes,findrecipesbyid,saverecipes,updateRecipe,deleteelementbyid} = require('../model/index')
const PhotoService = require("../services/photo-service")

const keywordsSchema = Joi.array().items(Joi.string().lowercase()).min(1).max(8)
const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(50).trim(),
  keywords: keywordsSchema,
  
})
const titleSchema = Joi.string().min(1).max(50).trim()


function validateRecipe(recipe) {
    const { error, value } = recipeSchema.validate(recipe)
    return { error, value }
}


function validateKeywords(keywords) {
    const { error, value } = keywordsSchema.validate(keywords)
    return { error, value }
}

function validatetitle(title) {
    const { error, value } = titleSchema.validate(title)
    return { error, value }
}

/*PRIMER USO DEL GET RECETAS SIN PAGINAR
function getallrecipes() {
    return findrecipes()
}
*/

//2*uso IMPLEMENTADA LA PAGINACION , para ello es fundamental pasarle 2 parametros (page,pagesize)
/*function getallrecipes({page, pagesize}) {
   const data = findrecipes()
   const pagedata = data.slice(page * pagesize,(page + 1) * pagesize);
   /*el slice pilla 2 parametros el comienzo de lectura y el final , en el comienzo damos la pagina*por el tamaño
   pongamos que es la 3  y el size es 10 , pues empezaria en el elemento 30  y page +1 por el tamaño
   seria 40 marcando el limite
   return {
    contents:pagedata,
    totalElements:data.length,
   }
}*/

/*En muchas ocasiones necesitamos repetir el uso del mismo codigo por lo que es mas adecuado crear
 una variable para ello y no copiar y pegar con los errores que puede probocar esto*/



//3 USO DEL GET MAS COMPLEJO Y CON PAGINACION 

 function getallrecipes({page, pagesize}) {
    const data = findrecipes()
    return paginate(data,page,pagesize)
 }

function getbyid(id) {
    return findrecipesbyid(id)
}

function getbytitle(title) {
  const recipes = findrecipes()
  return recipes.filter(recipe => recipe.title.includes(title))
}

/* 1 USO DEL FILTRADO POR KEYWORDS SIN PAGINAR 
function getbykeywords(keywords) {
    const recipes = findrecipes()
    return recipes.filter(recipe => recipe.keywords.some(keyword=>keywords.includes(keyword)))
}
*/


function getbykeywords(keywords,page,pagesize) {
    const recipes = findrecipes()
    const data = recipes.filter(recipe => recipe.keywords.some(keyword=>keywords.includes(keyword)))
  
    return paginate(data,page,pagesize)
}


 //funcion para implementar la paginacion 
 function paginate(data,page,pagesize) {
   
   const pagedata = data.slice(page * pagesize,(page + 1) * pagesize);
    
   return {
    contents:pagedata,
    totalElements:data.length,
    page:page,
    pagesize:pagesize,
   };
}

async function createrecipes(recipe){
    if (!recipe.photo) {
        recipe.photo = await PhotoService.generatePhotoUrlFromKeywords({ keywords: recipe.keywords })
      }
    return saverecipes(recipe)
}

function UpdateRecipe(id, fields) {
    return updateRecipe(id, fields)
}

function deletebyid(id) {
    return deleteelementbyid(id)
}

module.exports={
getallrecipes,
getbyid,
getbytitle,
getbyid,
getbykeywords,
UpdateRecipe,
createrecipes,
deletebyid,
validateKeywords,
validatetitle,
validateRecipe,
}