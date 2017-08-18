// ET = 4-5 hourss; AT = 2 hours;
(function($){
	var server = 'http://helloworld.filonitta.fe4.a-level.com.ua/api/v1';
	var $studentsList = $('#students-list');
	var $formInfo = $('#form-info');
	var $formCreate = $('#form-create');
	var $btnUpdate = $('#btn-update');
	var $btnCreate = $('#btn-create');
	var $btnDelete = $('#btn-delete');
	var $btnReset = $('#btn-reset');

	// Students-list form

	$.ajax({
		url: server +'/students',
		method: 'GET',
		success: function(response){
			console.log(response);
			response.forEach(function(students){
				$('<a href="">')
				.addClass('list-group-item')
				.attr('data-id', students.id)
				.text(students.name).appendTo($studentsList);
			})
		},
		error: function(response){}
	})

	// Student form

	$studentsList.on('click', '[data-id]', function(event){
		event.preventDefault();
		var studentsId = $(this).data('id');

		$.ajax({
			url: server + '/students/' + studentsId,
			method: 'GET',
			success: function(response) {
				for(var key in response){
					$formInfo.find('[name="' + key + '"]').val(response[key]);
				}
			},
			error: function(error) {},
		})
	})

	// Update button

	$btnUpdate.on('click', function(event){
		var studentsId = $formInfo.find('[name=id]').val();
		$.ajax({
			url: server + '/students/' + studentsId,
			method: 'PUT',
			data: $formInfo.serialize(),
			success: function(response){
				$studentsList
				.find('[data-id="' + studentsId + '"]')
				.text(response.lastname + ' ' + response.firstname);

				for(var key in response){
					$formInfo.find('[name="' + key + '"]').val(response[key]);
				}
			},
			error: function(error){}
		})
	});

	// Create button

	$btnCreate.on('click', function(event){
		event.preventDefault();

		$.ajax({
			url: server + '/students',
			method: 'POST',
			data: $formCreate.serialize(),
			success: function(response) {
				$('<a href="">')
				.addClass('list-group-item')
				.attr('data-id', response.id)
				.text(response.name).appendTo($studentsList);
			},
			error: function(error) {
				var objError = JSON.parse(error.responseText).errors;
				objError.forEach(function(e){
					var err = e.field;
					var span = $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
					$formCreate.find('[name="' + err + '"]').parent().addClass('has-error has-feedback');
					$formCreate.find('[name="' + err + '"]').after(span);
				})
			}
		});
		$btnReset.trigger('click');
	})

	// Delete button

	$btnDelete.on('click', function(){
		var studentsId = $formInfo.find('[name=id]').val();
		console.log(studentsId);
		$.ajax({
			url: server + '/students/' + studentsId,
			method: "DELETE",
			success: function(response) {
				$('a').filter('[data-id="'+studentsId+'"]').remove();
			}
		})
		$formInfo[0].reset();
	})

	//Clear button

	$btnReset.on('click', function(){
		$formCreate.find('.has-error').toggleClass('has-error has-feedback');
		$formCreate.find('.glyphicon').remove();
	})
})(jQuery);