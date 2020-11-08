---
title: "JiDiJi: An Experiment in Musical Representation"
date: 2018-14-01T08:06:25+06:00
hero: /posts/art/jidiji/jidiji.png
description: "JiDiJi: An Experiment in Musical Representation"
menu:
  sidebar:
    name: JiDiJi
    identifier: jidiji
    parent: art
    weight: 10
---

I made [this website](https://jidiji.glitch.me/) to convert between music and colours. Read below for details!

## About

Music can be represented in various forms: as a series of sounds, as a score, as tabs (for guitar), as a series of chord names, as MIDI, as a [NoteSequence protocol buffer](https://github.com/tensorflow/magenta/blob/master/magenta/protobuf/music.proto#L27), and more.

I stumbled upon the [Solresol](https://en.wikipedia.org/wiki/Solresol) language recently, as well as upon [this talk](http://cdm.link/2018/03/watch-ableton-loop-talk-connects-polyrhythms-synesthesia/) by [Adam Neely](http://www.adamneely.com/), and realized that you can also represent music as colours.

I created a mapping from MIDI pitches to RGB values. The mirrored-keyboard on the right hand side shows these mappings (the grey C key on the left keyboard is the middle C).

The name came from Sol-Re-Sol = G-D-G ~ Ji Di Ji


## MIDI to colours

For converting a MIDI file into a "painting", first I convert the MIDI file into a [NoteSequence protocol buffer](https://github.com/tensorflow/magenta/blob/master/magenta/protobuf/music.proto#L27) that is quantized into sixteenth notes. This is done using [magenta.js](https://magenta.tensorflow.org/js).

For each sixteenth note, I convert all the notes currently being played into a square of pixels with the colour dictated by the mapping mentioned above; all these notes (which may include notes that started playing a few beats ago) are then stacked into a single column. This means that a song in 4/4 that has 32 bars will have have 32 * 16 = 512 of these columns.

For example, the following simple score:

{{< img src="/posts/art/jidiji/simpleScoreExample.png" title="Simple Score Example" >}}

converts to the following painting:

{{< img src="/posts/art/jidiji/simpleScorePainting.png" title="Simple Score Painting" >}}

In the above painting the height of this single column is given by the maximum number of concurrently playing notes (3 in this case). For beats where there are less than this, the background is filled with a beige colour (you can change the background colour in the main page).

In the above example, the notes are vertically-center-aligned. But we can also render then top-aligned:

{{< img src="/posts/art/jidiji/simpleScorePaintingTop.png" title="Simple Score Painting Top Align" >}}

and bottom-aligned:

{{< img src="/posts/art/jidiji/simpleScorePaintingBottom.png" title="Simple Score Painting Bottom Align" >}}

You can change these alignments via the controls in the main page:

{{< img src="/posts/art/jidiji/vertAlignSelect.png" title="Select Vertical Alignment" >}}

To avoid having very long paintings, I set a maximum width and wrap these columns around. For example, the first movement of Beethoven's 5th symphony would result in the following painting:

{{< img src="/posts/art/jidiji/beethoven5_painting.png" title="Painting for Beethoven's 5th symphony" >}}

Converting Philip Glass's "Metamorphosis 1" yields a nice visualization of minimalism in music!

{{< img src="/posts/art/jidiji/glass_metamorphosis_painting.png" title="Painting for Philip Glass' Metamorphosis" >}}

You can try out a few sample MIDI files in the main page, or load your own!


## Colours to MIDI

The mapping from pitch to colours can be reversed, giving us a colour to pitch mapping. This means that we could take any image file (say, of a painting), and convert it into a song by converting each pixel into its corresponding note.

One problem is that we only have 88 keys in a piano, so we only have 88 "color notes". Each pixel in an image file can have 16777216 different colors (256 * 256 * 256), so we need to map each of the possible colors onto one of the 88 available ones. This is essentially a nearest-neighbour problem in 3-dimensions. I used a simple [k-d tree](https://en.wikipedia.org/wiki/K-d_tree) to perform this nearest-neighbour search.

Another problem: let's say we have an image that is 512 pixels wide by 1024 pixels high. This would result in a song that is 32 bars long (32 * 16 = 512), and where in each sixteenth beat there are 1024 different pitches being played. This is obviously too many pitches (and would likely completely freeze your machine).

To overcome this problem, you can specify the maximum number of simultaneous notes using the slider in the main page:

{{< img src="/posts/art/jidiji/rowHeightSlider.png" title="Slider for row height" >}}

If we take a painting like Renoir's "Luncheon of the Boating Party" and specify a row height of 10, during playback we would get something like:

[{{< img src="/posts/art/jidiji/renoirScreenshot.png" title="Screenshot of Renoir video playback" >}}](/posts/art/jidiji/renoir_playback.mp4)

The red bar moving around represents the pixels currently being "played".

You can try out a few sample paintings in the main page or load your own!. They mostly sound chaotic (or like an infernal rave at some points), but I still think it's an interesting experiment. Perhaps with a modified color-to-note mapping and dynamic row-heights you could produce something a bit more musical.


## Playback


You can play the melodies generated from either method. The pixels in the image will light up as their corresponding note is being played. This is using [Tone.js](https://tonejs.github.io/) for the playback, so it's essentially just a collection of simple waves; this means the sound is very "8-bit", and the amplitudes of the sound waves can sometimes cancel themselves out.

It's fun to watch the pixels light up as they're getting played. Beethoven's 5th symphony makes it really easy to see where the rhythms fall:

[{{< img src="/posts/art/jidiji/beethoven5Screenshot.png" title="Playback of Beethoven's 5th" >}}](/posts/art/jidiji/beethoven5.mp4)

Another fun one is Legend of Zelda - Labyrinth (Crystal version):

[{{< img src="/posts/art/jidiji/zeldaScreenshot.png" title="Playback of Zelda" >}}](/posts/art/jidiji/zelda.mp4)

Of the images I provide, my favourite is the music you get from Michael Creese's "Pointillism Skull", especially the sounds you get in the areas outside of the skull:

[{{< img src="/posts/art/jidiji/pointScreenshot.png" title="Playback of Zelda" >}}](/posts/art/jidiji/point.mp4)


## Unraveling Bolero

Recently I heard an excellent Radiolab podcast called [Unraveling Bolero](https://www.wnycstudios.org/story/unraveling-bolero/) which finally motivated me to code up this idea. In the podcast they describe a painter, Anne Adams, that developed [progressive aphasia](https://en.wikipedia.org/wiki/Aphasia). During the last moments of her disease, she became obsessed with [Maurice Ravel's](https://en.wikipedia.org/wiki/Maurice_Ravel) Bolero, and ultimately produced her painting "Unraveling Bolero":

{{< img src="/posts/art/jidiji/bolero_large.jpeg" title="Anne Adam's Unraveling Bolero" >}}

It turns out that Ravel also suffered from aphasia, and Bolero was composed towards the end of his disease. Apparently a recurring symptom of aphasia is the tendency to focus on very repetitive patterns.

I thought it would be interesting to see what it would look like to convert Ravel's Bolero (in MIDI form) to a painting. I was quite surprised to see the resulting painting when using the "top" alignment:

{{< img src="/posts/art/jidiji/boleroPainting.png" title="JiDiJi version of Bolero" >}}

There is a striking resemblance in the inverted-triangle pattern throughout both the Anne Adams painting and the MIDI-to-colours painting. Perhaps Anne Adams was able to capture an essential underlying structural component of Ravel's composition that went beyond a simple repetitive pattern.


## What's next?

There are a few things I'd like to do to improve this. If you're interested and/or have a good idea for how to do it, send me a note!

-  I'd love to be able to make the sound better, but am unsure how to do it.
-  I think it'd be cool if the images get "painted" as the playback progresses (i.e. starts off white and as each pixel gets played, it gets placed on the page). This is a little tricky since only pixels that have been mapped to a real note get "activated", and not all pixels are properly mapped to a note.
-  I'd like to make it less intensive on the browser, especially for bigger songs/images. I tried using [p5.js](https://p5js.org/) but it actually made it heavier on the browser, and the playback became really choppy.
-  I've only tested this on Chrome, and I think it only really works properly on Chrome. Would be nice to support other browsers.
-  I'd like to be able to save image and/or MIDI files directly from the page.
-  I'd love to port this into Python (or any other non-browser language) to run this process in batch and create an image dataset of songs. Then train one of the many image generative models out there (a [GAN](https://en.wikipedia.org/wiki/Generative_adversarial_network) maybe?) to be able to generate new music through pixels.


## Sharing

If you're like to retwee this work, [here's the original tweet](https://twitter.com/pcastr/status/1029330794152644609).
