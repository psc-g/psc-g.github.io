---
title: "Crosswords: A General Intelligence Challenge?"
date: 2022-04-19T08:06:25+06:00
hero: /posts/misc/crosswords/banner.png
description: Crosswords - A General Intelligence Challenge?
menu:
  sidebar:
    name: Crosswords
    identifier: crosswords
    parent: misc
    weight: 10
---

I have become obsessed with crossword puzzles, specifically
[the NYT crosswords](https://www.nytimes.com/crosswords), since
my friend Ralph Crewe gently forced me to start doing them.
Although I'm not still at his level, I've been working on them
daily and getting noticeably better.

In doing so I've come to realize they are a fantastic mechanism for generally
capable problem-solving, and in this post would like to explain the various
types of challenges they present. I'll be using past NYT crossword puzzles as
examples (they're all at least a week old so should hopefully not be spoilers
for anyone).

I hope this post inspires you in some way, be it to think of
new challenges for generally capable models/agents or (even better!)
to get you into solving these puzzles. If you read until the end,
there are some prizes you could win :).

## Beyond Scrabble

Although reminiscent of [Scrabble](https://scrabble.hasbro.com/en-us), the possible
solutions to Crossword puzzle clues are taken from a much, much larger set than the
set of valid Scrabble words. Here are a few clues, their answers, and what makes them
different from Scrabble words (taken from the January 18, 2021 puzzle):

- **Boxing venue (5 letters):** _ARENA_. A valid Scrabble word.
- **Russian "no" (4 letters):** _NYET_. A non-English word.
- **City where you won't find the Parthenon (10 letters):** _ATHENSGEORGIA_. Two words, the name of 
  a place (not allowed in Scrabble), and a tricky clue for a Monday (bit fit the theme
  of the puzzle, more on that later).
- **CPR pro (3 letters):** _EMT_. An abbreviation.
- **I.R.S. agent, quantily (4 letters):** _TMAN_. Mixture of two words and an abbreviation, and mostly
  a colloquial phrase.


## Weekly patterns (curriculum learning)

One of the cool things about the NYT crossword puzzles is that they get
increasingly harder sa the week progresses: Monday puzzles are the easiest,
Saturdays are the hardest, and Sundays are the biggest (but apparently
at a mid-week difficulty-level); I think the Thursday puzzles are actually
the most fun (more on that later).

Compare Monday and Saturday clues from the same week:

- **The Lone Star State (Monday, 5 letters):** TEXAS
- **C-worthy (Saturday, 4 letters):** SOSO

Of course, not all Monday clues are that easy and not all Saturday clues are
that hard, but there is a clear difference between the two. This pattern of
increasing difficulty is repeated each week.

Curriculum learning, anyone?

## Letter limits (constraint satisfaction problems)

Solving crosswords is ultimately a constraint satisfaction problem: while there
are many words that could be valid solutions, they need to have fit in the
provided blank squares, _and_ they have to fit with the clues going in the
orthogonal direction. Consider the following clue from the January 5, 2021
puzzle:

{{< img src="/posts/misc/crosswords/csp.png" width="35%" title="Constraint satisfaction" align="center" >}}

There are a number of possible 6-letter solutions we could consider, including
"pop hit", "big hit", and "top hit". But when we start filling in some of the
Down clues:

<p align="center">
  <img src="/posts/misc/crosswords/csp2.png" width="35%" />
  <img src="/posts/misc/crosswords/csp3.png" width="35%" />
</p>

we start to see that "big hit" is the only one that fits of the options we
were considering (and is, in fact, the correct answer).

{{< img src="/posts/misc/crosswords/csp4.png" width="35%" title="Constraint satisfaction" align="center" >}}

## Being "well-versed" (knowledge databases)

The more "general knowledge" you know, the better you will be at solving
crosswords. This includes all types of knowledge such as history (both ancient
and recent), geography, sports, music, cinema, etc. Take, for example, the
following clues and answers from the January 6, 2021 puzzle:

- **Actor Poitier (6 letters):** SIDNEY (Historical showbiz)
- **Cowboy's lasso (5 letters):** RIATA (Knowing (somewhat niche) job-specific lingo)
- **Holy scroll (5 letters):** TORAH (Knowing about various religions)
- **City near Leeds with historic walls (4 letters):** YORK (Geography)
- **Reproductive cells (3 letters):** OVA (Biology)
- **Best picture winner directed by Ben Affleck (4 letters):** ARGO (Showbiz)
- **1950s-'60s entertainment group (7 letters):** RATPACK (Historical pop culture)
- **Spineless (5 letters):** _EBOOK_ (This one requires thinking "out of the
  box", having the mental model that physical books have spines (but their
  electronic counterparts don't), and having a sense of humour!

## Crosswordese (memorization can help)

There are a few short answers that are frequently used in NYT crossword puzzles.
As you get to know these, they become useful in solving the harder puzzles
(since you can usually get those "for free"). Some of the ones I recognize
pretty quickly now are "ORE", "ARIA", "ERNE", and "EDDY".

Although the clues do change, their general meaning does not; thus, a certain
amount of memorization _does_ help in this case!

## Themes (higher-level structures)

Many puzzles have a theme that, once you figure it out, can help you solve some
of the clues. For example, take the following clue from the January 18, 2021
puzzle:

- **City where you won't find Virgil's Tomb (13 letters)**

On its own it seems like any 13-letter city could fit, and in general seems like
a very strange clue. However, if you already solved "Athens, Georgia" (see [above](#beyond-scrabble))
you would know these clues are using US cities with the same names as what the
clue suggests. Since you're ["well versed"](#being-well-versed-knowledge-databases),
you know both that Virgil's tomb is in Naples, Italy, and that there is a
city in Florida called Naples, yielding the correct 13-letter answer:

- _NAPLESFLORIDA_

<hr>

The "pyramid" puzzle is also a great themed puzzle, where many of the answers relate
to the theme (see [grid structure](#grid-structure-visual-abstractions) section below).

{{< img src="/posts/misc/crosswords/khufu.png" width="35%" title="2021" align="center" >}}

<hr>

Sundays are always(?) themed and (I think) are the only day where the puzzle has a name
(e.g. the theme). The Sunday puzzle on February 6, 2022 was titled "Sci-Fi Showdown" and
was really neat, as you could either enter _STARWARS_ or _STARTREK_ as your favourite
sci-fi franchise (I went with _STARWARS_ when I filled it 😊):

{{< img src="/posts/misc/crosswords/sciFiShowdown.png" width="35%" title="2021" align="center" >}}

Many clues in the puzzle were related to that theme:

{{< img src="/posts/misc/crosswords/sciFiShowdownRebel.png" width="35%" title="2021" align="center" >}}

## Grid structure (visual abstractions)

Sometimes the crossword grid itself is part of the clue. Here are a few examples
I recently solved.

In the first, from October 12, 2020, we can see that the clue says the grid
represents a place, and we can see that there are some grayed out squares and
circles, which I initially mistook for windmills.

{{< img src="/posts/misc/crosswords/flowerGarden.png" width="35%" title="2021" align="center" >}}

After completing a few of the across clues, I realized that they weren't windmills,,
but flowers!

{{< img src="/posts/misc/crosswords/flowerGardenSolved.png" width="35%" title="2021" align="center" >}}

<hr>

The next one, from March 22, 2022, we see that two magents are part of the black
squares. The highlighted clue was reasonably easy (especially for me, since I
used to like heavy metal as a kid):

{{< img src="/posts/misc/crosswords/iron.png" width="35%" title="2021" align="center" >}}

Since _IRON_ was "touching" the magnet, it gave me a pretty strong clue that _IRON_ would
be touching the other ends of the magnets, which turned out to be true:

{{< img src="/posts/misc/crosswords/ironSolved.png" width="35%" title="2021" align="center" >}}

<hr>

This one, from March 27, 2022, was pretty fun. The circles are drawing a pyramid, combined
with the multi row/column clue is a strong hint as to what they're referring to.

{{< img src="/posts/misc/crosswords/khufu.png" width="35%" title="2021" align="center" >}}

Here you can see the circles actually end up spelling _THE GREAT PYRAMID OF GIZA_!

{{< img src="/posts/misc/crosswords/khufuPartialSolved.png" width="35%" title="2021" align="center" >}}

## The rebus (exceptions to the rules)

Although you normally fill each blank square with a single letter, there are
sometimes exceptions. An exception to this rule is known as a _rebus_. From
[this NYT article](https://www.nytimes.com/2017/06/01/crosswords/yes-you-can-write-more-than-one-letter-in-a-square.html):
"A rebus can be a letter, number or symbol that represents a word, but in many
crosswords, _the rebus will be a word or group of letters that need to be
written inside a single square_."

Some examples of this:

- In the December 1, 2011 puzzle, the rebus "JACK" was used at the end of "LUMBERJACK"
  and at the start of "JACKSTRAW":

{{< img src="/posts/misc/crosswords/jackRebus.png" width="35%" title="2021" align="center" >}}

- In the January 1, 2021 puzzle, 4 numbers were part of some answers; those 4
  numbers were "2021", so they held a special meaning for this day's puzzle:

{{< img src="/posts/misc/crosswords/2021.png" width="35%" title="2021" align="center" >}}

## Tricky ones (out-of-distribution)

Some of puzzles can be quite tricky, but are immensely satisfying once you
figure it out.  This is especially true on Thursdays, which is my favourite
puzzle day, where there is always some "trick" to solving the puzzle.  Solving
these really forces you to go "out-of-distribution" for what a standard "grid
of words" looks like, requiring all the skills mentioned above, and more!
Each of these is also very unique, so it's not really something you can imagine
"preparing" for, other than solving lots of puzzles and being creative!

Here are a few recent ones I worked on that I thought were super fun and
challenging (most of these are Thursday puzzles):

### Cross your t's

The Feburary 3, 2022 puzzle was my introduction to Thursday puzzles. This was
one of the first ones I worked on and could not figure out many of the clues,
and what's more, I couldn't even understand the answers when I revealed them!

The "Key lime" clue suggested to me this had something to do with pies... but it
was a pretty long answer so wasn't sure...

{{< img src="/posts/misc/crosswords/crossTsKeyLime.png" width="35%" title="2021" align="center" >}}

This clue really confused me, "many homes" don't usually have intravenous devices in them...
or does IV mean 4?

{{< img src="/posts/misc/crosswords/crossTsIV.png" width="35%" title="2021" align="center" >}}

It turns out the trick is solving this clue:

{{< img src="/posts/misc/crosswords/crossTsClue.png" width="35%" title="2021" align="center" >}}

"Cross your t's"! This means that "Key lime" should really have been "Key time" and
the answer was _MOMENTOFTRUTH_, while "IV" should realy have been "TV" and the answer was
_ROKU_ (which is another one of the [Crosswordese](#crosswordese-memorization-can-help),
by the way).

{{< img src="/posts/misc/crosswords/crossTsSolved.png" width="35%" title="2021" align="center" >}}

### Letter sounds

The February 24, 2022 puzzle had letter sounds as part of the answer. Was quite tricky
to get but once you got one, the other ones were simplified quite a lot!

<p align="center">
  <img src="/posts/misc/crosswords/lettersI.png" width="35%" />
  <img src="/posts/misc/crosswords/lettersC.png" width="35%" />
  <img src="/posts/misc/crosswords/lettersM.png" width="35%" />
  <img src="/posts/misc/crosswords/lettersS.png" width="35%" />
</p>

### Just add water

The March 3rd, 2022 was very clever. The images below reveal the answers
to four clues, which seem to be nonsensical...

<p align="center">
  <img src="/posts/misc/crosswords/h201.png" width="35%" />
  <img src="/posts/misc/crosswords/h202.png" width="35%" />
  <img src="/posts/misc/crosswords/h203.png" width="35%" />
  <img src="/posts/misc/crosswords/h204.png" width="35%" />
</p>

But when you solve the unifying clue, they make sense! Figuring out
how is left as an exercise to the reader 😉.

{{< img src="/posts/misc/crosswords/h20clue.png" width="35%" title="2021" align="center" >}}

### Raise the bar

The March 24, 2022 is another one where I had to get my friend Ralph
to explain the answers to me. This one used a [rebus](#the-rebus-exceptions-to-the-rules):
_BAR_:

{{< img src="/posts/misc/crosswords/raiseTheBarSolved.png" width="35%" title="2021" align="center" >}}

But I looked at some of the other answers, they didn't quite make sense (e.g. "Sushi" isn't
a place):

<p align="center">
  <img src="/posts/misc/crosswords/raiseTheBar1.png" width="35%" />
  <img src="/posts/misc/crosswords/raiseTheBar2.png" width="35%" />
  <img src="/posts/misc/crosswords/raiseTheBar3.png" width="35%" />
  <img src="/posts/misc/crosswords/raiseTheBar4.png" width="35%" />
</p>

However, "raise the bar" holds the key piece. The answers to the 4 clues above actually include
the _BAR_ rebus above: hence, raise the bar! So this puzzle wasn't just hard because it included
a rebus, but the rebus was part of the answers _below it_! 🤯

## A challenge for Machine Learning?

I hope this post has made it clear that crossword puzzles test all sorts of cognitive abilities,
and having a model/system that can solve them would be truly remarkable. And maybe
it can be done! But at that point, my question would be: can it do anything else?

If a model/system can solve crossword puzzles, can we say it's "intelligent"? Can we say it's
"AGI"? If another model/system can do lots of really impressive things at super-human level
but fail miserably at solving crossword puzzles (even the Monday ones), does it mean it's
not "AGI"?

Taking a step back, my personal opinion is that AGI is an ill-defined goalpost, and I don't
personally understand why so many in our field are so focused on "reaching" it. The ML
models/systems we've been developing over the years are incredible enough and have allowed
us to do so many things that were previously thought impossible.

But most of these achievements are focused on a pretty specific task and can't
do much else.  And that's fine by me! I think ML models/systems that are
developed for solving/improving specific objectives can have enormous benefits
for society (and are likely simpler to diagnose/understand to ensure we're
building/deploying them in a fair and ethical way).

Coming back to crosswords: My buddy Ralph is _so_ much better than me at solving
crosswords, does that mean he's more "intelligent" than me? Maybe, but I don't think so.
I just think he's better at solving crosswords than me. Period. He probably can't
prove why the Bellman update operator converges to a fixed point but I can, so does
that mean _I'm_ more intelligent than him? No! We have our strengths and our
weaknesses.

An autamated system that can solve crosswords and nothing else is not "AGI".
It's just an automated system that can solve crosswords. I don't mind if people
choose to call it "intelligent" or not, from my perspective it's just an
automated system that can solve crosswords. And that's impressive!

One final thought to finish this section: the reason people like Ralph
and I do crosswords is not because they make us "smarter" or they help
us become better employees... we do them because we find them super fun
and _enjoy_ them! This is a part of being human that is not present in
any ML system/model (no, I don't think things like intinsic reward are
anywhere near human-style "fun" or "curiosity"... they're just an extra
numerical function to optimize that we made up).

Maybe it's just that we don't really understand human enjoyment well
enough to embed them into ML agents. But once again, I personally
don't really see much of the point of working towards that...
I'm happy to continue beefing up my crossword-solving skills (because
it's fun for me), while continuing to develop a better theoretical and
empirical understanding of reinforcement learning agents in my 
research (also because I find it fun, interesting, and hopefully
useful).

I hope this post at least got you interested in crosswords (if you weren't
already) and you can "join the club". And who knows, maybe it _will_
become a Turint-test-of-sorts and some of you will prove my rant
totally incorrect.

## A machine learning crossword  

To accompany this post, I made my own crossword puzzle! All of the answers
in this puzzle are machine learning; well, all but one (leave-one-out?).

{{< img src="/posts/misc/crosswords/mlPuzzle.png" width="95%" title="2021" align="center" >}}

[Here's](/posts/misc/crosswords/mlPuzzle.pdf) a higher-res PDF version of it.

### Prizes! Prizes! Prizes!

If you manage to solve this puzzle, send me your solution via
[email](mailto:psc@google.com) or [twitter](https://twitter.com/pcastr). I
will donate money to the first 4 people to solve it, the charity can be
chosen by the winner (or I can choose one for them). Google (my employer)
will match donations, so your chosen charity will actually get twice the
amount indicated below! All amounts are in Canadian dollars (sorry, eh).

1. **1st prize:** \$440
1. **2nd prize:** \$390
2. **3nd prize:** \$225

<hr>

Have fun!
