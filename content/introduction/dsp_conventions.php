<h2 id="conventions">Conventions</h2>
<p>As a general rule, endpoint paths are a representation of data, parameters to that endpoint change the display of the same data.</p>

<h3>Common conventions used throughout the API:</h3>

<ul>
	<li><strong>Parameters</strong><br/>Most parameters are embedded within the URI, modifying parameters such as range, limit, or granularity are used in the query string.</li><br/>
	<li><strong>Arrays</strong><br/>Values are separated by a comma in either the URI or query string.</li><br/>
	<li><strong>Date &amp; Time Values</strong><br/>All input/output dates are represented as strings in ISO 8601 format: YYYY-MM-DDThh:mm:ssZ</li><br/>
	<li><strong>Plurality</strong><br/>This now matters. Where you see a plural, you most likely can send multiple values.</li>
</ul>
