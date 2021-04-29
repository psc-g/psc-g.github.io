---
title: "Episode 4: Live Coding & Jazz"
date: 2021-04-28T08:06:25+06:00
hero: /posts/musicode/episode4/banner.gif
description: Episode 4 - Live Coding & Jazz
menu:
  sidebar:
    name: 4-Live Coding & Jazz
    identifier: episode4
    parent: musicode
    weight: 10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Oj6Sre4Lhac" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code for this episode is available [here](https://github.com/psc-g/musicode/tree/main/ep4).

## The story
I had a different idea for the fourth episode, but then I saw [John McLaughlin's tweet](https://twitter.com/jmcl_gtr/status/1372490033391927296) about International Jazz day, and decided to do something for that instead.

Obviously I'd talk about Jazz in the musical section, but it wasn't clear yet _what_ part of Jazz I'd talk about. I spoke to a few people and it seemed like a good idea would be to talk about improvisation, and how jazz musicians do it; in particular, I'm hoping this helps people who don't "get" jazz to understand what we're doing when we play it, and that we're not just playing random notes! :)

Once I decided on improvisation, the idea for Live Coding came kind of naturally, especially since SuperCollider (which I use for a lot of my performances) is one of the most commnly used systems for live coding.

The ideas for the visualizations came from different sources. The idea for the little scribbles came after watching a couple of YouTube videos about the Fourier transform and how you can use it to draw things; I decided to try it out but without a target drawing, just using the mechanics of it for creating pretty scribbles. The jellyfish idea was inspired by something I saw on Instagram (I unfortunately can't remember who had posted it), but I thought it'd be a good way to visualize a bassline. The squiggly tail was done with shaders, which I'm still trying to get better at. The shifting backgrounds were also done with shaders, and I was using it as a way to explore them and get better at them; as I was playing around I thought they'd be neat to give a visual interpretation for the changing chords.

I'm happy with the way the visual ended up, as there are multiple "layers" to them, directly tied to the musical performance: the shifting backgrounds are tied to the chords, the jellyfish are tied to the basslines, and the scribbles are tied to the melodies.

## Episode 4: Live Coding & Jazz

Imaynallam pacha!
Welcome to musicode, the show where we explore a topic in music, a topic in computer science, and combine them in creative ways.
In this fourth episode, in honour of International Jazz day, we will be exploring live coding and ...  Jazz!

### Live coding

Remember in the second episode where we talked about compilers, and how they convert a program written in a language such as C++ into machine language (i.e. 1s and 0s) that the computer can understand? What’s happening is that the compiler is taking your code, let’s say saved in a file called code.cpp, converting it into machine code, saving it in another file, say code.exe, and then this file is a program that the machine understands and can run.

You can think of the compiler as a translator, or interpreter, of the code you wrote. So although programming languages such as Python and JavaScript don’t require you to explicitly compile your code into a separate file, there is still an interpreter that converts your code into something the machine can understand, it just does it on the fly!

To make it explicit, let’s look at the simple program that multiplies a number by two that we’ve been looking at over the past few episodes. This is what it looks like in C++, and this is how you would compile and then execute it. Note that the compiler is a program itself called gcc, and it creates an executable a new file, different from the source code file. 

In Python it’s similar, but we can run the interpreter program, aptly named python, directly on the source code.
Now what if we wanted to change our program and have it return thrice our input? In C++ if we only changed the source code without recompiling, we’d still be executing the twice program. We need to recompile!
In Python we can just modify the source code and then when we run the interpreter on it it will pick up on the new changes.
Although with Python we can have a faster turnaround when making changes, it still requires us to re-run the interpreter on the new code.
Live coding takes this one step further and allows us to change code on-the-fly and have these changes be immediately reflected!
Let’s take a simple example. This Python program currently plays the beginning of twinkle-twinkle in a loop when I run it. If I change the notes in the code so it plays the beginning of Do-Re-Mi, it doesn’t immediately change the loop. I have to kill the program and restart it so that my change is reflected. And then any other changes I make require a kill and a restart.

Now let’s use a different programming language called SuperCollider. It’s actually more than just a programming language: it’s an environment. This language and environment allow you to do real-time, or live coding. So if we take a program that plays the beginning of twinkle-twinkle in a loop, when I change the notes in the code so it plays the beginning of Do-Re-Mi, it is reflected immediately!
This makes live coding dynamic and exciting, and the concept is really tied to musical and artistic performance. In other words, the coding itself is part of the performance! Artists who do this typically project their code onto a screen, in addition to whatever visuals they may be using, so that the audience can experience the coding as part of the experience.
This also enables the performer to react in real-time to the audience, or whatever is happening in the room. In other words, live coding enables these types of digital artists to improvise while coding. And that is a great segway into the next section.

### Jazz

I love Jazz music, but it’s an enormous topic and I obviously won’t be able to talk about all of it. A natural question to ask is “what is jazz?”. This is actually quite tricky to answer as I don’t think there’s a universally accepted definition. There are many different types of jazz, there are songs that include parts that are jazzy, there’s jazz fusion, which is when artists combine different genres with jazz, and much more. For me the core part of the spirit of jazz is improvisation. Improvisation is the act of making new music on the spot; Frank Zappa would say improvisation is "spontaneous composition".

But when we improvise, we’re not making up everything on the spot, we are typically following a form, structure, or rules of some sort. Just like in classical music and rock and roll every song has a predefined song form, in jazz we typically have the same type of song structure, but we take a lot more freedom in how we play around these structures, forms, and rules.
In classical music, although we do give a personal interpretation of a piece, we are meant to play the notes exactly as written by the composer. Remember in the performance section of the first episode I played that two-part invention by Bach? I was playing the notes exactly as Bach wrote them.

In rock and roll, guitarists often take solos during songs, and sometimes these solos become an essential part of the song. So much so that some of the guitarists in these bands feel a pressure to always play the same solo when performing live. For those of us that play guitar, learning these solos by heart was an integral part of our musical training.
In jazz, the musicians also take “solos”, but jazz performers almost never play the same solo twice, even for super famous solos like Miles Davis’ on "So What". For me, this is one of the things that makes jazz music so exciting: every time you hear a performance it’s new and different, and good performers are able to react to the audience in a way that makes it feel personalized. Some of my favourite shows are not the ones in big arenas where I see my rock-and-roll heroes, but the ones in small jazz venues where the performers are just on fire making all sorts of "spontaneous compositions".

To people that are not as familiar with jazz, it may sometimes seem like we’re just playing random things, but we’re really not! At least most of the time… We are following a song structure and we are following rules when we play, it just might not be as clear. My wife often jokes that she never knows when she’s supposed to clap in jazz concerts.
To try and help clarify this a bit, I’ve asked two friends and amazing jazz musicians to help me out. Paul Thompson on bass, and Jazz Robertson on drums. We’re going to play a version of “My Favourite Things” from the sound of music. To start off, we’re going to play it “straight”, that is, without any real improvisation. I played the notes exactly as written on the sheet music that will be displayed, so no improv!

_<FaveStraight>_

Now we’ll play the same song, but we’re going to play as we would in a jazz setting. Notice that we’re taking a lot more freedoms when playing the melody. After going through the melody once, I'll take a solo over the changes. What that means is that we're all still following the harmony of the song, but I'm no longer playing the melody, I'm making it up on the spot! Note that although Paul isn't the soloist at this point, he's still improvising his lines, just in an accompanist role.

After my solo is done, Paul will take a turn soloing over the changes. Again, note that although I'm not the soloist, I'll still be improvising an accompaniment.
Finally, it's the drummer's turn to solo. In jazz, for drum solos we typically do what's called "trading 4s", which means that the drummer takes turns with another instrument improvising 4 bars at a time.
Finally, after all the solos are some, we play the melody one more time.
This may be a lot to take in if you're not used to it, but I'm including the sheet music so you can follow along. Enjoy the performance, and see you on the other side!

_<FaveJazz>_

As I mentioned, improvising in jazz isn't just about taking solos, we also improvise when singing a melody and when accompanying a singer. To showcase this, I've asked my good friend, and ex-bandmate, Marc Tetreault to sing a song with me. Note that neither of us is taking a traditional solo, but also neither of us is following the melody or the chords exactly as written, we're both being free within the structure of the song.

_<MoonRiver>_

Before going into the final section of this episode, I'd like to thank Paul Thompson, jazz Robertson, and Marc Tetreault for lending their great talents for this episode. Paul has a really great YouTube channel on bass playing and music which you should Subscribe to; jazz …; and Marc recently released a really nice jazz album. You can find links to all of these in the video description.

Ok, for the performance part of this video, I will be doing some live improvisation, both musically and in code. I've written some base code on supercollider that I can control via code I write on the spot, and I will use this to improvise a song completely from scratch. Unlike the performances I showed earlier, I will not be following any predefined structure other than what the code provides, but will be making everything up on the spot. To try to keep it as close as possible to a real, in-person performance, what you’ll see was the first take with no edits.
Enjoy!



### Links

*  [Paul Thompson's YouTube channel](https://www.youtube.com/user/pdbass)
*  [Jazz Robertson's website](https://jazzrobertson.com/)
*  [Marc Tetrault's album](https://marctetrault.bandcamp.com/releases)


[Subscribe to the YouTube channel!](https://www.youtube.com/channel/UCrZNf0XkxtXE0tsy1y2RT0w).


### Image attributions

For this episode I used a lot of images from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page). Here are the credit attributions:


*  Live coding picture: From https://commons.wikimedia.org/wiki/File:Music_livecoding.jpg, picture by Matt Biddulph, Uploaded from http://flickr.com/photo/51035707449@N01/3223855666 using Flickr upload bot.
*  Sting: From https://commons.wikimedia.org/wiki/File:Sting_by_Yancho_Sabev.jpg, Sting by Yancho Sabev.jpg.
*  Frank Zappa pic: From https://commons.wikimedia.org/wiki/File:Frank_Zappa_1973_2.JPG.
*  David Gilmour: From https://commons.wikimedia.org/wiki/File:David_Gilmour_and_stratocaster.jpg, by Jean-Pierre Jeannin. Toulouse fut l’une des trois étapes européennes du Pink Floyd, groupe mythique des années 70. L’après midi, j’échangeais quelques mots en anglais avec David Gilmour guitariste envoûtant qui plus tard prendra les rênes du groupe, succédant à Roger Waters. Le soir, je fus le seul photographe admis sur le plateau. De ses débuts à 2006, Pink Floyd a vendu 250 millions d’albums.
*  Chick Corea: From https://commons.wikimedia.org/wiki/File:Chick_Corea_(ZMF_2019)_IMGP8022.jpg, photo by Ice Boy Tell (https://commons.wikimedia.org/wiki/User:Ice_Boy_Tell).
*  Paul McCartney concert: From https://commons.wikimedia.org/wiki/File:Paul_McCartney,_Tel_Aviv_069.JPG, by DMY (https://commons.wikimedia.org/wiki/User:DMY).
*  Sound of Music: From https://commons.wikimedia.org/wiki/File:The_Sound_of_Music_-_geograph.org.uk_-_1129470.jpg, This image was taken from the Geograph project collection (https://commons.wikimedia.org/wiki/Commons:Geograph_Britain_and_Ireland). See this photograph's page (https://www.geograph.org.uk/photo/1129470) on the Geograph website for the photographer's contact details. The copyright on this image is owned by Stephen McKay and is licensed for reuse under the Creative Commons Attribution-ShareAlike 2.0 license (https://commons.wikimedia.org/wiki/Creative_Commons).
