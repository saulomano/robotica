# robotica

## repositorio con fuentes para dte-robotica


Copiar y editar el archivo server/config/secret.example.js -> server/config/secret.js con las variables correspondientes

example 
return {
		SESSION_SECRET: 'topsecretvalue',
		GOOGLE_ID: '299184294912-brobthjfk22ulqumiero4mnjliidj558.apps.googleusercontent.com',
		GOOGLE_SECRET: 'ltdG9JPiffyn_DSQh3RccZe3'
	};
  
  
  proyect gulp build , gulp serve
  
  
  
  Import json de escuelas a base de datos 
  Tomar el archivo escuelas.json y ejecutar el comando
  mongoimport --db robotica-dev --collection colegios --type json --file schools.json --jsonArray

