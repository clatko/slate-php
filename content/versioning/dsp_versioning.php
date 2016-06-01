<h1 id="versioning">Versioning</h1>

<blockquote>
	<p>Get latest version.</p>
</blockquote>
<pre><code class="highlight shell">curl -H <span class="s2">"Accept: application/vnd.org.sample+json" "https://api.sample.org/test/version"</span>
<span class="c">// Result: 2.0</span></code></pre>

<blockquote>
	<p>Get latest 1.x version.</p>
</blockquote>
<pre><code class="highlight shell">curl -H <span class="s2">"Accept: application/vnd.org.sample-1+json" "https://api.sample.org/test/version"</span>
<span class="c">// Result: 1.2</span></code></pre>

<blockquote>
	<p>Get specific 1.1 version.</p>
</blockquote>
<pre><code class="highlight shell">curl -H <span class="s2">"Accept: application/vnd.org.sample-1.1+json" "https://api.sample.org/test/version"</span>
<span class="c">Result: 1.1</span></code></pre>

<p>Versioning is provided through the header's "Accept" attribute.</p>
<h3>Three options are available:</h3>
<ul class="primary-list">
	<li>Recommended for development, the latest version of the latest release is selected by not specifying any version: <code class="prettyprint">"application/vnd.org.sample+json"</code></li><br/>
	<li>Recommended for production releases, the latest version for a major release can be specified, for example the most recent 1.x version: <code class="prettyprint">"application/vnd.org.sample-1+json"</code></li><br/>
	<li>Recommended only in specific instances or debugging, a specific version of a specific release can be used, for example version 1.1 would be: <code class="prettyprint">"application/vnd.org.sample-1.1+json"</code></li><br/>
</ul>
<h3>Version numbers will follow a MAJOR.MINOR.PATCH format:</h3>
<ul class="primary-list">
	<li><strong>MAJOR</strong> versions can have breaking changes.</li><br/>
	<li><strong>MINOR</strong> numbers are feature additions, bug fixes, basically any large update with no breaking changes.</li><br/>
	<li><strong>PATCH</strong> is mostly bug fixes, but will occasionally have a small feature update with no breaking changes.</li><br/>
</ul>

<p><aside class="success">
These test URLs actually work.
</aside></p>
