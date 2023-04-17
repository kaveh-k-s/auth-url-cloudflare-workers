# Authorization Middleware for URLs With Cloudflare Workers (with username and password)

This code provides a basic authorization middleware for URLs using Cloudflare Workers. It allows you to define which URLs are accessible by which users, and restrict access to unauthorized users. You can also use multiple users for one URL.

<!-- ABOUT THE PROJECT -->
## About The Project

How it Works :
The code listens for the 'fetch' event and responds with the result of the handleRequest function. The handleRequest function checks if the requested URL matches any of the URLs defined in the urlsToPass array, and if the user is authorized to access the URL based on the provided credentials. If the requested URL matches one of the URLs to pass and the user is authorized, the request is passed through to the requested URL. If the requested URL does not match any of the URLs to pass, the request is redirected to a different URL.

<!-- USAGE -->
## Usage
To begin, please create a new worker in your account. For instance, here i used "auth-website" for my worker.

![Make Worker](/assets/images/Image-1.png)

Next, click on "Quick Edit" and copy all the codes from "auth-url-cloudflare-workers.js" to your worker. Then click on "Save and Deploy" after making the changes.

![Deploy Worker](/assets/images/Image-2.png)

Then, navigate to your domain in Cloudflare and click on "Workers Routes".

![Cloudflare Domain](/assets/images/Image-3.png)

Add a new route by clicking on "Add Route" and enter your domain name. Select the Cloudflare worker that you created earlier and save the settings.

![Add Route](/assets/images/Image-4.png)

Lastly, you will need to make some changes in the worker codes as I explain in the following section.

<!-- CHANGES -->
## What you need to change ?
Define the URLs that you want to restrict access to and the usernames that are authorized to access them in the urlsToPass array in the handleRequest function. You can use wildcard * to define URL patterns.
You need to change these codes in your cloudflare worker
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

Deploy the Cloudflare Worker with the updated code.

<!-- EXTRA INFORMATION -->
## Extra information
Customize the realm name in the REALM constant, which is used in the getUnauthorizedResponse function to generate the WWW-Authenticate header for unauthorized requests.
```sh
const REALM = 'Secure Area';
```

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTRIBUTING -->
## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
