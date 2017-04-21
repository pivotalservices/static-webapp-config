# Dynamic Configuration with the Staticfile Buildpack

> Note: you should **not** use this strategy with sensitive configuration values,
> as they will be made publicly available.

In this example we have a client-side web app that needs some environment-specific configuration.

We can't use environment variables directly, because we're deploying with the
[Staticfile Buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/),
and therefore there is no code running to read environment variables.

We also want to avoid doing any configuration at build time, because this would
require us to build different artifacts for different environments.

## Pre-Runtime Hooks

In order to perform configuration post-build, we can leverage a
[pre-runtime hook](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html#profile).

To do so, we create a `.profile` file and place it in the root of our app directory.
This file is a script that Cloud Foundry executes before each app instance starts.

## `.profile`

Our `. profile` script will read configuration values from the environment and
place them in a `config.json` file in the root of the web project.

Our front-end code will be updated to `GET` this configuration file on startup.

In this simple example, the `.profile` script uses Python to read the desired
environment variables (as seen by the app's container) and dumps them to a file.
The web app reads this configuration on startup and does whatever it needs to.  
In this case, we just write the configuration values to the page.

## Demo

For this example we'll call our app `staticapp`.

1. Clone this repo
1. Target your desired Cloud Foundry
1. Push the app without starting it.  This gives us a chance to set env vars: `cf push staticapp --no-start --random-route`
1. Set environment variables configure the app.  Our `.profile` wants the following vars:
 - `cf set-env staticapp MY_CONFIG_VAR0 value0`
 - `cf set-env staticapp MY_CONFIG_VAR1 value1`
1. Start the app `cf start staticapp`
1. Navigate to your app's route in a browser and view the configuration values.
