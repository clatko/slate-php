<div class="container">
	<form class="form-signin" action="/login.login" method="post" role="form">
		<h2 class="form-signin-heading">API Documentation</h2>
		<?
		$error = $authObj->getValue('error');
		if($error!='') {
			$authObj->setValue('error','');
			echo '<div class="alert alert-danger" role="alert">Error: '.$error.'</div>';
			// just assuming we are back here because of an error. heh.
			// the below is required because of the redirect
			$email = $authObj->getValue('email');
			$password = $authObj->getValue('password');
		}
		?>
		<label for="inputEmail" class="sr-only">Email</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="Email" name="email" value="<?= $email; ?>" required autofocus>
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" value="<?= $password; ?>" required>
		<div class="checkbox">
			<label>
				<input type="checkbox" value="remember-me"> Remember me
			</label>
		</div>
		<button class="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
	</form>

		<p class="text-center"><a href="/login.register">Register</a> &rarr;</p>
		<p class="text-center"><a href="/login.password">Forgot Password</a> &rarr;</p>

</div> <!-- /container -->

