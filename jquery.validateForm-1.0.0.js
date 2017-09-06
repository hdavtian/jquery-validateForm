!function () { "use strict"; var bind = function (a, b) { var c = Array.prototype.slice.call(arguments, 2); return function () { var d = c.concat(Array.prototype.slice.call(arguments, 0)); a.apply(b, d) } }; window.console || (window.console = {}); var console = window.console; if (!console.log) if (window.log4javascript) { var log = log4javascript.getDefaultLogger(); console.log = bind(log.info, log), console.debug = bind(log.debug, log), console.info = bind(log.info, log), console.warn = bind(log.warn, log), console.error = bind(log.error, log) } else console.log = function () { }; if (console.debug || (console.debug = console.log), console.info || (console.info = console.log), console.warn || (console.warn = console.log), console.error || (console.error = console.log), null != window.__consoleShimTest__ || eval("/*@cc_on @_jscript_version <= 9@*/")) { var wrap = function (a) { var b, c, d, e; if (a = Array.prototype.slice.call(arguments, 0), e = a.shift(), c = a.length, c > 1 && window.__consoleShimTest__ !== !1) for ("string" != typeof a[0] && (a.unshift("%o"), c += 1), d = a[0].match(/%[a-z]/g), b = d ? d.length + 1 : 1; c > b; b += 1) a[0] += " %o"; Function.apply.call(e, console, a) }; console.log = bind(wrap, window, console.log), console.debug = bind(wrap, window, console.debug), console.info = bind(wrap, window, console.info), console.warn = bind(wrap, window, console.warn), console.error = bind(wrap, window, console.error) } if (console.assert || (console.assert = function () { var a = Array.prototype.slice.call(arguments, 0), b = a.shift(); b || (a[0] = "Assertion failed: " + a[0], console.error.apply(console, a)) }), console.dir || (console.dir = console.log), console.dirxml || (console.dirxml = console.log), console.exception || (console.exception = console.error), !console.time || !console.timeEnd) { var timers = {}; console.time = function (a) { timers[a] = (new Date).getTime() }, console.timeEnd = function (a) { var b = timers[a]; b && (console.log(a + ": " + ((new Date).getTime() - b) + "ms"), delete timers[a]) } } console.table || (console.table = function (a, b) { var c, d, e, f, g, h; if (a && a instanceof Array && a.length) { if (!(b && b instanceof Array)) { b = []; for (h in a[0]) a[0].hasOwnProperty(h) && b.push(h) } for (c = 0, d = a.length; d > c; c += 1) { for (e = [], f = 0, g = b.length; g > f; f += 1) e.push(a[c][b[f]]); Function.apply.call(console.log, console, e) } } }), console.clear || (console.clear = function () { }), console.trace || (console.trace = function () { }), console.group || (console.group = function () { }), console.groupCollapsed || (console.groupCollapsed = function () { }), console.groupEnd || (console.groupEnd = function () { }), console.timeStamp || (console.timeStamp = function () { }), console.profile || (console.profile = function () { }), console.profileEnd || (console.profileEnd = function () { }), console.count || (console.count = function () { }) }();
//# sourceMappingURL=console-shim.map


