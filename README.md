# Authorization Middleware for URLs With Cloudflare Workers (with username and password)

This code provides a basic authorization middleware for URLs using Cloudflare Workers. It allows you to define which URLs are accessible by which users, and restrict access to unauthorized users. You can also use multiple users for one URL.

<!-- ABOUT THE PROJECT -->
## About The Project

How it Works :
The code listens for the 'fetch' event and responds with the result of the handleRequest function. The handleRequest function checks if the requested URL matches any of the URLs defined in the urlsToPass array, and if the user is authorized to access the URL based on the provided credentials. If the requested URL matches one of the URLs to pass and the user is authorized, the request is passed through to the requested URL. If the requested URL does not match any of the URLs to pass, the request is redirected to a different URL.

<!-- USAGE -->
## Usage
Add the following code to your Cloudflare Worker script:
```sh
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Authorization logic here
}
```

<!-- CHANGES -->
## What you need to change ?
Define the URLs that you want to restrict access to and the usernames that are authorized to access them in the urlsToPass array in the handleRequest function. You can use wildcard * to define URL patterns.
```sh
const urlsToPass = [  
  { url: 'https://example.com/endpoint1/*', usernames: ['user1', 'user2'] },
  { url: 'https://example.com/endpoint2/*', usernames: ['user3'] },
];
```
Customize the authorized usernames and passwords in the authorizedCredentials array in the checkAuthorization function.
```sh
const authorizedCredentials = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' },
];
```
Define the URL that you want to redirect user if a user doesn't have permission to access that specific url
```sh
 return Response.redirect('https://example.com', 301);
```

<!-- EXTRA INFORMATION -->
## Extra information
Customize the realm name in the REALM constant, which is used in the getUnauthorizedResponse function to generate the WWW-Authenticate header for unauthorized requests.
```sh
const REALM = 'Secure Area';
```
Deploy the Cloudflare Worker with the updated code.

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTRIBUTING -->
## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
