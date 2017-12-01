### Installation

* `git clone git@github.com:carbon-design-system/carbon-boilerplate.git`
* `cd carbon-boilerplate`
* `npm install` or `yarn`
* `npm run dev`

### Usage

To start using the boilerplate, navigate to `app/views/home.html` and add some
code. You can find code snippets of the Carbon components
[here](http://www.carbondesignsystem.com/). Styles can be added to
`app/scss/main.scss` and images can be added to `app/assets/img`. To reference
these images in your HTML, just use the relative route
`/assets/img/FILENAME_HERE.jpg|svg|png`.

### Deploy

Easily deploy your app to Bluemix. In your `package.json` look for a script like
this: `"deploy": "cf push <<APP NAME HERE>>"`. Simply change `<<APP NAME HERE>>`
to a valid app name, and then run `npm run deploy`

### Bugs

Find a bug? Contact me on the Cloud Platform Slack (`@tjegan`) or submit a new
issue.

### Contributing

To contribute, make a fork of this repo and submit a PR
