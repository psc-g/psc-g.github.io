---
title: "Tips for Interviewing at Google"
date: 2020-02-24T08:06:25+06:00
hero: /posts/mentoring/interviewing/google_montreal.jpg
description: Tips for Interviewing at Google
menu:
  sidebar:
    name: Tips for Interviewing at Google
    identifier: interviewing
    parent: mentoring
    weight: 10
---

_Disclaimer:_ This post reflects my personal views and not those of my employer.

People often ask me: _How do I get a job at Google?_

An essential requirement is passing the interviews; unsurprisingly, this is another common question: _How do I pass the Google interviews?_

While there is no hard and fast rule to pass the Google interviews, I do have some tips and guidelines that have helped others in the past (including myself). Although most of this post is Google-specific, most of it should still apply for software engineering positions at other companies. This post mostly applies to Software Engineering (SWE) positions, but some of it should still be relevant for other positions (like Research Scientist); see at  the end for some thoughts on this. Although the Google interview process is not perfect, I do feel it is pretty good and objective. Whatever the outcome, remember that your self-worth should not be defined by whether you get an offer.

## Introduction

_Should I even apply to Google?_ is another common question. The answer is almost always: *yes*! It will test your limits, and you'll likely learn something about where you could improve! And if you do try but don't manage to make it through, I guarantee you will be a stronger programmer and interviewer by the end of it.

When I was finishing my PhD my mind was set on becoming an academic, but the job market was really bad at the time (circa 2011). On my supervisor's suggestion, I applied to Google. It was the only industry job I applied for, as it was the industry job that stood out to me the most. But once I decided to apply, I did _a lot_ of preparation for the interview. I am positive I would **not** have passed the interviews if I had taken them the day I applied: the time I spent preparing for the interviews was essential. When I went into the interviews, I felt I was as prepared as I could be. The hard work paid off: I received a job offer to join Google Pittsburgh, and have been working as a SWE at Google since 2012.

{{< img src="/posts/mentoring/interviewing/google_first_desk.jpg" title="One of my first desks at Google" >}}

The rest of this post is based on my experience:
*  Preparing for these interviews
*  Working as a SWE at Google
*  Conducting hundreds of interviews
*  Conducting dozens of interview workshops
*  Being a hiring committee member
*  Many discussions I've had with many people, inside and outside of Google.

Following the suggestions here won't guarantee you'll get the Google job, but it should help.

## How do I apply to Google?

