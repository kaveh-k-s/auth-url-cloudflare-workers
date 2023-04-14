addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Define what URLs each user can connect
 * Also you can use multiple users for one URL like the first line (endpoint1)
 */
async function handleRequest(request) {
  const urlsToPass = [  
    { url: 'https://example.com/endpoint1/*', usernames: ['user1', 'user2'] },
    { url: 'https://example.com/endpoint2/*', usernames: ['user3'] },
  ];

  const requestedUrl = new URL(request.url);

  // Check if the requested URL matches any of the URLs to pass
  const authorization = request.headers.get('authorization')
  if (!authorization) {
    return getUnauthorizedResponse(
      'Provide User Name and Password to access this page.',
    )
  }
  const credentials = parseCredentials(authorization)
  
  const urlMatch = urlsToPass.find(url => {
    const regex = new RegExp('^' + url.url.replace('*', '.*') + '$');
    return regex.test(requestedUrl.href) && url.usernames.includes(credentials[0]);
  });

  if (urlMatch) {
    // If the requested URL matches one of the URLs to pass, check if the user is authorized
    const authorized = checkAuthorization(urlMatch.usernames, credentials[1])
    if (!authorized) {
      return getUnauthorizedResponse(
        'The User Name and Password combination you have entered is invalid.',
      )
    }
    return await fetch(requestedUrl.href, request);
  } else {
    // If the requested URL does not match any of the URLs to pass, redirect to a different URL
    return Response.redirect('https://example.com', 301);
  }
}

/**
 * Check if the provided credentials match any of the authorized credentials
 * @param {string[]} usernames
 * @param {string} password
 * @returns {boolean}
 */
function checkAuthorization(usernames, password) {
  const authorizedCredentials = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' },
  ];
  return usernames.some(username =>
    authorizedCredentials.some(creds => creds.username === username && creds.password === password)
  );
}

/**
 * Break down base64 encoded authorization string into plain-text username and password
 * @param {string} authorization
 * @returns {string[]}
 */
function parseCredentials(authorization) {
  const parts = authorization.split(' ')
  const plainAuth = atob(parts[1])
  const credentials = plainAuth.split(':')
  return credentials
}

/**
 * Helper funtion to generate Response object
 * @param {string} message
 * @returns {Response}
 */
function getUnauthorizedResponse(message) {
  let response = new Response(message, {
    status: 401,
  })
  response.headers.set('WWW-Authenticate', `Basic realm="${REALM}"`)
  return response
}

/**
 * @param {string} REALM A name of an area (a page or a group of pages) to protect.
 * Some browsers may show "Enter user name and password to access REALM"
 */
const REALM = 'Secure Area';