<h1 id="authentication">Authentication</h1>

<!-- curl -->
<blockquote>
	<p class="highlight curl">A developer client makes a request to the POST oauth/token endpoint with the client key, client secret, and the "client_credentials" grant type.</p>
</blockquote>
<pre><code class="highlight curl">curl -X POST -d <span class="s2">"client_id=&lt;client_id>&client_secret=&lt;client_secret>&grant_type=client_credentials" "https://api.sample.org/oauth/token"</span></code></pre>
<blockquote>
	<p class="highlight curl">If authentication passes, a response with the access_token is passed back.</p>
</blockquote>
<pre><code class="highlight curl"></span><span class="p">{</span><span class="w">
    </span><span class="s2">"access_token"</span><span class="p">:</span><span class="w"> </span><span class="mi">"2f1f4f2a-10e6-49b8-9e36-e1f182a23416"</span><span class="p">,</span><span class="w">
    </span><span class="s2">"token_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"bearer"</span><span class="p">,</span><span class="w">
    </span><span class="s2">"expires_in"</span><span class="p">:</span><span class="w"> </span><span class="s2">43187</span><span class="p">,</span><span class="w">
    </span><span class="s2">"scope"</span><span class="p">:</span><span class="w"> </span><span class="mi">"read write"</span><span class="w">
</span><span class="p">}</span></code></pre>
<blockquote>
	<p class="highlight curl">With the access token, the client sends the bearer token in the header to access the API resource.</p>
</blockquote>
<pre><code class="highlight curl">curl -H <span class="s2">"Authorization: Bearer 2f1f4f2a-10e6-49b8-9e36-e1f182a23416" "https://api.sample.org/sample/endpoint"</span></code></pre>
<!-- /curl -->

<!-- javascript -->
<blockquote>
	<p class="highlight javascript">Using jQuery, a simple JavaScript OAuth invocation looks like:</p>
</blockquote>
<?
$path = SAMPLE_DIR.'auth/auth.js';
$content = file_get_contents($path);
$content = $displayObj->prettyPrint($content, 'javascript');
echo '<pre><code class="highlight javascript">'.$content.'</code></pre>'."\n";
?>
<!-- /javascript -->

<!-- node -->
<blockquote>
	<p class="highlight node">Node example is not available.</p>
</blockquote>
<!-- /javascript -->

<p>We provide OAuth2 authentication. More specifically, application-only authentication, otherwise known as the client credentials grant. Steps involved: the developer sends a request with their &lt;client_key> and &lt;client_secret> and receives in the response a bearer token, this token is used in subsequent requests. Tokens will expire after 60 days, at which time the client must re-authenticate.</p>
<h3>Keep in mind the following when using OAuth 2:</h3>
<ul>
	<li>Bearer tokens are passwords, keep them confidential. Developers should not store their client_id and/or client_secret on user devices.</li><br/>
	<li>Bearer tokens expire after 60 days. You will need to re-authenticate to receive a new token. Ideal implementations would respond to authentication failure with a new bearer token request.</li><br/>
	<li>SSL is required. Port 80 is turned off for this authentication process.</li><br/>
	<li>Connections are stateless, you must send your token on every request.</li><br/>
	<li>Currently tokens cannot be refreshed, nor invalidated. We will be adding invalidation shortly.</li><br/><br/>
</ul>

<p><aside class="notice">
You must replace <code class="prettyprint">&lt;client_id></code> with your application key and &lt;client_secret> with your application secret.
</aside></p>
