https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows

`computer: mechhome`

`username: postgres`

`password:nkunku12`

`port: 5432`



* Updated Tasks /- update the serve command
* update the load env.files for development


yarn add pg

graphql example
{
  getUsers{
    id
    firstName
    email
  
   
  }
  getPets {
    id
    name
    owner {
      id
    }
  }
}
