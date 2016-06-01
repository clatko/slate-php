<h2 id="headers">Headers</h2>

<blockquote>
	<p>An example header:</p>
</blockquote>

<pre><code class="highlight plain"><span class="gd"><</span> <span class="s2">HTTP/1.1 200 OK</span>
<span class="gd"><</span> <span class="s2">Access-Control-Allow-Credentials:</span> <span class="p">true</span>
<span class="gd"><</span> <span class="s2">Access-Control-Allow-Headers:</span> <span class="p">authorization,accept</span>
<span class="gd"><</span> <span class="s2">Access-Control-Allow-Methods:</span> <span class="p">POST,GET,PUT,DELETE,OPTIONS,HEAD</span>
<span class="gd"><</span> <span class="s2">Access-Control-Max-Age:</span> <span class="p">3600</span>
<span class="gd"><</span> <span class="s2">Cache-Control:</span> <span class="p">max-age=3600, must-revalidate</span>
<span class="gd"><</span> <span class="s2">Cache-Control:</span> <span class="p">no-cache, no-store, max-age=0, must-revalidate</span>
<span class="gd"><</span> <span class="s2">Content-Type:</span> <span class="p">application/json; charset=UTF-8</span>
<span class="gd"><</span> <span class="s2">Date:</span> <span class="p">Fri, 01 Aug 2014 03:37:40 GMT</span>
<span class="gd"><</span> <span class="s2">ETag:</span> <span class="p">"0b18c0b677c1a58d12b1607ece2796f24"</span>
<span class="gd"><</span> <span class="s2">Expires:</span> <span class="p">0</span>
<span class="gd"><</span> <span class="s2">Pragma:</span> <span class="p">no-cache</span>
<span class="gd"><</span> <span class="s2">Set-Cookie:</span> <span class="p">JSESSIONID=E47A28829FF9FFB002FBD922339B0BAB; Path=/; Secure; HttpOnly</span>
<span class="gd"><</span> <span class="s2">Strict-Transport-Security:</span> <span class="p">max-age=31536000 ; includeSubDomains</span>
<span class="gd"><</span> <span class="s2">X-Content-Type-Options:</span> <span class="p">nosniff</span>
<span class="gd"><</span> <span class="s2">X-Frame-Options:</span> <span class="p">DENY</span>
<span class="gd"><</span> <span class="s2">X-Rate-Limit-Limit:</span> <span class="p">20000</span>
<span class="gd"><</span> <span class="s2">X-Rate-Limit-Remaining:</span> <span class="p">19996</span>
<span class="gd"><</span> <span class="s2">X-Rate-Limit-Reset:</span> <span class="p">20</span>
<span class="gd"><</span> <span class="s2">X-XSS-Protection:</span> <span class="p">1; mode=block</span>
<span class="gd"><</span> <span class="s2">Content-Length:</span> <span class="p">646</span>
<span class="gd"><</span> <span class="s2">Connection:</span> <span class="p">keep-alive</span></code></pre>



<p>We now provide much more information in response headers. With curl, make sure to add the verbose option when making calls (-v). New headers are:</p>

<h3>Common conventions used throughout the API:</h3>

<ul>
	<li><strong>ETag</strong><br/>When calling the same endpoint, use the <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.24" target="_blank">If-None-Match</a> header from the first call. Unless the resource has changed, you will get a 304 Not Modified HTTP response.</li><br/>
	<li><strong>Access-Control-*</strong><br/>Allows for cross origin resource sharing (<a href="http://www.w3.org/TR/cors/" target="_blank">CORS</a>).</li><br/>
	<li><strong>Content-Type</strong><br/>Returns the API version. See more on <a href="#versioning">versioning</a>.</li><br/>
	<li><strong>X-Rate-*</strong><br/>See how many calls you've made against your limit and the time required until reset.</li>
</ul>
