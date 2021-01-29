---
title: "Episode 1: Musical Notes & Computation"
date: 2021-01-28T08:06:25+06:00
hero: /posts/musicode/episode1/banner.gif
description: Episode 1 - Musical Notes & Computation
menu:
  sidebar:
    name: 1-Musical Note & Computation
    identifier: episode1
    parent: musicode
    weight: 10
---


<iframe width="560" height="315" src="https://www.youtube.com/embed/BrxO-Lssnjg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code for this episode is available [here](https://github.com/psc-g/musicode/tree/main/ep1).

## Episode 1: Musical Notes & Computation

Hello world!
Welcome to musicode, the show where we explore a topic in music, a topic in computer science, and then we combine them in creative ways.
In this first episode, we will explore two basic concepts: musical notes, and computation!

### Musical notes

What are musical notes?
They are symbols that represent a sound.
Now even though there are infinitely many possible sounds,
in Western music we discretize them into 12 possible pitches: C, C#, D, D#, E, F, G, G#, A, A#, and B.
Why 12? Math! Way back in the day, Pythagoras played with pieces of string and discovered first that the length of a string is inversely proportional to its frequency; and that if you started with a string of frequency F and added a new string of frequency equl to 3/2 F (or 1.5 * F), when you plucked both of them it sounded nice. It turns out that the 3/2 ratio gives you a perfect 5th above the original note. If we go back to our piano and start on C, a perfect fifth above is a G.
Now let’s say we start all the way at the bottom of the piano at the lowest C and kept on multiplying by this ratio (pause), we end up right back at C! And how many notes did we pass along the way? You guessed it: Twelve!
You may be asking yourself: “If there are only twelve pitches, why are there so many keys on your piano?”
These 12 pitches are arranged into repeating octaves. Each time it repeats, we’re hearing the same original frequency but multiplied by 2!
In Western notation we arrange these multiple pitches into a staff consisting of five lines, with little circles placed either in between these lines, on the lines, and sometimes outside these five lines.
Where each little circle is placed tells the performer what note to play on their instrument (pause), and the shape of the note and its stem indicates how long you play it for (pause).
There are obviously many more important details on musical notation, but these are the most important bits.
With these tools, composers can dream up new pieces of music, write it down on paper, and get musicians to perform it!
So musicians are basically transforming symbols on a page into music in your ears.
And that… is a a great segway into the computer science segment:

### Computation

Wikipedia says “computer science is the study of algorithmic processes and computational machines”, and I agree.
But what are “algorithmic processes” and “computational machines”? At its most basic level, these “processes” or “machines” take an input and transform it into an output.
So are professional musicians just “algorithmic processes” or “computational machines”? Well, in a way, they are!
But, as its name implies, computer science studies and develops these processes to be run on computers.
Specifically, computer scientists, like myself, build these processes by writing computer programs using special languages like C++ or Python. Just like the circles and lines on a page indicate what notes a musician should play, the code in a file tells a computer what operations to perform.
There are all sorts of programs one could write.
We could, for instance, write a program that always says “yes, and” (pause).
We could also write a program that does nothing! (pause).
Or we could write a program that just parrots back whatever we send it. (pause)
None of these programs are very interesting, but of course there are more sophisticated ones like those used in the autopilot systems of airplanes, in your robot vacuum cleaners, and in the webpage where you’re watching this video.
Basically, most things that are “technological” use computer programs.
I write programs to do fun things with my fancy piano behind me!
This type of piano is a Disklavier. It’s just like a regular acoustic piano, but it also has a digital connection. Which means whatever I play can get captured by the computer.
This keyboard you see on your screen is showing, in real-time, what I’m playing!
The way I do this is that my computer receives the notes I play, and my program draws them on the screen.
The awesome thing about this piano is that I can also send it notes to play, and it plays on its own, like this! (pause).
Remember the parroting program? We can do something like that with the piano, check it out. (pause)
But we can do something a bit more fun, we can make the program play back what I just played, but backwards! (pause).
I can also write code to make pretty visualizations for whatever is being played, like this (pause).

### Creativity
For the last bit of this episode, the creative combination of the two topics, I’ll play a 2-part invention by J.S. Bach, and then my code and my fancy piano will play it back in reverse. Enjoy!


### Acknowledgements

A lot of the work I do in this space was originally inspired by the amazing projects [Dan Tepfer](https://dantepfer.com/) has made with his Disklavier. I've hung out a few times with Dan, and he even helped me pick my Disklavier, but I haven't had the chance to jam with him (yet!).

My good friend Ralph Crewe helped a lot with the technical details of making this first episode, including making me realize I needed good lights and helping me pick them! You should definitely check out his YouTube channel, [Isn't that something?](https://www.youtube.com/channel/UCroPLKi0ML5xFMYjiHDTyCQ), which is incredibly entertaining and informative, and was an inspiration for my own channel!

Finally, many thanks to my wife Michelle and my siblings Alvaro and Melissa for providing great feedback on early versions of this episode!

[Subscribe to the YouTube channel!](https://www.youtube.com/channel/UCrZNf0XkxtXE0tsy1y2RT0w).
