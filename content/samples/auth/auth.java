private static final String HOST = "https://api.sample.org";
private static final String VERSION_HEADER = "application/vnd.org.sample-1+json";

public static void main(String args[]) {
  String testClientId = args[0];
  String testSecret = args[1];

  CloseableHttpClient http = HttpClients.createDefault();
  JSONParser parser = new JSONParser();

  // Get access token using client ID and secret.
  String url = HOST + "/oauth/token";
  HttpPost httpPost = new HttpPost(url);
  httpPost.addHeader("Accept", VERSION_HEADER);

  List<NameValuePair> params = new LinkedList<NameValuePair>();
  params.add(new BasicNameValuePair("client_id", testClientId));
  params.add(new BasicNameValuePair("client_secret", testSecret));
  params.add(new BasicNameValuePair("grant_type", "client_credentials"));
  String accessToken = null;

  try {
    httpPost.setEntity(new UrlEncodedFormEntity(params));
    CloseableHttpResponse r = http.execute(httpPost);
    System.out.println("POST " + url + " => " + r.getStatusLine());

    HttpEntity e = r.getEntity();
    String response = EntityUtils.toString(e);
    JSONObject json = (JSONObject) parser.parse(response);
    System.out.println(json.toJSONString());

    // Get the access token.
    accessToken = (String) json.get("access_token");
  }
  catch (Exception e) {
    System.out.println("Failed to get access token with POST " + url + ": " + e.getMessage());
    System.exit(1);
  }

  // Use the access token to get data from an endpoint.
  url = HOST + "/endpoint";
  HttpGet httpGet = new HttpGet(url);
  httpGet.addHeader("Authorization", "Bearer " + accessToken);
  httpGet.addHeader("Accept", VERSION_HEADER);

  try {
    CloseableHttpResponse r = http.execute(httpGet);
    System.out.println("\nGET " + url + " => " + r.getStatusLine());

    HttpEntity e = r.getEntity();
    String response = EntityUtils.toString(e);
    JSONArray json = (JSONArray) parser.parse(response);
    System.out.println(json.toJSONString());
  }
  catch (Exception e) {
    System.out.println("Failed to get programs with GET " + url + ": " + e.getMessage());
    System.exit(1);
  }
}
