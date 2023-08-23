# CRAFT-DEMO

## Project setup

**Make sure to first install CORS plugin in your browser in order for requests to succeed**

To start both the client and server simultaneously, run the following command from the craft-demo directory:

```
npm run dev
```


### Future Implementation to Consider:

- navigation guards for routes
- expand database to include users, posts and comments tables (comments mapped to posts  mapped to users via ids)
- universal (isomorphic) app (client -> node server -> backend server) if was a larger application
- infinite scroll or pagination for comment api requests if expectation is that there is a lot of data 
- delete comments
- lazy loading of images
- login/signup with user authentication
- form validation
- error handling
- finish test cases