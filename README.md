# cloudflare-pages-react-hono-example

## requirements

- [bun](https://bun.sh/)
  

## install

```sh
bun i
```

## setup env

```sh
touch .dev.vars
```

And write your client_id & client_secret (Google OAuth/OIDC).

```txt
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
```

## db migration

```sh
bun drizzle:update
bun schema:apply
```


## lint & format

```sh
bun lint
bun format
```

## dev

```sh
bun dev
```