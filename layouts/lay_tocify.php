<div class="tocify-wrapper">
	<img src="/assets/img/logo.png" id="logo" />
	<div class="lang-selector">
		<?
		foreach($languages as $v) {
			echo '<a href="#" data-language-name="'.$v.'">'.$v.'</a>'."\n";
		}
		?>
	</div>
	<div class="search">
		<input type="text" class="search" id="input-search" placeholder="Search">
	</div>
	<ul class="search-results"></ul>
	<div id="toc"></div>
	<ul class="toc-footer">
		<li><a href='#credentials'>Your Credentials</a></li>
		<li><a href='http://www.sample.org/'>Main Site</a></li>
		<li><a href='/login.logout'>Log Out</a></li>
	</ul>
	<div class="toc-copyright">
        &copy; 2015 Sample
      </div>
</div>
