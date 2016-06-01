<div class="container">
	<form class="form-password" action="/login.password" method="post" role="form">
		<h2 class="form-password-heading">Forgot Password</h2>
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
		<label for="inputEmail" class="sr-only">Email</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="Email *" name="email" value="<?= $email; ?>" required>

		<button class="btn btn-lg btn-primary btn-block" type="submit">Get Password</button>
	</form>
</div> <!-- /container -->
