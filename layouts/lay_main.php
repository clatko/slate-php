<!doctype html>
<html>
	<!-- head -->
	<? include('lay_head.php'); ?>
	<!-- -->

	<body class="index">
		<a href="#" id="nav-button">
			<span>NAV<img src="/assets/img/navbar.png" /></span>
		</a>

		<!-- navbar -->
		<? include('lay_tocify.php'); ?>
		<!-- -->

		<div class="page-wrapper">
			<div class="dark-box"></div>
			<div class="content">

<!-- content -->
<? include(SITE_DIR.'content/introduction/dsp_introduction.php'); ?>
<? include(SITE_DIR.'content/introduction/dsp_new.php'); ?>
<? include(SITE_DIR.'content/introduction/dsp_conventions.php'); ?>
<? include(SITE_DIR.'content/introduction/dsp_parameters.php'); ?>
<? include(SITE_DIR.'content/introduction/dsp_headers.php'); ?>
<? include(SITE_DIR.'content/authentication/dsp_authentication.php'); ?>
<? include(SITE_DIR.'content/authentication/dsp_credentials.php'); ?>
<? include(SITE_DIR.'content/versioning/dsp_versioning.php'); ?>
<? include(SITE_DIR.'content/errors/dsp_errors.php'); ?>
<? include(SITE_DIR.'content/examples/dsp_examples.php'); ?>
<!-- -->

<!-- CONTENT BEGIN -->
<?= trim($Fusebox['layout']); ?>
<!-- CONTENT END -->

			</div>
			<div class="dark-box">
				<div class="lang-selector">
					<?
					foreach($languages as $v) {
						echo '<a href="#" data-language-name="'.$v.'">'.$v.'</a>'."\n";
					}
					?>
				</div>
			</div>
		</div>


	<!-- js dependencies-->
	<script src="/assets/js/lib/jquery-2.min.js"></script>
	<script src="/assets/js/lib/jquery-ui.min.js"></script>
	<script src="/assets/js/lib/jquery-ui-timepicker-addon.min.js"></script>
	<script src="/assets/js/lib/jquery.form.min.js"></script>
	<script src="/assets/js/all.js"></script>
	<script src="/assets/js/documentation.js"></script>
	<script>
		$(function() {
			setupLanguages(["<?= implode('","', $languages); ?>"]);
		});
	</script>

	</body>

</html>
