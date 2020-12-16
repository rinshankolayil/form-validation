$(document).ready(function () {
    $.fn.timepicker_autocomplete = function (options = {}) {
        var default_options = {
            'minute_diff': 24,
            'hour_diff': 1,
            'time_start': '00:00:00',
            'time_end': '23:59:00',
            'search_time_format': 'hh:mm:ss a',
            'diff_apply_all': false,
            'create_new_input': false,
        }
        if (!options['time_start']) {
            var time_start = default_options['time_start'];
        }
        else {
            var time_start = options['time_start'];
        }
        if (!options['time_end']) {
            var time_end = default_options['time_end'];
        }
        else {
            var time_end = options['time_end'];
        }
        if (!options['minute_diff']) {
            var minute_diff = default_options['minute_diff'];
        }
        else {
            var minute_diff = options['minute_diff'];
        }
        if (!options['hour_diff']) {
            var hour_diff = default_options['hour_diff'];
        }
        else {
            var hour_diff = options['hour_diff'];
        }
        if (!options['search_time_format']) {
            var search_time_format = default_options['search_time_format'];
        }
        else {
            var search_time_format = options['search_time_format'];
        }
        var search_time_format_ = search_time_format;
        if (!options['diff_apply_all']) {
            var diff_apply_all = default_options['diff_apply_all'];
        }
        else {
            var diff_apply_all = options['diff_apply_all'];
        }
        if (!options['create_new_input']) {
            var create_new_input = default_options['create_new_input'];
        }
        else {
            var create_new_input = options['create_new_input'];
        }
        var hour_format = search_time_format.substring(0, 2).trim();
        hour_format_ = hour_format.replace(":", "")
        // DONT MAKE hour_format LOWECASE HERE (hour_format) BEFORE THE BELOW IF CONDITION
        // IF hour_format is in small letter it will be 12 hour format
        if (hour_format == 'hh' || hour_format == 'h') {
            var time_format = 12;
        }
        else {
            var time_format = 24;
            create_new_input = false;
        }
        search_time_format = search_time_format.toLowerCase();
        hour_format = hour_format.toLowerCase();
        if (hour_format == 'hh') {
            display_hour_without_zeros = true;
        }
        else {
            display_hour_without_zeros = false;
        }
        if (search_time_format.indexOf(":m:") == -1) {
            display_minute_without_zeros = true;
        }
        else {
            display_minute_without_zeros = false;
        }
        if (search_time_format.indexOf("m") !== -1) {
            display_minutes = true;
        }
        else {
            display_minutes = false;
        }
        if (search_time_format.indexOf("a") !== -1) {
            var display_am_pm = true;
        }
        else {
            var display_am_pm = false;
            create_new_input = false;
        }
        if (search_time_format.indexOf("s") >= 0) {
            var display_seconds = true;
            if (search_time_format.indexOf("ss") >= 0) {
                var display_seconds_without_zeros = false;
            }
            else {
                var display_seconds_without_zeros = true;
            }
        }
        else {
            var display_seconds = false;
        }

        var continue_ = validate_time_diff(hour_diff, minute_diff)
        if (continue_) {
            var hour_start = Math.abs(parseInt(time_start.substring(0, 2)));
            var minute_start = Math.abs(parseInt(time_start.substring(3, 5)));
            var second_start = Math.abs(parseInt(time_start.substring(6, 8)));

            var hour_end = Math.abs(parseInt(time_end.substring(0, 2)));
            var minute_end = Math.abs(parseInt(time_end.substring(3, 5)));
            var second_end = Math.abs(parseInt(time_end.substring(6, 8)));

            var continue_ = validate_time_start_end(hour_start, hour_end, minute_start, minute_end, second_start, second_end);
            var timeSource = [];
            if (continue_) {
                var hour_loop = 0;
                for (hour = hour_start; hour <= hour_end; hour += hour_diff) {
                    hour_loop++;
                    if (hour_loop == 1 || diff_apply_all == true) {
                        var minute_start_loop = minute_start;
                    }
                    else {
                        var minute_start_loop = 0;
                    }
                    if (hour == hour_end) {
                        var minute_end_loop = minute_end;
                    }
                    else {
                        var minute_end_loop = 59;
                    }
                    var minute_loop = 0;
                    if (display_minutes) {
                        for (minute = minute_start_loop; minute <= minute_end_loop; minute += minute_diff) {
                            minute_loop++;
                            if (minute_loop == 1) {
                                minute_diff_loop = minute_diff;
                            }
                            if (hour_loop == 1 && minute_loop == 2 && minute_start_loop > 0 && diff_apply_all == false) {
                                minute = minute - minute_start_loop;
                            }
                            var hour_ar = get_hour(hour, time_format, display_hour_without_zeros)
                            var hour_ = hour_ar[0];
                            var am_pm = hour_ar[1];
                            if (minute < 10 && display_minute_without_zeros == true) {
                                var minute_ = '0' + minute.toString();
                            }
                            else {
                                var minute_ = minute.toString();
                            }
                            if (display_seconds) {
                                if (display_seconds_without_zeros) {
                                    var time_push = hour_ + ':' + minute_ + ':0';
                                }
                                else {
                                    var time_push = hour_ + ':' + minute_ + ':00';
                                }
                            }
                            else {
                                var time_push = hour_ + ':' + minute_;
                            }
                            if (display_am_pm) {
                                time_push += ' ' + am_pm
                            }
                            if (jQuery.inArray(time_push, timeSource) == -1) {
                                timeSource.push(time_push) // SECONDS END
                            }
                        } // MINUTE END
                    } // END IF display_minutes
                    else {
                        var hour_ar = get_hour(hour, time_format, display_hour_without_zeros)
                        var hour_ = hour_ar[0];
                        var am_pm = hour_ar[1];
                        if (display_seconds) {
                            if (display_seconds_without_zeros) {
                                var time_push = hour_ + ':' + '0';
                            }
                            else {
                                var time_push = hour_ + ':' + '00';
                            }
                        }
                        else {
                            var time_push = hour_;
                        }
                        if (display_am_pm) {
                            time_push += ' ' + am_pm
                        }
                        if (jQuery.inArray(time_push, timeSource) == -1) {
                            timeSource.push(time_push) // SECONDS END
                        }
                    }
                } // HOUR END
                console.log(timeSource)
                var elem = $(this[0])
                elem.attr('create_new_input', create_new_input);
                elem.attr('search_time_format', search_time_format_);
                elem.autocomplete({
                    source: timeSource,
                    select: function (_, item) {
                        var time_format = $(this).attr('search_time_format')
                        var create_new_input = $(this).attr('create_new_input')
                        var input_name = $(this).attr('name');
                        var time_format_split = time_format.split(":")
                        if (typeof input_name !== typeof undefined && input_name !== false) {
                            var input_name_generated = input_name + '_generated';
                            if (time_format_split.length > 2 && create_new_input == "false") {
                                var selected_time = item['item']['value'].toLowerCase();
                                var selected_time_ = selected_time.trim();
                                selected_time = selected_time.replace("am", "").replace("pm", "").trim()
                                var selected_time_split = selected_time.split(":")
                                console.log(selected_time)
                                var hour = parseInt(selected_time_split[0].trim())

                                if (selected_time_.includes("pm") || selected_time_.includes("am")) {
                                    if (selected_time_.includes("pm")) {
                                        hour += 12;
                                    }
                                    if (hour < 10) {
                                        var hour_in_24H_format = '0' + hour.toString();
                                    }
                                    else {
                                        var hour_in_24H_format = hour.toString();
                                    }
                                    var minute = parseInt(selected_time_split[1]);
                                    if (minute < 10) {
                                        minute = '0' + minute.toString();
                                    }
                                    else {
                                        minute = minute.toString();
                                    }
                                    var second = parseInt(selected_time_split[2].trim());
                                    if (second < 10) {
                                        second = '0' + second.toString();
                                    }
                                    else {
                                        second = second.toString();
                                    }
                                    var time_push = hour_in_24H_format + ':' + minute + ':' + second;
                                    console.log(selected_time_split)
                                    if ($('#' + input_name_generated + '_id').length == 0) {
                                        $('<input type="text" value="' + time_push + '" name="' + input_name_generated + '" id="' + input_name_generated + '_id">').insertAfter(this);
                                    } else {
                                        $('#' + input_name_generated + '_id').val(time_push)
                                    }
                                }
                            }
                        }
                    }
                });
            } // IF END
        } // IF continue_ end
    };


    function get_hour(hour_in_24H_format, time_format, display_hour_without_zeros) {
        if (hour_in_24H_format > 12) {
            var am_pm = 'PM';
            var hour_ = (parseInt(hour_in_24H_format) - 12);
        }
        else if (hour_in_24H_format == 12) {
            var am_pm = 'PM';
            var hour_ = hour_in_24H_format;
        }
        else {
            var am_pm = 'AM';
            var hour_ = hour_in_24H_format;
        }
        if (time_format == 24) {
            var hour = hour_in_24H_format;
        }
        else {
            var hour = hour_;
        }
        if (hour < 10 && display_hour_without_zeros == true) {
            hour = '0' + hour.toString();
        }
        else {
            hour = hour.toString();
        }
        var return_ar = [hour, am_pm];
        return return_ar;
    }

    function validate_time_start_end(hour_start, hour_end, minute_start, minute_end, seconds_start, seconds_end) {
        var continue_ = true;
        try {
            if (hour_end == 0) {
                hour_end = 23;
            }
            if_time_between(hour_start, hour_end, 'hour', 23);
        }
        catch (e) {
            console.error(e);
            var continue_ = false;
        };
        try {
            if (minute_end == 0) {
                minute_end = 59;
            }
            if_time_between(minute_start, minute_end, 'minute');
        }
        catch (e) {
            console.error(e);
            var continue_ = false;
        };
        try {
            if (seconds_end == 0) {
                seconds_end = 59;
            }
            if_time_between(seconds_start, seconds_end, 'seconds');
        }
        catch (e) {
            console.error(e);
            var continue_ = false;
        };
        return continue_;
    }

    function if_time_between(start_time, end_time, param, max_value = 59) {
        if (start_time <= max_value && end_time <= max_value && start_time >= 0) {
            return ''
        }
        else {
            if (start_time <= max_value && start_time >= 0) {
                var start_end = "end";
            }
            else {
                var start_end = "start";
            }
            throw new Error("invalid `" + param.toUpperCase() + "` value mentioned in the parameter `time_" + start_end + "`. Please use the time format from `00:00:00` to `23:59:59`");
        }
    }

    function validate_time_diff(hour_diff, minute_diff) {
        var continue_ = true;
        try {
            is_time_divisible(hour_diff, 'hour_diff')
        }
        catch (e) {
            console.error(e);
            var continue_ = false;
        };

        try {
            is_time_divisible(minute_diff, 'minute_diff', 60)
        }
        catch (e) {
            console.error(e);
            var continue_ = false;
        };
        return continue_;
    }

    function is_time_divisible(hour_diff, param = 'hour_diff', factor = 24) {
        if (factor % hour_diff == 0) {
            return '';
        }
        else {
            throw new Error("the value given in the paramenter `" + param + "` difference should by divisible by " + factor);
        }
    }
});