/*Using an IIFE and passing in $ to avoid collision with other libraries using $*/
(function ($) {

    $.fn.validateForm = function (config) {

        /*
        Best practices for plugin authoring
        - use IIFE (as a wrapper) and pass jquery object to avoid $ collision with other libraries
        - use this not $(this) when referring to the main jquery selector inside the plugin, for example: this.css("border", "1px solid green");
        - return object at end so that it's chainable
        - to minimize footprint, don't clutter up space with many plugins, instead, pass in options (for example through a json object) and do stuff accordingly
        */

        var errorClass = config.styles[0].errorClass,
            fields = config.fields[0];

        function Form(obj) {

            var errors = [];

            var submitBtn = (function () {

                var myButton = $('.btn-submit');

                var processing = function () {
                    myButton.addClass('processing');
                }

            }());

            var rules = function () {

                // Rule object, where we define rules, module pattern + IIFE

                // helper function used by rules below to log useful info to console
                var consoleLog = function ($el, ruleName, result) {

                    var info,
                        tag_name = $el.prop('tagName').toLowerCase(),
                        attr_name = $el.attr('name'),
                        attr_type = $el.attr('type'),
                        value = $el.val();

                    info = {
                        "tag": tag_name,
                        "attr_name": attr_name,
                        "attr_type": attr_type,
                        "value": value,
                        "rule": ruleName,
                        "result": result
                    }

                    console.log(info);
                }

                var getAllValues = function () {

                    // need to special case for input types: text, checkboxes, selects and radio buttons

                    // ***
                    // input text fields
                    // ***
                    var inputs_text = obj.find('input[type=text]'),
                        inputs_checkbox = obj.find('input[type=checkbox]'),
                        select_fields = obj.find('select'),
                        values = [];

                    inputs_text.each(function () {

                        // skip to next if blank (essentially don't add)
                        //if ($(this).val() === '') return true;

                        values.push($(this).attr('name') + '=' + encodeURIComponent($(this).val()));
                    });

                    var _campaigns = [],
                        _campaigns_str = 'Campaigns=';

                    // ***
                    // checkboxes
                    // ***
                    inputs_checkbox.each(function (i) {

                        // @todo: clean this up
                        // Need a mainstream way of parsing and removing redundant keys

                        // skip to next if checkbox is not checked (essentially don't add)
                        //if (!$(this).prop('checked')) return true;

                        // following block left over from futurecars, commenting out
                        /*
                        if ($(this).attr('name') === 'Campaigns') {
                            _campaigns.push($(this).prop('value'));

                        } else {
                            values.push($(this).attr('name') + '=' + $(this).prop('value'));
                        }
                        */

                        values.push($(this).attr('name') + '=' + $(this).prop('checked'));

                    });

                    // left over from future cars, commenting out
                    /*
                    // prepare string with value Campaigns=xx,xx,xx
                    for (var n = 0; n < _campaigns.length; n++) {
                        _campaigns_str += _campaigns[n];
                        if (n != _campaigns.length - 1) {
                            _campaigns_str += ','
                        }
                    };

                    //adding campaigns to values array
                    values.push(_campaigns_str);
                    */


                    // ***
                    // select fields
                    // ***
                    select_fields.each(function () {
                        if ($(this).val() !== null) {
                            values.push($(this).attr('name') + '=' + $(this).prop('value'));
                        }

                    });

                    return values;
                }

                var process = function (obj) {

                    var error_msg_class = config.error_preferences.error_msg_class;

                    var insertErrorMsg = function (msg) {

                        if (obj.el.next().attr('class') === error_msg_class) {
                            obj.el.next().html(msg);
                        } else {
                            obj.el.after(config.error_preferences.error_msg_markup(msg, obj.ruleName));
                        }

                    }

                    var removeErrorMsg = function () {
                        if (obj.el.next().attr('class') === 'error-wrapper') {
                            obj.el.next().remove();
                        }
                    }

                    var toggleErrorMsg = function (msg) {
                        obj.result == 'failed' ? insertErrorMsg(msg) : removeErrorMsg();
                    }

                    var showErrorStyle = function (jqEl, cssClass) {
                        jqEl.addClass(cssClass);
                    }

                    var hideErrorStyle = function (jqEl, cssClass) {
                        jqEl.removeClass(cssClass);
                    }

                    var toggleErrorStyle = function (jqEl, cssClass) {
                        obj.result == 'failed' ? showErrorStyle(jqEl, cssClass) : hideErrorStyle(jqEl, cssClass);
                    }

                    var attrName = obj.el.prop('name'),
                        errorMsg = config.fields[0][attrName].rules[obj.ruleName].errorMsg;

                    // +++
                    // ++++++
                    // +++++++++
                    // ++++++++++++
                    // +++++++++
                    // ++++++
                    // +++

                    // toggle (show/hide) error msg
                    if (config.error_preferences.displayIndividualErrorMessages) toggleErrorMsg(errorMsg);

                    // Visually mark error fields
                    if (config.error_preferences.displayErroneousFields) {

                        // mark only if there's no 'highlightField' or if there is then shouldn't be false
                        if (!obj.thisConfig.hasOwnProperty('highlightField') || (obj.thisConfig.hasOwnProperty('highlightField') && obj.thisConfig.highlightField !== false)) {
                            toggleErrorStyle(obj.el, config.error_preferences.error_field_class);
                        }

                    };

                    // visually mark labels
                    if (obj.thisConfig.hasOwnProperty('highlightLabel')) {
                        toggleErrorStyle(obj.thisConfig.highlightLabel, config.error_preferences.error_label_class);
                    }

                    // highlight field label
                    if (obj.hasOwnProperty('thisConfig')) {

                        if (obj.thisConfig.hasOwnProperty('highlightLabel')) {
                            console.log('+-+-+-+-: ' + obj.thisConfig.highlightLabel);

                        }
                    };

                } /*process end*/


                // **************************************************
                // validation: clear error
                // **************************************************
                var clearError = function ($el, ruleName) {

                    process({
                        "el": $el,
                        "ruleName": ruleName,
                        "result": true,
                        "thisConfig": config.fields[0][$el.attr('name')]
                    });

                } /*clearError end*/

                // **************************************************
                // validation: required
                // **************************************************
                var required = function ($el, ruleName) {

                    var value,
                        result,
                        tagName = $el.prop('tagName').toLowerCase(),
                        attrName = $el.prop('name'),
                        attrType = $el.attr('type');

                    // text fields or dropdowns
                    if ((tagName == "input" && attrType == "text") ||
                        (tagName == "select")) {

                        value = $el.val();
                        result = (value !== "") ? "passed" : "failed";

                        // checkboxes
                    } else if (tagName == "input" && attrType == "checkbox") {

                        // multiple checkboxes (group)
                        if ($('*[name=' + attrName + ']').length > 1) {

                            var i = 0,
                                checked = 0,
                                tis = $('*[name=' + attrName + ']');

                            // for each checkbox with same 'name' attribute (which means part of a group)
                            for (var i = 0; i < tis.length; i++) {
                                if (tis.eq(i).prop('checked') == true) checked++;
                            }

                            result = (checked > 0) ? "passed" : "failed";


                            // single checkbox
                        } else {
                            value = $el.prop('checked'); // will be either true or false
                            result = (value) ? "passed" : "failed";
                        } /*end of inner if*/


                    } /*end of outer if*/

                    errors.push(result);
                    consoleLog($el, ruleName, result);

                    process({
                        "el": $el,
                        "ruleName": ruleName,
                        "result": result,
                        "thisConfig": config.fields[0][$el.attr('name')]
                    });

                    return (result === 'failed') ? false : true;

                } /*eof*/

                // **************************************************
                // validation: validEmail
                // **************************************************

                var validEmail = function ($el, ruleName) {

                    var email = $el.val(),
                        pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                    result = (email.match(pattern) !== null) ? "passed" : "failed";

                    errors.push(result);
                    consoleLog($el, ruleName, result);

                    process({
                        "el": $el,
                        "ruleName": ruleName,
                        "result": result,
                        "thisConfig": config.fields[0][$el.attr('name')]
                    });

                    return (result === 'failed') ? false : true;

                } /*eof*/

                // **************************************************
                // validation: numberOnly
                // **************************************************

                var numberOnly = function ($el, ruleName) {

                    var entry = $el.val(),
                        pattern = /^\d+$/;

                    result = (entry.match(pattern) !== null) ? "passed" : "failed";

                    errors.push(result);
                    consoleLog($el, ruleName, result);

                    process({
                        "el": $el,
                        "ruleName": ruleName,
                        "result": result,
                        "thisConfig": config.fields[0][$el.attr('name')]
                    });

                    return (result === 'failed') ? false : true;

                } /*eof*/

                // **************************************************
                // validation: zipCode
                // **************************************************

                var zipCode = function ($el, ruleName) {

                    var entry = $el.val(),
                        pattern = /^\d{5}$/;

                    result = (entry.match(pattern) !== null) ? "passed" : "failed";

                    errors.push(result);
                    consoleLog($el, ruleName, result);

                    process({
                        "el": $el,
                        "ruleName": ruleName,
                        "result": result,
                        "thisConfig": config.fields[0][$el.attr('name')]
                    });

                    return (result === 'failed') ? false : true;

                } /*eof*/

                /* ************************************************* */

                return {
                    required: required,
                    validEmail: validEmail,
                    numberOnly: numberOnly,
                    zipCode: zipCode,
                    getAllValues: getAllValues,
                    clearError: clearError
                }
            }();

            function validate() {

                // Check if 'rule' exists for each field in config
                // if it does, then run it

                var fieldName;

                for (var key in fields) {

                    fieldName = fields[key]; // returns for example 'fname'

                    if (fieldName.hasOwnProperty('rules')) {

                        for (var rule in fieldName.rules) {

                            if (fieldName.hasOwnProperty('dependentOn')) {

                                // text or array?
                                // if array, do "or"
                                var dependentOn = fieldName['dependentOn'];

                                if (typeof (dependentOn) == 'string') {

                                    var _checked = null;

                                    // if a checkbox, check if checked
                                    if (obj.find('input[name="' + dependentOn + '"]').is(':checkbox')) {
                                        var _checked = obj.find('[name=' + fieldName['dependentOn'] + ']').is(':checked');
                                        // else, (assuming a text fieldName) check if it has a value
                                    } else {
                                        var _checked = obj.find('[name=' + fieldName['dependentOn'] + ']').val() !== '';
                                    };

                                    if (_checked) {
                                        rules[rule](obj.find('*[name=' + key + ']'), rule);
                                    } else if (!_checked) {
                                        rules.clearError(obj.find('*[name=' + key + ']'), rule);
                                    };

                                } else {

                                    // when given an array, determine if checkbox is checked, then run rule

                                    var _checked = "";
                                    var _checkedFieldsArray = [];

                                    for (var n = 0; n < dependentOn.length; n++) {

                                        if (obj.find('[name=' + dependentOn[n] + ']').is(':checked')) {
                                            _checkedFieldsArray.push('yes');
                                        } else {
                                            _checkedFieldsArray.push('no');
                                        }

                                    } // end of loop

                                    // IE8 doesn't recognize indexof
                                    // found this snippet on stackO

                                    /* ---- start of snippet from stack o */

                                    if (!Array.prototype.indexOf) {
                                        Array.prototype.indexOf = function (elt /*, from*/) {
                                            var len = this.length >>> 0;

                                            var from = Number(arguments[1]) || 0;
                                            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                                            if (from < 0)
                                                from += len;

                                            for (; from < len; from++) {
                                                if (from in this && this[from] === elt)
                                                    return from;
                                            }
                                            return -1;
                                        };
                                    };

                                    /* ---- end of snippet from stack o */

                                    if (_checkedFieldsArray.indexOf("yes") !== -1) {
                                        rules[rule](obj.find('*[name=' + key + ']'), rule);
                                    } else {
                                        rules.clearError(obj.find('*[name=' + key + ']'), rule);
                                    }

                                }

                            } else {

                                // just process the rule as normal

                                if (fieldName.rules.hasOwnProperty(rule)) {
                                    // if rule value in config evaluates to true then use the
                                    // rule name to reference validation functions in 'rules' invoke
                                    rules[rule](obj.find('*[name=' + key + ']'), rule);
                                }

                            }

                        } /*end of inner for*/

                    }

                } /*end of outer for*/

            } /*end of validate*/

            var runSubmitTasks = function (event) {

                var submitBtn = obj.find('.btn-submit');

                submitBtn.attr('disabled', 'disabled');
                submitBtn.removeClass('errors animated shake');
                submitBtn.addClass('processing');

                obj.find('.signup-form-content').addClass('wait');

                // If form_submit set to false, do not submit form
                if (!config.submit_preferences.form_submit) {
                    event.preventDefault();
                }

                // if gather_all_values set to true then grab everything and pass to success
                /*if (config.submit_preferences.gather_all_values) {
                rules.getAllValues();
                }*/

                if (config.submit.hasOwnProperty('success')) {
                    config.submit.success(rules.getAllValues(), obj);
                }

            } /*runSubmitTasks end*/

            var runFailTasks = function (event) {

                var submitBtn = obj.find('.btn-submit');
                event.preventDefault();
                errors = [];

                // run custom fail function if it's in config object
                if (config.submit.hasOwnProperty('fail')) {
                    config.submit.fail();
                }

                submitBtn.removeClass('no-errors');
                submitBtn.addClass('errors animated shake');

            }

            /* form submit button event handler */

            obj.find('input[type=submit]').on('click', function (event) {

                event.preventDefault();
                validate();

                if ($.inArray('failed', errors) > -1) {
                    runFailTasks(event);
                } else {
                    runSubmitTasks(event);
                }



            })/*end of submit button event handler*/

        } /* end of form object */


        /*I like having an init function for objects so I group initializating code in one area*/
        function init(obj) {
            myForm = new Form(obj);
        }

        // +++
        // ++++++
        // +++++++++
        // ++++++++++++
        // +++++++++
        // ++++++
        // +++

        init(this);

        /*returning object so it's chainable*/
        return this;

    }   /* end of jquery plugin */

}(jQuery));                                                                                                        /* end if IIFE */