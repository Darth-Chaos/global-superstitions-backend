# Uso de la Plataforma

Este backend está construido gracias a librerías y frameworks como NestJS para la creación del backend como tal, o Mongoose el cual es un ORM que ayudó a la conexión con la base de datos de MongoDB, además de otras librerías que ayudaron a realizar los procesos de validación y verificación de los datos ingresados al API construida.

## Instalación

Para esto, solo es necesario descargar una copia (ya sea mediante clonación con Git o mediante descarga directa). Después instalar las librerías necesarias para utilizar el proyecto.

```bash
$ npm install
```

Por último, para correr el proyecto, solo es necesario:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

**Nota:** No se ha probado la versión de producción, por lo que, el proyecto actualmente no está destinado a esto, sino a algo más bien académico y demostrativo de como crear una conexión a una base de datos MongoDB usando la arquitectura modular en un modelo de 3 capas.

**Nota:** Para más conocimiento en todas las librerías y Framworks utilizados, además de documentación, por favor, remitirse a la [página de NestJS](https://docs.nestjs.com).

## Manejo y Explicación

Para el manejo de esta API fueron creados 5 endpoints, los cuales sirven para explicar directamente como se emplea un CRUD en _MongoDB_ utilizando _NestJS_.

**Nota:** Cabe aclarar que todos los llamados aquí utilizados pueden ser modificados para integrar otras funcionalidad como busquedas puntuales, ordenamiento, filtros, etc., con el fin de enriquecer las queries realizadas en MongoDB, además, en medio de su modificación en el servicio, estás funciones pueden ser utilizadas muy similar a como serían sus homologas en MongoDB.

### Create

Utilizando el llamado ```/api/v1/superstitions/create``` se podrá crear un nuevo documento dentro de la base de datos.

_Ejemplo de petición create dentro del entorno del backend_

```bash
curl --location 'http://localhost:3000/api/v1/superstitions/create' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Romper un espejo",
    "description": "Se dice que romper un espejo trae siete años de mala suerte.",
    "positive_effect": false,
    "origin_date": "1800-01-01",
    "region": {
      "name": "Europa Occidental",
      "country": { "name": "Francia" }
    },
    "cults": [
      { "name": "Creyentes en la mala suerte" },
      { "name": "Grupos supersticiosos medievales" }
    ],
    "events": [
      {
        "name": "Espejo roto en una boda",
        "description": "Un espejo se rompió accidentalmente en una ceremonia.",
        "event_date": "1905-05-20"
      }
    ],
    "sources": [
      {
        "title": "Historia de la superstición",
        "author": "John Smith",
        "cite": "Capítulo 3, página 45",
        "url": "http://example.com/supersticiones"
      }
    ]
}'
```

Este comando tiene el siguiente equivalente como query de MongoDB:

```js
db.collection.insertOne({
  "name": "Romper un espejo",
    "description": "Se dice que romper un espejo trae siete años de mala suerte.",
    "positive_effect": false,
    "origin_date": "1800-01-01",
    "region": {
      "name": "Europa Occidental",
      "country": { "name": "Francia" }
    },
    "cults": [
      { "name": "Creyentes en la mala suerte" },
      { "name": "Grupos supersticiosos medievales" }
    ],
    "events": [
      {
        "name": "Espejo roto en una boda",
        "description": "Un espejo se rompió accidentalmente en una ceremonia.",
        "event_date": "1905-05-20"
      }
    ],
    "sources": [
      {
        "title": "Historia de la superstición",
        "author": "John Smith",
        "cite": "Capítulo 3, página 45",
        "url": "http://example.com/supersticiones"
      }
    ]
})
```

## Read

Para la lectura fueron habilitados 2 endpoints, uno para lectura singular de documentos (1 doc) y otro para la traida de varios documentos a la vez.

### Lectura Singular

_Lectura de un documento por ID gracias al API_

```bash
curl --location 'http://localhost:3000/api/v1/superstitions/673be8fc35484fe1b96b81f9'
```

_Ejecución en MongoDB_

```js
db.collection.findOne(
  {},
  { _id: 673be8fc35484fe1b96b81f9 }
)
```

### Lectura Plural

_Lectura de un muchos documentos por ID gracias al API_

```bash
curl --location 'http://localhost:3000/api/v1/superstitions?sort_by_date=true'
```

_Ejecución en MongoDB_

```js
db.collection.find().sort({ origin_date: 1 })
```

## Update

Para la actualización fue habilitado un endpoint, el cual actualiza y retorna un objeto según el ID enviado.

_Actualización del documento en el API_

```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/superstitions/update/id/673be725c85e9281d809e4c2' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Ejemplo actualizado 1"
}'
```

_Ejecución en MongoDB_

```js
db.collection.findOneAndUpdate(
  { _id: 673be725c85e9281d809e4c2 },
  { $set: {
    "name": "Ejemplo actualizado 1"
  }}
)
```

## Delete

Para el borrado fue habilitado un endpoint, el cual elimina y retorna un objeto según el ID enviado. 

_Actualización del documento en el API_

```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/superstitions/delete/id/673beb90d68ea23ef9afc3d5'
```

_Ejecución en MongoDB_

```js
db.collection.findOneAndDelete(
  { _id: 673be725c85e9281d809e4c2 }
)
```

Cabe aclarar, de nuevo, que los métodos utilizados por el ORM Mongoose permiten realizar todo tipo de filtros y cambios que se requiran, con lo que, esto aquí mostrado puede ser fácilmente modificado (o pueden ser anexionados nuevos endpoints) que requieran un manejo un poco más complejo en cuanto a las requests.
