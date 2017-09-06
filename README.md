# validateForm Jquery Plugin
Validate your html form using this jquery plugin. Set some parameters and pass in through a config json object

This was my very first jquery plugin! I used it on 4 projects on an autos manufacturer website (Honda) with hundreds of thousands of visitors.

Important: I am re-writing this plugin with Typescript and making it more modular.

## Sample Codepen demo
https://codepen.io/hdavtian/pen/rzbozo

## How to use
Using this plugin is fairly simple, but I'd like to just outline the main ideas.
* Target your form
* Pass in a json configuration object
* The configuration object has 5 main nodes (order doesn't matter)
    * styles: identify your css classes for error
    * error_preferences: flags to show/hide errors and more css classes
    * submit_preferences: flags related to form submission
    * submit: the 'success' and 'fail' callback functions, this is where you insert your logic for the actual submission
    * fields: Outline your fields, validation rules and error messages per field

## Example

### Markup
For the markup, make sure to give your input elements a name. Later you will use the name within config object
```html
<form class="signup-form">

    <h4>Sample Form</h4>

    <div class="global-form-errors"></div>

    <div class="all-fields">

        <div class="field-wrapper">
            <input type="text" name="FirstName" value="" placeholder="First Name" />
        </div>

        <div class="field-wrapper">
            <input type="text" name="LastName" value="" placeholder="Last Name" />
        </div>

        <div class="field-wrapper">
            <input type="text" name="Email" value="" placeholder="Email Address" />
        </div>

        <div class="field-wrapper">
            <input type="text" name="Zip" value="" placeholder="Zip Code" />
        </div>

        <div class="field-wrapper">
            <input type="text" name="Phone" value="" placeholder="Phone Number" />
        </div>

        <div class="field-wrapper">
            <input type="checkbox" name="PrivacyPolicy" />
            <label>I have read and agree with the <a href="#">Privacy Policy</a></label>
        </div>

    </div>

    <input type="submit" name="name" value="Submit" />

</form>
```

## Javascript

```javascript
$('.signup-form').validateForm({

    styles: [
        {
            errorClass: "error"
        }
    ],

    error_preferences: {
        displayIndividualErrorMessages: false,
        displayErroneousFields: true,
        error_field_class: 'error',
        error_msg_class: 'error2',
        error_label_class: 'error-label',
        error_msg_markup: function (msg, rule) { return '<div class="' + this.error_msg_class + ' ' + rule + '">' + msg + '</div>' }
    },

    submit_preferences: {
        form_submit: false,
        gather_all_values: true
    },

    submit: {
        success:

            // 'values' arg is an array of key value pairs like this
            // ["FirstName=john", "LastName=smith", "Email=jsmith%40gmail.com", "Phone1=8185551212", "tc=on", "Campaigns=", "State=CA"]
            function (values, $form) {

                // Logic in case of no errors

            }
        ,fail:
            function () {
                // Logic to handle in case of errors
            }
    },

    fields: [{
        FirstName: {
            friendlyName: "First Name",
            rules: {
                required: {
                    errorMsg: 'First Name is required'
                }
            }
        },
        LastName: {
            friendlyName: "Last Name",
            rules: {
                required: {
                    errorMsg: 'Last Name is required'
                }
            }
        },
        Email: {
            friendlyName: "Email Address",
            rules: {
                required: {
                    errorMsg: 'Email Address is required'
                },
                validEmail: {
                    errorMsg: 'Must be a valid email address'
                }
            }
        },
        Zip: {
            friendlyName: "Zip",
            rules: {
                zipCode: {
                    errorMsg: 'Zip code is required and must be 5 digits'
                }
            }
        },
        Phone: {
            friendlyName: "Phone Number",
            rules: {
                required: {
                    errorMsg: 'Phone number is required'
                }
            }
        },
        PrivacyPolicy: {
            friendlyName: "Official Rules and Privacy Policy",
            rules: {
                required: {
                    errorMsg: 'Official Rules and Privacy Policy are required'
                }
            }
        }
    }]
});
```

## Css
The CSS is fairly minimal, you can get as create as you'd like when creating the form
```scss
.signup-form {

  .field-wrapper {
    margin: 15px;
  }

  .error {
    border:1px solid red;
  }

  input[type=checkbox].error {
    border: 2px solid red;
    outline: 2px solid red;
  }

}//signup-form
```

## Getting Started
- Include validateForm library after jquery
- Include validateForm css (or include the classes in your own css)
- Target desired DOM element in your markup and call .validateForm() with the proper config object