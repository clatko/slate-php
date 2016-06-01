<div class="container">
	<form class="form-reset" action="/login.reset" method="post" role="form">
		<input type="hidden" name="email" value="<?= $email; ?>"/>
		<input type="hidden" name="key" value="<?= $key; ?>"/>
		
		<h2 class="form-register-heading">Reset Password</h2>
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
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Password *" name="password" data-toggle="password" value="<?= $password; ?>" required>

		<button class="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
	</form>
</div> <!-- /container -->
