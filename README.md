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

## External DB Access

The DB uses sqleet (ChaCha20-Poly1305) encryption by default. So to open it externally there are a few configurations
needed.

### SQLite Studio

- Select ```WxSQLite 3``` as the database type
- For Cipher use ```ChaCha20-Poly1305```

### Datagrip / IntelliJ Plugin

- There is some info in this thread. But it has to be adjusted to work for the ChaCha20
  encryption: https://intellij-support.jetbrains.com/hc/en-us/community/posts/360007633799-How-to-open-SQLCipher-passwrd-protected-file-in-Datagrip
- Add a new driver from https://github.com/Willena/sqlite-jdbc-crypt/releases
- If necessary also download slf4j: https://mvnrepository.com/artifact/org.slf4j/slf4j-api
- You can add this as URL template:
    - | name | template |
                      | --- | --- |
      | default | ```jdbc:sqlite:{file}``` |
- All other settings can be left as is
- Use this driver for the datasource. Specify the encryption key in **Advanced** in the property **key**. Leave all
  other properties empty. ChaCha20 is used as cipher by default.
- Alternatively the key can also be specified in the url like ```jdbc:sqlite:{file}?key={key}```