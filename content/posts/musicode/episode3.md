---
title: "Episode 3: Leitmotifs & Variables"
date: 2021-03-11T08:06:25+06:00
hero: /posts/musicode/episode3/banner.gif
description: Episode 3 - Leitmotifs & Variables
menu:
  sidebar:
    name: 3-Leitmotifs & Variables
    identifier: episode3
    parent: musicode
    weight: 10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/o4qUKFHPPnw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code for this episode is available [here](https://github.com/psc-g/musicode/tree/main/ep3).

## The story
I had it in my head that the third episode would talk about [variables](https://en.wikipedia.org/wiki/Variable_(computer_science)) in the section about Computer Science. Originally I thought the musical would be about chords, but it didn't quite fit well with variables. Then I thought about key signatures, thinking that these are kind of like variables in the sense that you can shift any song into different pitches just by changing key signatures; but again, I wasn't very content with the connection. While walking Lucy (my dog) one day it hit me that [leitmotifs](https://en.wikipedia.org/wiki/Leitmotif) are actually quite similar to variables in the sense that you can reference them at any point, and they hold a particular "value" when called.

Once this was decided, it was clear to me that I wanted the performance bit to include a number of leitmotifs that I'd compose. Since leitmotifs are often used in movies and animations, I decided I would tell some type of story with the visuals. This is in contrast to the types of [visuals](https://twitter.com/pcastr/status/1256079736889016321) I'd done previously, which were mostly _reactive_: it's a set of static rules that simply respond to what I'm playing. I'm a big fan of [Disney's Fantasia](https://en.wikipedia.org/wiki/Fantasia_(1940_film)) (original and [2000](https://en.wikipedia.org/wiki/Fantasia_2000)), and I wanted to do something like what was done for the first pieces (Bach's Tocatta and Fugue in the original, and Beethoven's 5th symphony, first movement, for the 2000); specifically, I wanted to be able to tell a story using simple shapes (also, I figured this would just make my animation job easier).

[I asked](https://twitter.com/pcastr/status/1358442602576625668) for pointers to "emotional" animations using simple geometric shapes and got some really interesting suggestions, especially a bunch of experimental films in the [NFB](https://www.nfb.ca/) suggested by my colleague [Fernando Diaz](https://twitter.com/841io). The one that I was most drawn to was [Spheres](https://www.nfb.ca/film/spheres/), and I used that as inspiration for my animation.

I wanted to experiment with smoother movements, so I chose to explore [shaders](https://en.wikipedia.org/wiki/Shader). I posted some [initial experiments on Twitter](https://twitter.com/pcastr/status/1364071303272148993) which some people seemed to like, and the "story" came from these initial experiments.

The initial leitmotif I wrote when humming while walking Lucy (I do a lot of thinking when walking Lucy) and the others came from playing around with the animations and my piano.

## Episode 3: Leitmotifs & Variables

Bonjour, le monde!
Welcome to musicode, the show where we explore a topic in music, a topic in computer science, and combine them in creative ways.
In this third episode we will explore leitmotifs & Variables

### Leitmotifs
 Let me play you something on the piano (play star wars imperial march). Let me play you something else (play Phantom of the Opera theme). And this (play Ride of the Valkyries theme). And one more (play Jaws theme).

 Chances are, you recognized at least one of those melodies, and if you did, chances are they brought to mind certain scenes or characters from movies, musicals, or operas. The reason this happened is because composers wrote these recurring pieces precisely to have this effect on you; and these little pieces are known as leitmotifs.
 Leitmotifs are short, memorable melodies associated with specific characters, places, or even something more abstract like an idea. It’s a very effective tool composers use to guide the audience through the emotional and narrative arc of the piece they’re watching, be it a movie, play, or musical.
 So if you’re watching Star Wars and the Imperial March comes on (play video of Imperial March), even if you can’t yet see Darth Vader on screen, you know he’ll be showing up soon. That type of effect can be very useful to help contextualize things for viewers!
 Leitmotifs are usually melodic, but they can also consist of chord progressions or just rhythm. For instance, although the Isengard Leitmotif from the Lord of the Rings has a melody (play Isengard theme), I personally recognize it more through its rhythm (play only rhythm video).
 One of the earliest instances of leitmotif, that I know of, was in Hector Berlioz’ Symphonie Fantastique, although he called it idée fixe, which means “fixed idea”.
 Berlioz became obsessively in love with a Shakespeare actress named Harriett Smithson, but she basically ignored him. So Berlioz channeled his frustration into his music and wrote this incredible, and groundbreaking, symphony. In it, he composed this little tune (play idee fixe) to represent Harriett, and that melody is present throughout the whole piece.
 After hearing this symphony, Harriett finally answered Berlioz’ many letters, and they eventually married.
 So now you know, if you’re trying to get the attention of someone you’re romantically interested in, all you have to do is write them a world-famous symphony!
 One of the most well-known users of leitmotifs was Richard Wagner, in particular with reference to his massive opera Der Ring des Nibelungen, or The Ring of the Nibelung. This opera is made up of four parts and takes about 15 hours to play completely; Wagner even built a whole theater for its premiere! There are hundreds of leitmotifs used throughout this piece, including the Valkyries leitmotif (play ride theme).
 Nowadays it’s a pretty common technique used in movies and composers use these leitmotifs whenever they want to make reference to a character, place, or idea.
 And that’s a good way to transition to our next section.

 ###Variables

 Remember in the last episode I showed you this simple program to multiply a number by 2? (show program) I mentioned that, even if you don’t know programming languages, you can still kind of understand what’s going on because I’m using words like “number”.  But what is this thing I called “number”. Well, it’s a variable! And variables are essential for programming.
 You can kind of think of it as a container where you can store different things, such as this box. You might, for instance, store a hammer in this box, and whenever you need to hang a new painting, you pull it out of the box, use it, and then put it back in the box.
 But you might also decide to store something different in that box, like for instance some hand cream. So then the next time your hands feel dry you can just go to your handy box. Note that at this point if you need a hammer this box can no longer help you out!
 The box analogy is good to get an intuition on variables, but in reality it’s a little different. Let’s take the variable “number” we mentioned above. It represents a value like 1, 2, 10, or 1729. But where does this number exist? If you recall last episode, this value is stored somewhere in a computer’s memory as just a bunch of ones and zeros; let’s say this location is starting at the 7365th byte in memory.  The variable number indicates the location in memory where this value is held.
 All this memory management can get pretty complicated pretty quickly, and luckily compilers handle it for us most of the time. But occasionally us programmers do actually play around with these memory addresses directly, and when we mess up we sometimes cause our programs to behave very weirdly or even crash!
 Some programming languages, like C++, require you to specify what type of thing you’ll be storing in that variable, and from then on you can only store things of that type. To come back to our box analogy, before storing the hammer in it we would have had to specify that this box will only hold tools. If we then tried to store the hand cream, our box would have said “no, no, no!”.
 Other programming languages, such as Python, are more flexible and allow you to store things of different types (such as a hammer and hand cream) using the same variable name.
 When you define a variable, it typically has a well defined scope, which simply means where this variable is understood. In the simple program that multiplies a number by 2, the scope of the variable number is the function twice. This means that if we’re outside this function, the variable number is not understood. Think of it kind of like a nickname you have for one of your family members. When you use that nickname at home your family knows who you’re referring to; but if you use that nickname somewhere else , people won’t know who you’re talking about. This also means you can use the same variable names in multiple places, as long as the scopes don’t conflict. Think of this like two people having the same name. I’m not the only person in the world who’s called Pablo, but I am the only person in my house with this name so there’s no confusion.
 Finally, some programming languages offer a service called garbage collection which frees up memory of variables that are no longer being used. This is useful because otherwise there’s a chance your program could use up all of your computer’s memory!

 ### Creativity
 For the last part, I have built up an animated story of sorts, and I’ve composed a series of leitmotifs to go along with it. I have my own mental model for what the story is about, but I don’t want to say what it is, I’d be interested in hearing what you think the story is about. So if you’d like, write your interpretation of the animated story in the comments below; I’d love to read the different interpretations!
 Enjoy!


### Acknowledgements

Once again, many thanks to my buddy Ralph Crewe for agreeing to play Isengard's theme on trombone. You should subscribe to his [YouTube channel](https://www.youtube.com/channel/UCroPLKi0ML5xFMYjiHDTyCQ)!

[Subscribe to the YouTube channel!](https://www.youtube.com/channel/UCrZNf0XkxtXE0tsy1y2RT0w).


### Image attributions

For this episode I used a lot of images from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page). Here are the credit attributions:

Darth Vader: Public Domain, https://commons.wikimedia.org/w/index.php?curid=98798708

Phantom of the Opera: By Source - https://www.deviantart.com/marcusburns1977/art/The-Phantom-of-the-Opera-re-draw-830181522, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=86952189

Ride of the Valkyries: By William T. Maud (British, 1865 – 1903) - http://www.theknohlcollection.com/portfolio/detail/the-ride-of-the-valkyrie/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=17441766

White shark: By Bernard DUPONT from FRANCE - Great White Shark (Carcharodon carcharias) attacking a seal shaped decoy ..., CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=95265344

Light bulb: By Producer at Arabic Wikipedia - Transferred from ar.wikipedia to Commons., Public Domain, https://commons.wikimedia.org/w/index.php?curid=4358873

Movie theatre: By Flickr user: Rudy Riet Washington, D.C. https://www.flickr.com/people/rudiriet/ - Flickr: https://www.flickr.com/photos/rudiriet/2458931503/, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=22596622

Broadway: By Photo: Andreas Praefcke - Self-photographed, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=2241894

Opera: By Sefer azeri - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=87311970

Isengard: By J.R.R. Tolkien, Christopher Tolkien - https://www.goodreads.com/book/show/7342.The_Treason_of_Isengard, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=94914876

Berlioz: By Pierre Petit - This file comes from Gallica Digital Library and is available under the digital ID btv1b84543244, Public Domain, https://commons.wikimedia.org/w/index.php?curid=24948084

Harriet Smithson: By Unknown author - http://www.smithson.org.uk/modules.php?name=Web_Links&amp;l_op=MostPopular; https://www.uaf.edu/files/english/people/faculty/reilly/static/NCHCproject/Music.htm, Public Domain, https://commons.wikimedia.org/w/index.php?curid=5519686

Symphonie fantastique score: By manuscrit d&#039;Hector Berlioz - https://gallica.bnf.fr/ark:/12148/btv1b55007824r, Public Domain, https://commons.wikimedia.org/w/index.php?curid=87982251

Wagner: Public Domain, https://commons.wikimedia.org/w/index.php?curid=41894

Nibelung score: By Arnaud 25 - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=61616789

Ring performance: By Somtow at English Wikipedia - Transferred from en.wikipedia to Commons., Public Domain, https://commons.wikimedia.org/w/index.php?curid=2348400

Bayreuth Theatre: By © El Grafo / CC-BY-SA-4.0, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=50273352

Ramanujan: By Konrad Jacobs - Oberwolfach Photo Collection, original location, CC BY-SA 2.0 de, https://commons.wikimedia.org/w/index.php?curid=3911526

Envelope: By Self Scanned - Buisness correspondence - Allentown PA, Public Domain, https://commons.wikimedia.org/w/index.php?curid=94180032

Finger pointing: By Debivort at en.wikipedia, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=17001439

Pablo Neruda: By Revista argentina Siete días ilustrados - http://www.magicasruinas.com.ar/revistero/aquello/revaquello100.htm, Public Domain, https://commons.wikimedia.org/w/index.php?curid=4139599

Pablo Picasso: By Revista Vea y Lea (cuadrado por Juan Pablo Arancibia Medina) - Fuente Original: Mágicas RuinasFUENTE DEL CUADRADO, Public Domain, https://commons.wikimedia.org/w/index.php?curid=5189063

Pablo Escobar: By Colombian National Police - Colombia National Registry; Colombian National Police, Public Domain, https://commons.wikimedia.org/w/index.php?curid=49892673

Pablo Milanés: By FNPI - https://www.flickr.com/photos/135676221@N08/21274021634/, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=48474142

Symphonie Fantastique video: Title: MYA Symphony Orchestra- Symphonie Fantastique I Reveries, Passions
Author: MidwestYoungArtists
Date: 25 November 2015
Original source: https://www.youtube.com/watch?v=2G4D1f_4kIs
