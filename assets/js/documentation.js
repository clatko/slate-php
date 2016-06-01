
$(document).ready(function() {

	$('input[type=text]').on('keydown', function( e ) {

		if (e.keyCode == 13) { 

			$(this).closest('form').find('input[type=submit]').click();

			e.stopPropagation();
			e.preventDefault();

		}

	});

//    prettyPrint();

	// Gather info to make the different calls
   	$('form.api-method').each(function() {
		
		var el = $(this);
		var formId = $(this).attr("id");

		$(this).ajaxForm({
			dataType: 'json',
			traditional: false,
			beforeSubmit: function() {
	    		$('#' + formId + '_response').removeClass('hidden').children('.collapse-body:first').addClass('hidden');
	    		$('#' + formId + '_request').html('');
    			$('#' + formId + '_requestUrl').html('');
	    		$('#' + formId + '_responseCode').html('');
				$('#' + formId + '_responseContainer').removeClass('alert-success');
				$('#' + formId + '_responseContainer').removeClass('alert-error');
	    		$('#' + formId + '_responseHeader').html('');
	    		$('#' + formId + '_responseData').html('');
	    		$('#' + formId + '_responseInfo').html('');
	    		$('#' + formId ).parent().find('.separator')
	    			.removeClass('loading')
	    			.addClass('before-loading');

    			el.find('input[type=submit]').val('Loading...');
	    		
	    		setTimeout(function() {
	    			$('#' + formId ).parent().find('.separator').addClass('loading');	
	    		});
	    		
			},
    		success: function(responseText) {
    			
    			el.find('input[type=submit]').val('Go');

	    		$('#' + formId + '_response').removeClass('hidden').children('.collapse-body:first').removeClass('hidden');

	    		$('#' + formId + '_error').html('').parents('.widget-box:first').hide();
	    		if (responseText.response.error != null && responseText.response.error != '') {
		    		$('#' + formId + '_error').html(JSON.stringify(responseText.response.error, undefined, 4));
		    		$('#' + formId + '_error').parents('.widget-box:first').show();
		    	}
	    		delete responseText.response["error"];

	    		var requestString = responseText.response.data;
	    		if (responseText.request.method !== "GET") {
	    			requestString += responseText.request.data;
	    		}

	    		// Set Request Url
	    		$('#' + formId + '_requestUrl')
	    		.html(decodeURIComponent(responseText.info.url));

	    		$('#' + formId + '_request')
	    			.addClass("highlight json")
//	    			.html('<code>' + JSON.stringify(requestString, undefined, 4) + '</code>');
	    			.html('<pre>' + requestString + '</pre>');


	    		$('#' + formId + '_responseCode').html(JSON.stringify(responseText.response.code, undefined, 4));

				if (responseText.response["code"] !== 200) {
					$('#' + formId + '_responseContainer').removeClass('alert-success').addClass('alert-error');
				} else {
					$('#' + formId + '_responseContainer').removeClass('alert-error'); // .addClass('alert-success');
				}
	    		delete responseText.response["code"];

	    		$('#' + formId + '_responseHeader').html('').parents('.widget-box:first').hide();
	    		if (responseText.response.header != null) {
		    		$('#' + formId + '_responseHeader').html(JSON.stringify(responseText.response.header, undefined, 4));
		    		$('#' + formId + '_responseHeader').parents('.widget-box:first').show();
		    	}
	    		delete responseText.response["header"];

	    		$('#' + formId + '_responseData').html('').parents('.widget-box:first').hide();
	    		if (responseText.response.data != null) {
		    		$('#' + formId + '_responseData').html(JSON.stringify(responseText.response.data, undefined, 4));
		    		$('#' + formId + '_responseData').parents('.widget-box:first').show();
		    	}
	    		delete responseText.response["data"];

	    		$('#' + formId + '_time').html('');
	    		$('#' + formId + '_responseInfo').html('').parents('.widget-box:first').hide();
	    		if (responseText.response.info != null) {
		    		delete responseText.response.info["url"];
		    		delete responseText.response.info["original_url"];

		    		if (typeof responseText.response.info.total_time != 'undefined' && responseText.response.info.total_time != null) {
		    			$('#' + formId + '_time').html(responseText.response.info.total_time + " ms");
		    		}

	    			$('#' + formId + '_responseInfo').html(JSON.stringify(responseText.response.info, undefined, 4));
		    		$('#' + formId + '_responseInfo').parents('.widget-box:first').show();
		    	}
	    		delete responseText.response["info"];

	    		if (responseText.response["errno"] == 0) {
					delete responseText.response["errno"];
	    		}
	    		if (responseText.response["error"] == '') {
					delete responseText.response["error"];
	    		}

				delete responseText.response["size"];

				// Set code formatting
//			    prettyPrint();
		    }
		});
	});

	// DMO: source http://trentrichardson.com/examples/timepicker/#timezone_examples
	$('.datetime-picker').each(function() {
		var input = $('input[type=text]',$(this));
		var trigger = $('img',$(this));

		var timezone_value = input.attr('data-time-zone-value') || '+000';
		var timezone_label = input.attr('data-time-zone') || 'UTC';
	
		trigger.click(function() {
			var action = (input.datepicker( "widget" ).is(":visible")) ? 'hide': 'show';
			input.datepicker(action);
		});
		input
			.datetimepicker({
				showTimezone: false
				,timezone: timezone_value
				,dateFormat: 'yy-mm-dd'
				,timeFormat: "HH:mm:ss"
				,timeSuffix: 'Z'
				,separator: 'T'
				,timezoneList: [
					{ value: timezone_value, label: timezone_label}
				]
			});
	});

	$.ajaxSetup({ traditional: true });

	$('.code > .wrapper').hide();

	$('.button.try-it').on('click', function() {

		var target = $(this);

		if ( target.hasClass('try-it') ) {

			target.parent().parent().find('.wrapper').show();
			target
				.removeClass('try-it').addClass('close')
				.html('close');

		} else { 

			target.parent().parent().find('.wrapper').hide();

			target
				.removeClass('close').addClass('try-it')
				.html('try it'); 

		}

	});

	$('.collapse-button').on('click', function() {

		$(this)
			.toggleClass('plus-icon')
			.parent().find('.collapsable').toggle('collapse');

	});

	$('.languages a').on('click', function(e) {
		
		e.preventDefault();

		location.href = $(this).attr('href') + location.hash;

	});

	if ( typeof documentation != 'undefined' ) {
		new documentation(); 

		new channelsModal( '.select-channels .button' );
	}

});

if ( !Date.prototype.toSimpleISOString ) {

    ( function() {

        Date.prototype.toSimpleISOString = function() {
            return this.toISOString().replace(/\....Z/, 'Z');
        };

    }());
};