# Node-ApiRest

Se incluye el código fuente usado para crear la api en javascript (node), dentro de la carpeta "mutant" esta el método creado para saber si un adn es mutante o humano, y de igual forma en la carpeta stats incluye la logiuca necesaria. A cerca de la conexión al sql, este se encuentra en la carpeta Connection; y se subió la base de datos en un rds de aws (los scripts se encuentran en la carpeta "base de datos"). Para ejecutar la api se puede invocar de la siguiente manera usando postman:

1- Para saber si el adn es de un humano o mutante: 
url: https://qa9xre12nh.execute-api.us-east-2.amazonaws.com/Stage1HumanMutant/mutant 
método :post 
body: { "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

si es mutante responderá: 
status: 200 
error:false 
mensaje: "Es mutante"

si es humano responderá: 
status: 403 
error:false 
mensaje:"Es humano"

si la estructura del array no es correcta o contiene valores diferentes a (TACG) responderá:
status: 400
error: true
mensaje:The input dna is invalid, please check that the structure of array is correct or if only has ATGC letters

2- Para consultar las estadisticas de las verificaciones de ADN:
url: https://qa9xre12nh.execute-api.us-east-2.amazonaws.com/Stage1HumanMutant/stats
método: get

responderá por ejemplo:

{ "count_mutant_dna": 8, "count_human_dna": 5, "ratio": 0.625 }
