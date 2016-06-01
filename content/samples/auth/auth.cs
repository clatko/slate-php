/// Authenticate the user, if we have not already done so
/// The URL format for this request is: 
/// http://api.sample.org/oauth/token
/// with POST data in the format:
/// client_id={clientId}&client_secret={clientSecret}&grant_type=client_credentials
/// 
public bool AuthenticateUser()
{
  // Authenticates the user if: 
  //   b) we have no bearerToken (this is the first request) 
  //   c) the token is beyond or about to reach it's expiry time
  try
  {
    var authenticationUrl = string.Concat(BaseUrl, "/oauth/token");
    var authenticationParameters = new Dictionary<string, string>() 
    {
      { "client_id", clientId },
      { "client_secret", clientSecret },
      { "grant_type", "client_credentials" }
    };

    // Make Authentication POST Request to API
    var authenticationResponse = this.Post<ApiToken>(authenticationUrl, authenticationParameters);
    if (authenticationResponse == null)
    {
      throw new Exception("Authentication Failure");
    }

    // Store token and expiry values for later requests
    this.bearerToken = authenticationResponse.bearerToken;
    this.bearerTokenExpiryTime = authenticationResponse.ExpiryTime;
  }
  catch (Exception ex)
  {
    throw ex;
  }

  // Already authenticated
  return true;
}
