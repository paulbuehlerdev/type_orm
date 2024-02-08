# To run the demo

```shell
npm install
```

```shell
npm run start
```

Will create an encrypted DB in `./database/` adding one entry per run
- after that if you change the `encryptionKey` in the [data-source.ts](src/db/data-source.ts)
and re-run the app will see an error
- opening the DB in smth like SQLite Studio won't work as well
