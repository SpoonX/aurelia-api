export let settings = {
  baseUrls: {
    github: 'https://api.github.com/',
    api   : 'http://127.0.0.1:1927/',
    file  : './test/resources/'
  },
  criteria: {user: 'john', comment: 'last'},
  body: {message: 'some'},
  options: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer aToken'
    }
  },
  data: [{id: 0, user: 'john', comment: 'last'},
         {id: 1, user: 'john', comment: 'first'},
        {id: 2, user: 'jane'}]
};
