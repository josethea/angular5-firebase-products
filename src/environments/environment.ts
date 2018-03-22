// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyAIz1bpkOPL3CuFGyK8w230dVmq5epJe-o",
    authDomain: "products-2a603.firebaseapp.com",
    databaseURL: "https://products-2a603.firebaseio.com",
    projectId: "products-2a603",
    storageBucket: "products-2a603.appspot.com",
    messagingSenderId: "160045135764"
  }
};
