---
title: "Episode 2: Bits & Semitones"
date: 2021-02-07T08:06:25+06:00
hero: /posts/musicode/episode2/banner.gif
description: Episode 2 - Bits & Semitones
menu:
  sidebar:
    name: 2-Bits & Semitones
    identifier: episode2
    parent: musicode
    weight: 10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/_d4M1gthsXA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code for this episode is available [here](https://github.com/psc-g/musicode/tree/main/ep2).

## The story
The idea for doing something with bits seemed kind of natural to me as a second episode. After covering what "computation" is, why not cover what computers actually "see" when they run computations?

Given that bits are what makes up everything inside a computer's software, I wanted a musical topic that was inside every type of music (at least in Western music). Initially I was thinking of doing scales, but as I was developing this idea it dawned on me that there is a very close relationship between semitones and tones (or between half-steps and whole-steps) and the zeros and ones of the binary system.

For the creativity bit, I knew I wanted to construct scales based on randomly sampled binary strings. The most challenging part was trying to come up with an idea to improvise with these randomly sampled scales. I played around with a few ideas (such as playing random notes in the scale, or sampling certain chords randomly), but most of them sounded pretty chaotic. In the end I liked the dreamy effect I got from the triads. I think the particles idea came to me from some animation someone had posted on Twitter, but I can't remember which.

## Episode 2: Bits & Semitones

¡Hola mundo!
Welcome to musicode, the show where we explore a topic in music, a topic in computer science, and combine them in creative ways.
In this second episode we will explore two building blocks: bits and semi-tones.

### Bits
What is a bit? It’s a portmanteau of “binary digit” and is the basic unit of information for anything technological, such as a computer. Given that “binary” refers to things which have two components, it is no surprise that bits can take on two values: one and zero, or on and off, or yes and no, or true and false, or + and -.
But how can we make computers do so much with only two values? While a single bit only represents two possible values (zero, one), two bits can represent 4 values (zero, one, two, three), and three bits can represent 8 values (zero, one, two, three, four, five, six, seven).
What I’ve been showing you is what’s commonly known as the binary numeral system. In this system, each position i represents the value of 2n; so to figure out what number a binary numeral represents, you just look at all the positions with ones in them, find the corresponding value, and then add them all up. Notice that I also started counting at zero instead of one; this is very common in computer science and it’s called zero-based numbering.
More generally, a sequence of bits is referred to as a “bit string” and it can represent more than just numbers. It encodes basically everything needed to run computers: numbers, letters, images, video games, animal videos, and even AI!
We call a bit string of 8 bits a “byte”. Not spelled “b-i-t-e” , but spelled “b-y-t-e” to avoid confusion with “bit”, which is spelled “b-i-t”. But I actually don’t know why they chose the sound “byte” to represent 8-bits…
Anyway… one thousand of these bytes is a “kilobyte”, one million of these is a “megabyte”, one billion bytes is a “gigabyte”, and one trillion bytes is a “terabyte”.
These terms may be familiar to you, as you typically encounter them when you’re running out of space in your computer to store more funny cat videos!
But bits and bytes do more than just store static information like pictures and videos, they also encode instructions for the computer to do its magic! For example, how do you think the computer or phone you’re using to watch this video knows how to display the video to you? Well, it’s going through a bunch of bytes in memory that specify how to do this!
Now you may be saying: “hold on, hold on, I have a friend who’s a computer scientist and she is definitely not writing her code with only ones and zeros!” And you’re right, we most certainly don’t write code in binary!
As I mentioned in my previous video, we write code in high-level languages such as C++ or Python, which is a lot easier to understand than a bunch of ones and zeros! This high-level code then gets compiled (by a compiler which is itself also written in machine code)  into a lower level language such as assembly language, which is represented by ones and zeros, and this is what the computer processes to run the code.
Let’s take an example to make things more concrete. This piece of C++ code is a function that takes in a number, and returns that number multiplied by two. Even if you’re not familiar with programming, you can kind of understand what’s going on because it uses meaningful words such as “twice”, “number”, and “return”.
A C++ compiler would then convert this code into assembly language, which is a lot harder to understand, even for computer scientists! But this is the language machines understand, and it’s stored as a series of ones and zeros on the computer’s drive.
So the next time you interact with a digital device, which I guess you’re doing right now, just remember it’s all just made up of ones and zeros.
And with that, let’s move on to a different type of building block.

### Semitones
Remember how in the last episode we saw that in Western music there are 12 distinct pitches arranged into octaves? The smallest distance between any two distinct notes is a semitone. In other words, they’re just the notes adjacent to each other on a piano, a guitar, a viola, or just about any other instrument.
Semitones are sometimes called half-tones, which suggests that there is a thing called a “full tone”, or just a tone (pause). And there is! A tone is made up of two semitones.
With semitones and tones we can build all sorts of musical things. Remember perfect fifths? Well that’s just a nicer way of saying two notes that are 7 semitones apart. In fact, all different intervals, if you’re familiar with them, are just different numbers of semitones.
A minor second is one semitone, a major second is two semitones or a tone, a fourth is 5 semitones, a 13th is 21 semitones, and of course an octave is 12 semitones.
What about scales? Scales, which we’ll cover in a bit more depth in a future episode, are a set of notes ordered by pitch. The most commonly used scales are the heptatonic scales, which is a fancy way of saying scales with 7 notes. We can describe heptatonic scales with only semitones and tones!
The major scale (play scale) is defined as “tone, tone, semitone, tone, tone, tone, semitone”.
The natural minor scale (play scale) is defined as “tone, semitone, tone, tone, semitone, tone, tone”.
But we don’t have to limit ourselves to 7-note scales. Here are a few non-heptatonic scales that I like and use quite a lot.
The half-whole diminished scale (play and animate scale) has 8 notes and is defined as “semitone, tone, semitone, tone, semitone, tone, semitone, tone”.
The whole-half diminished scale (play and animate scale) is similar, but the pattern is shifted by one: “tone, semitone, tone, semitone, tone, semitone, tone, semitone”.
The whole tone scale (play and animate scale) has only 6 notes and is defined only with tones: “tone, tone, tone, tone, tone, tone”.
Similarly, the chromatic scale (play and animate scale) has 12 notes and is defined only with semitones: “semitone, semitone, semitone, semitone, semitone, semitone, semitone, semitone, semitone, semitone, semitone, semitone”.

Most of the music we hear is built upon one, or a few, scales. Chords, for example, are built using different notes in a scale. The most common type of chord is a triad, which, at a high and imprecise level, are three nearby-but-not-too-much notes played together. Or to put it in covid-terms, three notes that are hanging out while social distancing. To put it a bit more precisely, the basic triad stacks the first, third, and fifth position in a scale and plays them together. The scales we just looked at actually give us the four main triads:
The major scale gives us a major triad (play).
The natural minor scale gives us a minor triad (play).
The half-whole diminished scale gives us a diminished triad.
The whole-half diminished scale gives us the same diminished triad!
The whole-tone scale gives us an augmented triad.
Although not a typical triad, the chromatic scale also gives us… a cluster triad?

### Creativity
Now for this last segment, where I combine the two topics I just presented, let’s come back to our scales (show scales).
Semitones and tones are a lot of letters, aren’t they? What if we used shorthand and used a 0 for semitones and a 1 for tones? Now we’ve got binary strings! And we know how to convert from binary strings to numbers (show animation with exponents).
So this means the major scale is the binary number 1101110 (which is equivalent to the decimal number 110), the natural minor scale is the binary number 1011011 (which is equivalent to the decimal number 91), the half-whole scale is the binary number 01010101 (which is equivalent to the decimal number 85), the whole-half scale is the binary number 10101010 (which is equivalent to the decimal number 170), the whole-tone scale is the binary number 111111 (which is equivalent to the decimal number 63), and the chromatic scale is twelve zeros, which is equivalent to the decimal number 0.
Also remember that we can convert any number back to its binary string. So this means we can take any number and convert it to a scale! Obviously not all of them will work well, and some will be really long. Also, any binary number is equal to the same number with as many leading zeros as you’d like, which is problematic for us since 0s stand for semitones.
So for this episode we’ll focus on binary strings of length at most 12. What I’ll do is generate a random number between 0 and 1024 (which is 2^11), convert it to binary, and then read out from right-to-left until i’ve reached an octave; that will be my scale. Here are some examples.
The root note I’ll select by playing a note in the lowest octave on the piano, and then my software will play “jiggling” triads based on this root note, and I’ll improvise on this. The “jiggling” notes create dropping particles, and what I improvise can shove these around, as long as I’m playing notes that are part of the scale!
Enjoy!


### Acknowledgements

Once again, my siblings Alvaro and Melissa, my wife Michelle, and my friend [Ralph](https://www.youtube.com/channel/UCroPLKi0ML5xFMYjiHDTyCQ) gave me great feedback in the initial version of this episode. Special thanks to Alvaro, who caught a "bug" I had in the "cluster triad", where I played C, C#, and D, instead of the correct C, D, and E.

I didn't know how to get the assembler code from a C++/Python program, so [I asked Twitter](https://twitter.com/pcastr/status/1340289847504867328). Thanks to all who responded, but especially [Willian H. Hsu](https://twitter.com/banazir/status/1340293096513351681) and [my very good friend Mo](https://twitter.com/moelhelaly/status/1340328424079015937).

[Subscribe to the YouTube channel!](https://www.youtube.com/channel/UCrZNf0XkxtXE0tsy1y2RT0w).