You can check out the main [Google careers site](https://careers.google.com/) to find jobs that you feel would be a good fit.

Referrals often help, so if you know someone already at Google, ask them to refer you. If you don't know anyone at Google, you've already applied and haven't heard back in a while, check out [my post on tips for preparing your resume](https://psc-g.github.io/resume/google/2020/03/09/preparing-your-resume.html). Note that this still does not guarantee you will get called for an interview. Unfortunately I know very little about how candidates are selected for interviews, and have very little influence on that process.

## How do I prepare for the Google interview?

There are (at least) three main components to doing a good job in the interviews: coding, algorithms & data structures, and personality. Google (and other companies) often have workshops where you can do mock interviews; search for them and attend them if you can.

### Coding

You need to be able to write _functioning_ code, ideally that would compile/run right off the bat. The language isn't super important, but you'll need to specify what language you want to interview in, so make sure you know it well. Pseudocode is _not_ a language.

#### Barebones coding

If you rely on fancy IDEs for writing code, go barebones! Turn off syntax highlighting and autocomplete on whatever program you use to write code. In fact, try to use a barebones [vim](https://www.vim.org/) to write all your code (even today I still use a pretty barebones vim for writing most things, including this blog post). I guess you could also use Emacs.

#### Practice, practice, practice

When I was preparing for my interview I had been mostly coding in C++, so I decided to focus on that. I found an online programming competition that had logs of previous competitions, so I could "pretend" I was competing. The great thing is that this online service could programmatically check my code for both syntax and algorithmic correctness. I did enough of them that I could eventually write C++ code from scratch that would compile _and_ solve the problem. It took many, many iterations before I reached this point. For a long time I still had to look up what were the libraries I needed to include, how to do proper I/O, etc.

I don't remember what site I used, but it seems [topcoder](https://arena.topcoder.com/#/u/practiceProblemList) has an arena of practice problems which serve the same purpose.

It's also really useful to go through sites like [glassdoor](https://www.glassdoor.ca/index.htm) where there are lots of past Google interviews. Try solving all those problems! Note that if you see a problem in a place like this, it's very unlikely you'll get asked that problem during the real interviews.

#### Code on whiteboards

Try writing code on a whiteboard (or on a piece of paper _by hand_ if you don't have access to a chalk/white-board). It is _very_ different to code on a whiteboard, but that is what you will be asked to do at the interview. It's best if you've already had some experience doing it! What I'd recommend is to practice writing a full program on a whiteboard, then code it up in your computer and make sure it compiles/runs in one go. If it doesn't, try again!

It's also extremely useful to practice coding on a whiteboard while someone else is watching, to get used to the potential anxiety response.

Although a few syntax errors are ok, we do take note if the coding is sloppy and full of syntax errors. It suggests you may not be as familiar with your preferred language.

### Algorithms & Data Structures

![Introduction to Algorithms](https://prodimage.images-bn.com/pimages/9780262031417_p0_v1_s550x406.jpg)

The book I used to prepare for this was the book I used in my undergrad: [Introduction to Algorithms](https://en.wikipedia.org/wiki/Introduction_to_Algorithms) by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein. I'm sure there are many other books you could use for this purpose, but this is the one I already had on my shelf. Someone suggested that [Introduction to Algorithms: A Creative Approach](https://www.goodreads.com/book/show/105136.Introduction_to_Algorithms) is a good book.

There's no real Minimal Set of Algorithms & Data Structures To Know, but here are a few things you should definitely know about and be pretty comfortable with. Note that this is by no means exhaustive, and if you feel I'm missing something here, let me know!
*  **Sorting**: Know a few different ways of sorting. When would you pick each? What's their complexity?
*  **Linked lists**:  What are they? Can you code up a linked list from scratch? What's the complexity for insertion? For deletion? For searching? When would you use a linked list? Are there different types of linked lists?
*  **Hashing**: What are hash functions? What makes a good hash function? What are collisions? How can you deal with collisions? Average complexity? Worst-case complexity?
*  **Binary trees**: What are they? Can you code up a binary tree from scratch? What's a binary search tree? What's the complexity for searching? For insertion? For deletion? What does it mean for a tree to be balanced? Complexity?
*  **Dynamic programming**: What is it? When is it useful? Can you use it to solve a problem (you can pick from one of the exercises in your book).
*  **Graph algorithms**: Graph traversal (BFS/DFS). Directed versus undirected graphs. Can you code a graph data structure from scratch? When would you use a graph? What are different ways of modifying graphs?

The above list is not a _sufficient_ set of things to know, but I'd say it's a reasonable basis. The expectations for what you should already know are pretty reasonable.

As with coding, the key is to **practice, practice, practice**. As you tackle different problems think about the best data structures to solve them.

It was already hinted in the list above, but you should be able to perform complexity analysis (i.e. big-O) on whatever code you write. I personally almost always ask this question after a candidate finishes writing their code, as it shows they're able to analyze the effectiveness of their implementation. As I'll detail below, even if you can only provide a naive solution to a problem, it helps a lot if you can analyze it properly.

### Personality

This one is kind of hard to prepare for, but it's still important. One of the questions we need to ask ourselves as interviewers is: _Would I want to work with this person?_ If you're a genius and are able to solve all the problems that get thrown at you, but you behave like a total jerk during the interviews, you have a pretty low chance of getting hired. I don't have much advice in terms of preparation, but there are a few points to keep in mind during the interview, which I'll list further down.

## During the interview

Congratulations, you have interviews scheduled! This is already a great achievement (not everyone gets invited to interviews), so you should feel proud of yourself. Here are a few important things to keep in mind:
*  **Think of it as a conversation, not an interrogation.** Although there is clearly a power imbalance in the interview, we're not there trying to trick you or cause you to make mistakes. In fact, most of us are actually secretly rooting for you!
*  **Talk through your thought process.** Make sure you verbalize what's going on in your head, especially before you start putting code on the whiteboard. As interviewers, we need to provide evidence for your good performance, so talking through your thinking helps us gather this evidence. Further, it makes it easier for us to help you if you're going astray into a part of the problem where we don't really want to spend time. If you stay silent and go straight to writing incorrect code, I won't know if it's because you're way off track or if there was a simple misunderstanding in your thought process. On the flip side, if you stay silent and go straight to writing perfect code, I won't know if you're really smart or if you've already seen the question I just asked.
*  **Naive solutions are great starting points.** Don't feel obliged to try to come up with the most efficient solution right off the bat. Starting with the naive solution is a great strategy for a few reasons:
   *  Even though the question may seem trivial, there are usually some tricky edge-cases that are hard to anticipate. They're _much_ easier to find and resolve with a naive solution.
   *  It allows you to put code on the board very quickly, which is great for gathering evidence in your favour!
   *  Complexity analysis on a naive solution is probably much easier than on a more complex solution.
   *  If you can code up the naive solution very quickly, that's great! Once it's down you can move to a more complex solution, but at least you have a solution that works as a baseline.
   *  It will be _much_ easier for the interviewer to understand a naive solution than a complex one. And you want the interviewer to understand your solution: you don't get points for tricking/confusing the interviewer!
   *  Walking through a naive solution is a "manual profiler" of your code, helping you identify redundant work and opportunities for optimization (thanks, Pascal, for this point!).
   *  It goes back to the point about this being a conversation. Starting with a naive solution makes it clear that you know _a_ solution. You can then ask the interviewer if you want to look for a better solution.
   *  But once again, make sure you tell the interviewer that you're starting with a naive solution.
*  **It's ok to make simplifying assumptions.** If it helps you think through the problem more clearly, it's totally fine to make simplifying assumptions (e.g. "Can I assume the list is already sorted?"), for reasons similar to the point on naive solutions. This is in fact a great signal, as it shows that you can decompose a problem into parts, and that you can identify those parts that cause more problems. Once you solve the problem with the simplifying assumptions, you can work towards a solution that doesn't require the assumptions; but at least you already got a working solution on the board!
*  **Use test cases.** Come up with a few test cases that you can test on your code. Try to anticipate edge cases (e.g. empty lists, out-of-bounds indices, special characters when you're expecting only letters, etc.). Writing down a few test cases will help you make sure your code is correct, and it will also help convince the interviewer of this! Additionally, having a set of concrete examples on the board is really useful when trying to sort out misunderstandings with the interviewer. The interviewer may even add a few extra test cases to highlight some other edge cases you may have missed.
*  **It's ok to take a few minutes to gather your thoughts.** Even though I suggested talking through your thought process, don't feel obliged to be talking the whole time, _especially_ if you don't have your thoughts fully organized yet, as it can often lead you astray. Simply say "Can I take a minute or two to collect my thoughts?", and then work things out in your head. The important thing is to let the interviewer know this is what you're doing. If you feel it's taking you too long to collect your thoughts, you may be getting confused by a part of the problem, which brings me to my next point:
*  **It's ok to ask for help.** If you're feeling stuck, feel free to ask for help, but try to be specific about what is giving you problems. Often it might just be you misunderstood something in the question, you failed to notice a key aspect of the question, or occasionally it can even be that the interviewer forgot to mention an important piece of the question! I've had interviews where the candidate seemed really stuck, but once I gave them a little bit of help, they were able to solve the problem.
*  **It's ok to not know everything.** When I was doing my interviews, I was implementing a custom data structure to facilitate the rest of the code for my solution. The interviewer asked me: "why don't you just use a map?", to which I responded "I don't know what that is.". The interviewer quickly explained the syntax for maps on the board (which was a cleaner version of my "custom data structure"), and then I was able to solve the question much faster. I don't know if I got "points" taken off for not knowing that, but I still got the job.
*  **There is no single "correct" solution.** At least not in most interviews. My favourite questions to ask are those that I can state very quickly, are easy to understand, admit both naive and more efficient solutions, and can easily be made more complex. I think most interviewers ask these types of questions. This means there is no answer we're expecting you to reach, the further you can go, the better!
*  **Don't ask if your solution is correct.** It's better to try to work through your solution with test examples and convince yourself (and the interviewer) of its correctness.
*  **Disagreements are ok.** It's ok to disagree with the interviewer, but do so in a polite way. It really helps to use concrete artifacts (such as code and test examples) to ground your arguments; verbal-only discussions can often lead to misunderstandings which can eat up from the limited time you have. Try to understand the interviewer's points (even if they seem wrong), and calmly try to ensure that the interviewer understands your points.
*  **Think of each interview as a fresh start.** If you felt one of your interviews went really poorly, try to put this behind you (or postpone thinking about it until the end of the day) and tackle the next interview afresh. I know this is much easier said than done, but try to remember the next interviewer will not know how you performed in the previous interview. As described below, you may still be able to pass the interview even if one of your interviews went badly!
*  **If given time for it, ask questions.** I try to leave some time at the end for candidates to ask general questions about working at Google, my role/experience, etc. It's not required, but it does show you're keen and interested if you have some questions. If you've run out of questions to ask a good fallback is to ask the interviewer to tell you about their role and their experience at Google. _Don't_ ask "How did I do in the interview?" or "What was the right solution?", because we won't be able to answer that and it may make things awkward.


## After the interview

Phew! You made it through, congratulations again! Timelines vary a fair bit, but here is roughly what happens now.

*  Each interviewer will write their feedback for you and provide a hire/no-hire recommendation. Interviewers don't get to see the feedback of the other interviewers.
*  Your packet -- which includes everything: your resume, your interview feedback, past interviews, etc. -- will go through a few hiring committees (but I don't know exactly how many). These are a group of Googlers (none of which interviewed you) that will read through your packet and provide their own hiring recommendations, based on what they read. There will be multiple people reading your packet and providing feedback.
*  Based on the decisions from the hiring committee(s), there are a few different things that can happen:
   *  You get an offer. Woohoo!
   *  You get called in for extra interviews. This does not necessarily mean you didn't perform strongly enough in your interviews. It can be for a number of different reasons, such as that there's a type of skill that wasn't properly evaluated during your interviews.
   *  You're being considered for a different role. Again, this is not a bad thing, it just means that based on your packet the various committees felt a different role would be a better fit. This will possibly involve a few extra interviews. Ultimately, this is a good thing, the role you applied for might not be what you thought it was.
   *  You don't get an offer. I'm sorry if this is your outcome. Getting a job offer at Google is _very_ hard, and people have suggested there is a [high false-negative rate](http://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html). So don't feel discouraged! The work you put into preparing for this interview, and the experience of the interview itself, will definitely help you perform better in other interviews. Finally, you can always reapply after a year! I have reviewed packets that initially received a no-offer, only to come back a year later and get an offer.

## Final thoughts

This post ended up being a lot longer than I anticipated, but I really hope it proves useful to you. Although it is written mostly for SWE interviews at Google, most of these suggestions should be applicable to SWE positions at other companies. I interviewed for Shopify a few years ago and I applied all the techniques above; I ended up getting an offer, but declined it as I got invited to join Google Brain (where I am happily working now).

This post should also be somewhat helpful for non-SWE roles. The non-SWE role I am most familiar with is Research Scientist (RS). I have conducted a few research interviews for RS roles, but not enough to be able to provide concrete guidance. What I will say, though, is that even for RS roles you have to pass some coding interviews. I interviewed someone for an RS role who was super strong on the theory but did quite poorly in the coding interview, so I gave a no-hire recommendation (the person never joined Google, but I don't know if an offer was made or not).

There are also many other people who have shared really valuable advice. [Mekka Okereke](https://twitter.com/mekkaokereke) shared some great advice in [this thread](https://twitter.com/mekkaokereke/status/1135981075086266368), as well as [Steve Yegge](http://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html) (thanks Pascal for reminding me of these posts!). A few people have also suggested [Cracking the Coding Interview](https://en.wikipedia.org/wiki/Cracking_the_Coding_Interview) as a good book to study.

Google also provides a [tech dev guide](https://techdevguide.withgoogle.com/) which seems quite useful.

If you have suggestions, unanswered questions you'd like addressed here, or any other types of comments, feel free to reach out (see footer below).

## Acknowledgements

Thanks to [Pascal Lamblin](https://twitter.com/blip42), [Pierre-Antoine Manzagol](https://twitter.com/PManzagol), Daniel Kenji Toyama, [Marlos C. Machado](https://twitter.com/MarlosCMachado), and Michelle Sinclair for their helpful feedback!
