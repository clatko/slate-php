curl -X POST -d "client_id=&lt;client_id>&client_secret=&lt;client_secret>&grant_type=client_credentials" "https://api.sample.org/oauth/token"


{  
  "access_token":"2f1f4f2a-10e6-49b8-9e36-e1f182a23416",
  "token_type":"bearer",
  "expires_in":43187,
  "scope":"read write"
}


curl -H "Authorization: Bearer 2f1f4f2a-10e6-49b8-9e36-e1f182a23416" "https://api.sample.org/sample/endpoint"
