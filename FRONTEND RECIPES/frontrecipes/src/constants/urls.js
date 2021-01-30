//Archivo de const con las urls para aguilizar la programacion 
export const home = '/';
export const recipeList = '/recipes';
export const recipebyid = '/recipes/:id';
export const recipenew = '/recipes/new';
export const recipeof = id => '/recipes/'+ id;
export const editrecipeof = id => '/recipes/'+ id +"/edit";