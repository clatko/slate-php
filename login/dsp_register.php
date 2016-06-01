<div class="container">
	<form class="form-register" action="/login.register" method="post" role="form">
		<h2 class="form-register-heading">Registration</h2>
		<?
		if(sizeof($validation_array) !== 0) {
			echo '<div class="alert alert-danger" role="alert">';
			foreach($field_array as $value) {
				if(isset($validation_array[$value])) {
					echo $validation_array[$value].'<br/>';
				}
			}
			echo '</div>';
		}
		?>
		<label for="inputCompany" class="sr-only">Company</label>
		<input type="text" id="inputCompany" class="form-control" placeholder="Company" name="company" value="<?= $company; ?>" autofocus>
		<label for="inputEmail" class="sr-only">Email</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="Email *" name="email" value="<?= $email; ?>" required>
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Password *" name="password" data-toggle="password" value="<?= $password; ?>" required>
		<label for="inputCode" class="sr-only">Promo Code</label>
		<input type="text" id="inputCode" class="form-control" placeholder="Promo Code" name="code" value="<?= $code; ?>">

		<p class="text-center">By clicking Get Started, you agree to our <a target="_blank" href="http://www.sample.org/tos"> terms of service</a>.</p>

		<button class="btn btn-lg btn-primary btn-block" type="submit">Get Started</button>
	</form>
</div> <!-- /container -->
