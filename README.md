# UriGames

## [See the App!](https://urigames.netlify.app)

![App Logo](./src/assets/images/logo-page.png)

## Descripción

**NOTA -** UriGames es una base de datos de juegos de mesa donde puedes almacenar tus propios juegos, vrearlos y añadirlos a tu colecció de favoritos.
#### [Repositorio del Clientee](https://github.com/RoigOriol/Urigames-client.git)
#### [Repositorio del Servidor](https://github.com/RoigOriol/Urigames-server.git)

## Tecnologías y librerías 


**Tecnologías**
- HTML
- CSS
- Javascript
- React
- React-router-dom
- Node


**Librerías**
- React Bootstrap

# Client Structure

## Acciones del usuario
Todas las acciones que un usuario puede realizar en la aplicación:

- **404** - Página de Not Found.
- **500** - Página de error.
- **homepage** - Página principal de la app.
- **abaoutpage** - Página con infromación del creador de la página.
- **useerprofile** - Página de perfil de un usuario.
- **gamelist** - Página donde se muestran todos los juegos almacenados en la DB.
- **gamedetails** - Página donde se muestran los detalles de cada juego.
- **loginpage** - Página de logeo.
- **signuppage** - Página de registro.
- **gameeditionpage** - Página de edición de un juego.
- **gamecreationpage** - Página de creación de un juego.



## Rutas del Cliente

## React Router Routes (React App)

# Rutas de la Aplicación

La siguiente tabla describe las rutas configuradas en la aplicación, junto con las páginas, componentes, permisos y el comportamiento esperado.

| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | --------------- | ----------------- | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | Public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | Anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                   | Anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         | EditProfile       | User only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/games/list`             | GameList        | AddGame, GameCard | User only `<IsPrivate>`  | Shows all films on backlog                                    |
| `/games/edit`             | GamesEdit       |                   | User only `<IsPrivate>`  | Shows all games on backlog                                    |
| `/games/favourites`       | FavouriteList   | GameCard          | User only `<IsPrivate>`  | Shows all games on backlog                                    |
| `/login`                  | Login           |                   | Public                   | Login page                                                    |
| `/signup`                 | Signup          |                   | Public                   | Signup page                                                   |
| `*`                       | NotFoundPage    |                   | Public                   | 404 Not Found page                                            |
| `/error`                  | ErrorPage       |                   | Public                   | Error page                                                    |
| `/about`                  | AboutPage       |                   | Public                   | About page                                                    |
| `/not-found`              | NotFoundPage    |                   | Public                   | 404 Not Found page                                            |
| `/collaborators`          | Collaborators   |                   | Public                   | Collaborators page                                            |
| `/games`                  | GameList        |                   | User only `<OnlyPrivate>`| Game list page                                                |
| `/games/:id`              | GameDetails     |                   | User only `<OnlyPrivate>`| Game details page                                             |
| `/games/create`           | GameCreation    |                   | Admin only `<AdminPrivate>`| Game creation page                                            |
| `/games/:id/edit`         | GameEdition     |                   | Admin only `<AdminPrivate>`| Game edition page                                             |
| `/user/:id`               | UserProfile     |                   | User only `<OnlyPrivate>`| User profile page                                             |

## Permisos

- **Public**: La página es accesible para cualquier usuario.
- **Anon only `<IsAnon>`**: La página es accesible solo para usuarios no autenticados (anónimos).
- **User only `<IsPrivate>`**: La página es accesible solo para usuarios autenticados.
- **Admin only `<AdminPrivate>`**: La página es accesible solo para usuarios con permisos de administrador.

## Componentes

- **Home**: Componente de la página de inicio.
- **Signup**: Componente del formulario de registro.
- **Login**: Componente del formulario de inicio de sesión.
- **EditProfile**: Componente para editar el perfil del usuario.
- **GameList**: Componente que muestra la lista de juegos.
- **AddGame**: Componente para agregar un nuevo juego.
- **GameCard**: Componente que muestra información resumida de un juego.
- **GamesEdit**: Componente para editar juegos.
- **FavouriteList**: Componente que muestra la lista de juegos favoritos.
- **NotFoundPage**: Componente que muestra la página de error 404.
- **ErrorPage**: Componente que muestra la página de error general.
- **AboutPage**: Componente que muestra información sobre la aplicación.
- **Collaborators**: Componente que muestra la lista de colaboradores.
- **GameDetails**: Componente que muestra los detalles de un juego específico.
- **GameCreation**: Componente para la creación de un nuevo juego.
- **GameEdition**: Componente para la edición de un juego existente.
- **UserProfile**: Componente que muestra el perfil del usuario.

## Comportamiento

Cada ruta tiene un comportamiento específico, como la redirección a la página de inicio después de iniciar sesión o registrarse, o la expiración de la sesión del usuario después de cerrar sesión.

## Other Components

- MyNavbar
- Footer
- Comment
- CommentItem
- Footer
- FormComments
- OnlyPrivate
  
  ## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - game.filter(type, status)
  - game.detail(id)
  - game.add(id)
  - game.delete(id)
  - game.update(id)
  
- External API
  - gameApi.details
  - gameApi.list
  
## Context

- auth.context
- theme.context
## Links

### Creador

[Oriol Roig](https://github.com/RoigOriol)

### Project

[Repository Link Client](https://github.com/RoigOriol/Urigames-client.git)

[Repository Link Server](https://github.com/RoigOriol/Urigames-server.git)

[Deploy Link](https://urigames.netlify.app)


### Slides

[Slides Link]()