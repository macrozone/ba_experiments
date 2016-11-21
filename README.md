# ba_experiments


## Setup


```
cd app;
meteor npm install;
```

You need to import data into your local collection (there is no seeding yet).

Start the app:

```
cd app;
meteor;
```

it will run under localhost:3000;

It will also start a mongodb under localhost:3001;

Use robomongo or mongochef or similar to connect to this database while meteor is running and import the data in /sampledata

You also need to provide the *buf-Files for the PET-Cases. You get these *buf-files from Kevin Mader.

You'll need to create a folder on your local computer and point "assetPath" in "settings_dev.json" to that location. 
Create a folder "buffers" in that folder and put the *.buf files there.

# Roadmap:

## Client-side-only app

meteor provides its own backend that can store data, define methods, etc. It also does the bundling (similar to webpack).

It also has some local state which is nessesary in modern functional frontends.

The app is written with the mantra-spec https://github.com/kadirahq/mantra, which also is a good fit for non-meteor-react-apps. 
You basically need to change the containers and add rest-interfaces or similar to them (instead of pub/sub mechanism from meteor).

If you want to remove meteor and create a client-side-only app, you'd need to do the following:

// WIP

