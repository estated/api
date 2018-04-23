# Real Estate API


### Usage

Build env:

```bash
make build
```

UP all in containers:
```bash
make dev
```

UP Node in host and deps in containers:
```bash
make start
```

Event to elastic
```bash
make event-consumer
```
```bash
make user-projections
```

### GraphQL example

`http://localhost:3001/graphiql`

**Get User**

```
{
  user(uuid: "efa48501-e187-4f17-9c71-3ea9cdb4e795"){
    email
    uuid
  }
}
```
**Get Users**

```
{
  users {
    email
    uuid
  }
}
```

**Create User**

```
mutation {
  createUser(uuid:"efa48501-e187-4f17-9c71-3ea9cdb4e795", email:"demo@demo.com")
}
```

### Tools

- Rabbit Admin: http://localhost:15672
- Kibana: http://localhost:5601 
