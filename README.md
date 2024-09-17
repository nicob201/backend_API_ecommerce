# API E-commerce

El presente repositorio contiene el codigo Backend de una API de una tienda online de productos electrónicos

## Instalación

Clona este repositorio:

```bash
git clone https://github.com/nicob201/backend_API_ecommerce.git
```

## Configuración y aclaraciones pertinentes

Crea el archivo `.env.development` para configurar la base de datos según el entorno que se desee utilizar, ten en cuenta las siguientes variables de entorno:

```bash
MONGO_URL=
PORT=8080
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MAILING_EMAIL=
MAILING_PASSWORD=
TEST_MODE=true
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_BASE_URL=http://localhost:8080/api
```

### La API se encuentra documentada utilizando Swagger, se puede ver dicha documentación en el siguiente [enlace](http://localhost:8080/api/docs/#/). (correr local)

### Se deja precargado en la base de datos un usuario "ADMIN" con los siguientes datos:

- email: admin@gmail.com

- password: 123

En caso de querer cambiar de rol un usuario de "user" a "admin", es necesario subir 3 archivos (cualquier archivo) en el endpoint (POST):

- http://localhost:8080/api/users/:uid/documents

(Pasar por body un "form-data" con los 3 documents)

## Ejecución de la API

Instala las librerías y dependencias necesarias del proyecto:

```bash
npm install
```

Corre el siguiente comando en la terminal, luego de instalar las dependencias necesarias de la API:

```bash
npm start
```
## Modulos de Test

Corre los módulos de test de la API con el siguiente comando:

```bash
npm test
```

# Deployment

### El proyecto se encuentra subido a Railway, corriendo en la siguiente [URL](https://backendapiecommerce-production.up.railway.app)

# Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- MongoDB
- Handlebars
- HTML5
- CSS3
- Passport
- Stripe