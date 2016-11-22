# ba_experiments

## Setup

```

cd app;
meteor npm install;
meteor npm run;

```

`meteor npm run` will run the app under localhost:3000, runs a local mongo-db under port 300 and 
loads the default configs defined in `app/settings_dev.json`.

You need to provide some sample-data:

1.) While meteor is running, connect to the db with a mongo-tool (robomongo or mongochef are good for that) and import the sampledata (under /sample_data).

2.) You also need to provide the *buf files for the sample-data. Adjust the path under app/settings_dev.json to a path on your local filesystem

3.) create a folder "buffers" under that path and put the *buf files there. You get them from Kevin Mader.

## Create client-side-only app

meteor provides its own backend (in nodejs), as well as local collections (with pub/sub) and a state-store. 
The app is written with the mantra-spec (https://github.com/kadirahq/mantra), so basically you just need to change the containers to use 
rest-apis or similar.

So these steps would be required:

1.) use webpack for bundeling (it uses es2015 imports / exports), add a compile/bundle script (gulp with babel and webpack or similar)

2.) Add a solution for local state management (redux is recommended)

3.) Add rest apis to containers where data is needed (or implement syncing with the redux store)



