var  base_endpoint = 'https://api.sample.org';

$.post( 
  base_endpoint + '/oauth/token',  
  {
    'client_id'   :  '{clientId}',
    'client_secret' :  '{clientSecret}',
    'grant_type'  :  'client_credentials'
  }, 
  function( data ) { 

  // response {access_token: ..., token_type: "bearer", 
  // expires_in: 3204307, scope: "read write"} 

  // set up the authentication header for all requests from now on
  $.ajaxSetup({
    headers: { 
      'Authorization': 'Bearer ' + data.access_token,
      'Accept': 'application/vnd.org.sample-1.1+json'
    }
  });
  // do stuff
  }
);
