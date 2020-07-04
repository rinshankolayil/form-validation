function validate_form(form,style=''){
	var form_length = form.length
	var errors = new Array()
	for(i = 0; i < form_length ; i++){
		var id_ = '#' + form[i]['name']
		var class_ = '.' + form[i]['name']
		var value = $(id_).val()
		success_alert(id_,style);
		var attr = $(id_).attr('validate');
		var attr_class = $(class_).attr('validate');
		if(attr == 'true' || attr_class == 'true' || $(id_).prop('required') || $(class_).prop('required')){
			if(typeof $(id_).attr('type') !== typeof undefined && $(id_).attr('type') !== false)
			{
				$(id_).attr('error_validate', 'false');
				if($(id_).attr('type') != 'hidden'){
					if($(class_).attr('type') == 'checkbox' || $(class_).attr('type') == 'radio'){
						$(class_).attr('error_validate', 'false');
						if($(class_ + ':checked').length == 0){
							error_alert(class_,style);
							errors.push(class_)
							console.log(class_)
							break;
						}
					}
					else{
						if($(id_).attr('type') == 'email'){
							if(!isEmail(value)){
								error_alert(id_,style);
								errors.push(id_)
								console.log(id_)
								break;
							}
						}
						else if($(id_).attr('type') == 'date'){
							if(!isDate(value)){
								error_alert(id_,style)
								errors.push(id_)
								console.log(id_)
								break;
							}
							
						}
						else{
							if(value == ''){
								error_alert(id_,style);
								errors.push(id_)
								console.log(id_)
								break;
							}
						}
					}
				}
				
			}
			else{
				if(value == ''){
					error_alert(id_,style);
					errors.push(id_)
					console.log(id_)
					break;
				}
			}
		}
	}
	if(errors.length == 0){
		return true
	}
	else{
		return errors
	}	
}

function error_alert(id,style){
	if(style == 'outline' || style == ''){
		$(id).attr('error_validate', 'true');
		$(id).css('outline', '1px solid red');
		$(id).focus()
	}
}

function isDate(value) {
    var date = value.split("-");
    var date_two = value.split('/')
    var date_length = date.length
    var date_two_length = date_two.length 
    if(date_length == 3 || date_two_length == 3){
    	if(date_length == 3){
    		var year = date[0]
    	}
    	else if(date_two_length == 3){
    		var year = date_two[2]
    	}
    	if(year.substring(0,1) == '0' || year.substring(0,2) == '00' || year.substring(0,3) == '000'){
    		return false
    	}
    	return true
    }
    else{
    	return false
    }
    
}

function return_date(value){
	var date = value.split("-");
    var date_two = value.split('/')
    var date_length = date.length
    var date_two_length = date_two.length 
    if(date_length == 3){
    	if(isDate(value)){
    		return date
    	}
    	else{
    		return '';
    	}
    	
    }
    else{
    	return '';
    	// return date_two
    }
}

function success_alert(id,style){
	if(style == 'outline' || style == ''){
		$(id).css('outline', 'none');
	}
}

function isEmail(email) {
  	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
