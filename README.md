# 1w3-customized-audio-podcast-player

Just some custom code to format [1W3](https://1w3.io) audio file uploads into a scrollable player and podcast feed.

# Setting up

## Step 1

In 1W3 add an image block, then an audio block for each episode, or song, etc. Repeat.

![1w3-1-one-episode](https://github.com/zadok7/1w3-customized-audio-podcast-player/assets/88821511/7fa00bf1-6034-4f24-b847-1614f4396d96)

## Step 2

Copy the contents of `custom.js` and `custom.css` into the Advanced customization of your 1W3 site.

![1w3-1-customize](https://github.com/zadok7/1w3-customized-audio-podcast-player/assets/88821511/5d92a6bc-f256-45be-830a-5da9c5c37432)

# Result

Now any image thet is proceeded by an audio file will be reformated into a player that can be controlled by left and right navigation. It will also automatically generate a podcast.rss file so it can be used to subscribe on players like Apple Podcast.

![1w3-1-reformatted](https://github.com/zadok7/1w3-customized-audio-podcast-player/assets/88821511/1e8b3e64-fb6f-49c3-9605-59ada9a85647)

**Note - This is just a proof of concept. The RSS feed does not read descriptions, publishing date, and the main podcast image. It does grab the audio file and image and puts those in the RSS subscription feed.
