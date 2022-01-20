
const list = [{
    'Table':'rms_ingredients',
    'Validate': ['id','id_rms_recipe','line'],
    'Create': [
    'id INT AUTO_INCREMENT PRIMARY KEY'
    ,'id_rms_recipe INT NOT NULL'
    ,'line VARCHAR(250) NOT NULL'
    ],
    'Insert': "INSERT INTO rms_ingredients (id,id_rms_recipe,line) VALUES "
    +"(null,1,'1Kg de Azucar'),"
    +"(null,1,'1/2 Docena de Huevos'),"
    +"(null,1,'50g de Mantequilla'),"
    +"(null,1,'1Kg de Harina de Trigo'),"
    +"(null,2,'4 Bistec'),"
    +"(null,2,'3 Limones'),"
    +"(null,2,'2 Cebollas Blancas'),"
    +"(null,3,'1 Cebolla'),"
    +"(null,3,'20g de Lechuga'),"
    +"(null,3,'1 Pote de Mayonesa'),"
    +"(null,3,'2 Tomates'),"
    +"(null,4,'1Kg de Pollo'),"
    +"(null,4,'5g Especias'),"
    +"(null,5,'1Kg de Papas'),"
    +"(null,5,'1L de Aceite Vegetal'),"
    +"(null,6,'2 Tazas de Arroz'),"
    +"(null,6,'4 Tazas de Agua'),"
    +"(null,7,'1kg Migas de Pan'),"
    +"(null,8,'1 Huevo'),"
    +"(null,8,'1ml de Aceite Vegetal'),"
    +"(null,9,'1Kg de Arroz'),"
    +"(null,9,'2 Tazas de Onoto'),"
    +"(null,9,'1/2Kg de Chorizo'),"
    +"(null,10,'1Kg de Harina de Trigo'),"
    +"(null,10,'1/4L Salsa para Pasta'),"
    +"(null,10,'350mg de Queso'),"
    +"(null,11,'5 Pan de Hamburgesa'),"
    +"(null,11,'1Kg de Carne'),"
    +"(null,11,'1/4 de Queso'),"
    +"(null,11,'1 Bote de Salsa de Tomate')"
    ,'Ini': false  
    },
    { 
    'Table':'rms_recipes',
    'Validate': ['id','label','totalTime','image'],
    'Create': [
    'id INT AUTO_INCREMENT PRIMARY KEY'
    ,'label VARCHAR(200) NOT NULL'
    ,'totalTime INT NOT NULL'
    ,'image VARCHAR(200) NOT NULL'
    ],
    'Insert': "INSERT INTO rms_recipes (id,label,totalTime,image) VALUES "
    +"(null,'Pastel',1600,'/resources/recipes/image1.jpg'),"
    +"(null,'Carne',800,'/resources/recipes/image2.jpg'),"
    +"(null,'Ensalada',1170,'/resources/recipes/image3.jpg'),"
    +"(null,'Pollo',6400,'/resources/recipes/image4.jpg'),"
    +"(null,'Papas Fritas',1600,'/resources/recipes/image5.jpg'),"
    +"(null,'Arroz',1600,'/resources/recipes/image6.jpg'),"
    +"(null,'Migas',2400,'/resources/recipes/image7.jpg'),"
    +"(null,'Huevos Fritos',800,'/resources/recipes/image8.jpg'),"
    +"(null,'Paella',1200,'/resources/recipes/image9.jpg'),"
    +"(null,'Pizza',3600,'/resources/recipes/image10.jpg'),"
    +"(null,'Hamburgesa',1900,'/resources/recipes/image11.jpg')",
    'Ini': false  
}]

module.exports = list;