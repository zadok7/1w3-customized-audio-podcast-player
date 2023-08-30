# Decentralized Podcast and Audio Player on 1W3

Just some custom code to format [1W3](https://1w3.io) audio file uploads into a decentralized podcast audio player.

# Setting up

## Step 1 - Add an image

In 1W3 add a block.

![1w3-1-addblock](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/e255364a-067c-4391-9dd1-1d773099ec28)

Pick the Image block type

![1w3-1-pickimage](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/c14d25ba-fd39-4891-ad78-1552ffad1f20)

Upload an image and click Update.

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/d3467fb0-8aa6-438a-a544-e50ca75477d1)

## Step 2 - Add the audio file

Add a new block, look for Audio.

![1w3-1-pickaudio](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/9dad6b88-f767-4802-9814-198b61fd8d81)

Choose the .mp3 to upload. Also be sure to give it a title. 

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/29efaeae-b2b8-49fa-b802-c17d657db2db)


## Step 3 - Add a paragraph block

Add a new block, look for Paragraph.

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/b383403a-978c-4deb-9e1a-d9d74a32f5a2)

Add a description for the episode/audio file.

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/17d952b2-fb24-4940-9588-4b24814842d2)

It should now look like this:

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/9d67d8f5-8a93-4022-8db8-18cd407e1aee)

## Step 4 - Repeat steps 1 - 3

Do this same process for each episode / audio file you want to have in the player / podcast. Be sure the blocks are in the right order (Image, Audio, Paragraph)

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/b62a2a95-982e-4327-bda5-e6a3fc9aa9b9)

You'll notice the preview will show all those elements vertically with scrolling. This isn't how we want it to look so we're going to use custom Javascript and CSS to do some magic.

## Step 5 - Add custom code

Copy the contents of `custom.js` and `custom.css` into the Advanced customization of your 1W3 site.

![1w3-1-customize](https://github.com/zadok7/1w3-customized-audio-podcast-player/assets/88821511/5d92a6bc-f256-45be-830a-5da9c5c37432)

### Result

Now any image that is proceeded by an audio file and paragraph will be reformated into a player that can be controlled by left and right navigation. It will also automatically generate a podcast.rss file so it can be used to subscribe on players like Apple Podcast.

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/115b9744-3130-4a18-95dc-e2b6b08aaf39)

## Final steps

Publish the site to IPFS.

![image](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/fbd36113-03d4-4520-8d1b-eb7187060598)

Connect your ENS name. If you use IPNS you'll avoid paying gas for each update.

![1w3-1-connect-ens3](https://github.com/zadok7/decentralized-podcast-ipfs-1w3/assets/88821511/49228acb-6edb-4d87-b3f3-a491a57029a7)

> **Note:** This is just a proof of concept. The RSS feed does not read publishing dates, org the main podcast image. It does grab the image, audio file and description and puts those in the RSS subscription feed.



