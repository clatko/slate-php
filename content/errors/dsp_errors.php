<h1 id="errors">Errors</h1>

<pre><code class="highlight plain"><span class="s2">200.00:</span> OK

<span class="s2">301.00:</span> MOVED_PERMAMENTLY
<span class="s2">302.00:</span> FOUND
<span class="s2">304.00:</span> NOT_MODIFIED

<span class="s2">400.00:</span> INVALID_INPUT
<span class="s2">400.01:</span> INVALID_ZIPCODE
<span class="s2">400.02:</span> INVALID_DATE
<span class="s2">400.03:</span> INVALID_DATES
<span class="s2">400.04:</span> INVALID_GRANULARITY
<span class="s2">400.05:</span> INVALID_RANGE
<span class="s2">400.06:</span> INVALID_GUID
<span class="s2">400.07:</span> INVALID_ENUM
<span class="s2">400.08:</span> INVALID_IMAGE_SIZE
<span class="s2">400.09:</span> INVALID_PROVIDER
<span class="s2">400.10:</span> INVALID_CATEGORY
<span class="s2">400.11:</span> EMPTY_PARAM
<span class="s2">400.12:</span> ZERO_LIMIT
<span class="s2">400.13:</span> INVALID_LIMIT
<span class="s2">400.14:</span> INVALID_QUERY
<span class="s2">400.15:</span> INVALID_SERVICE_ID
<span class="s2">400.16:</span> INVALID_ID
<span class="s2">400.17:</span> BAD_ENUM
<span class="s2">400.18:</span> NO_SESSION
<span class="s2">400.19:</span> ILLEGAL_STATE
<span class="s2">400.20:</span> INVALID_COLLECTION
<span class="s2">400.21:</span> OUT_OF_SCOPE

<span class="s2">401.01:</span> EMPTY_API_KEY
<span class="s2">401.02:</span> INVALID_API_KEY

<span class="s2">416.01:</span> MAX_ENTRIES
<span class="s2">416.02:</span> TOO_LONG
<span class="s2">416.03:</span> TOO_EARLY
<span class="s2">416.04:</span> OVER_LIMIT

<span class="s2">429.01:</span> RATE_LIMIT_EXCEEDED

<span class="s2">500.01:</span> INVALID_DATA
<span class="s2">500.02:</span> OVERSUBSCRIBED

<span class="s2">503.01:</span> SERVICE_UNAVAILABLE

<span class="s2">600.01:</span> UNEXPECTED_ERROR
<span class="s2">600.02:</span> SSL_FAIL</code></pre>

<p>We use standard HTTP response codes as defined by the IETF (with a few exceptions). We also try to provide more information for each error type with a sub code, a two digit number appended to the standard HTTP code.</p>
<h3>Types of HTTP response codes</h3>
<ul>
	<li><strong>2xx.xx</strong> - Everything is fine.</li><br/>
	<li><strong>3xx.xx</strong> - Redirection/Found</li><br/>
	<li><strong>4xx.xx</strong> - Bad input by the user.</li><br/>
	<li><strong>5xx.xx</strong> - Failure.</li><br/>
	<li><strong>6xx.xx</strong> - Failure (non-standard).</li><br/>
</ul>

<p><aside class="warning">Errors are updated frequently.</aside></p>
