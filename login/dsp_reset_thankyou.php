<div class="container text-center">
	<form class="form-signin">
		<h2 class="form-signin-heading">API Documentation</h2>
		
		<?
		if($result = $authObj->getValue('result')) {
			echo '<p>'.$result.'</p>';
		}
		?>
	</form>

		<p class="text-center"><a href="/login.login">Login</a> &rarr;</p>

</div> <!-- /container -->
