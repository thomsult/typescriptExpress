# Typescript Express - Prisma - SQLlite

### Built With
* [ExpressJS](https://expressjs.com/)
* [Argon2](https://www.npmjs.com/package/argon2)
* [Prisma](https://www.prisma.io)


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
2. Install NPM packages
```sh
npm install
```
3. Copy `.env.sample` to `.env` , add you credencial and Local PORT

4. Run Migrate
```sh
npx prisma migrate dev

```
4. Run Project
```sh
npm run dev

```
### Usage

**no Frontend!!**

<details><summary><b>End Point</b></summary>

Login
```sh
http://localhost:PORT/api/Login

```
Register
```sh
http://localhost:PORT/api/Register
```

**End Point Protected by Token!!**

Users
```sh
http://localhost:PORT/api/Users

```
DeleteUserByID
```sh
http://localhost:PORT/api/Users/:id

```
</details>

## License

MIT © Thomsult
