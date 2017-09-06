# validateForm Jquery Plugin
Validate your html form using this jquery plugin. Simply call the plugin set some parameters and pass them in through a config object

## Sample Codepen demo
https://codepen.io/hdavtian/pen/rzbozo

###### The markup
For the markup, make sure to give your input elements a name. Later you will use the name within config object
```html
<div class="field-wrapper">
    <input type="text" name="FirstName" value="" placeholder="First Name" />
</div>
```

###### The JS
Within the JS, each input element with a name attribute will have a json node like this
```javascript
$('.signup-form').validateForm({
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
        }
    }]
})
```

###### The Css
This CSS is fairly minimal, you can get as create as you'd like when creating the form
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