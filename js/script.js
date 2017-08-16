(function($){
	var server = 'http://helloworld.filonitta.fe4.a-level.com.ua/api/v1';
	debugger;
	var $studentsList = $('#students-list');
	var $formInfo = $('#form-info');
	var $formCreate = $('#form-create');
	var $btnUpdate = $('#btn-update');
	var $btnCreate = $('#btn-create');
	var $btnDelete = $('#btn-delete');

	$.ajax({
		url: server +'/students',
		method: 'GET',
		success: function(response){
			response.forEach(function(students){
				$('<a href="">')
					.addClass('list-group-item')
					.attr('data-id', students.id)
					.text(students.name).appendTo($studentsList);
			})
		},
		error: function(response){}
	})

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

	$btnUpdate.on('click', function(event){
	var studentsId = $formInfo.find('[name=id]').val();
	$.ajax({
		url: server + '/students/' + studentsId,
		method: 'PUT',
		data: $formInfo.serialize(),
		success: function(response){
			console.log(response);
			$studentsList
			.find('[data-id="' + studentsId + '"]')
			.text(response.lastname + ' ' + response.firstname);

			for(var key in response){
				$formInfo.find('[name="' + key + '"]').val(response[key]);
			}
		},
		error: function(error){}
	});
	});

	$btnCreate.on('click', function(){
	event.preventDefault();

	console.log(this);

	$.ajax({
		url: server + '/students/' + studentsId,
		method: 'POST',
		success: function(response) {
			console.log(response);
/*			for(var key in response){
				$formCreate.find('[name="' + key + '"]').val();
			}*/
		},
		error: function(error) {},
	})
	})

})(jQuery);