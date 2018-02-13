## iniciar replica set en mongo

`npm run start:db1`

`npm run start:db2`

`npm run start:db3`

`mongo --port 27017`

`rs.initiate({_id : "rs0",members: [{ _id: 0, host: "127.0.0.1:27017" },{ _id: 1, host: "127.0.0.1:27018" },{ _id: 2, host: "127.0.0.1:27019"}]})`