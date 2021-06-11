---
title: "Tips for Reviewing Research Papers"
date: 2021-06-10T08:06:25+06:00
hero: /posts/mentoring/reviewing/banner.gif
description: Tips for Reviewing Research Papers
menu:
  sidebar:
    name: Tips for Reviewing Research Papers
    identifier: reviewing
    parent: mentoring
    weight: 10
---

The [NeurIPS 2021](https://neurips.cc/) review period is about to begin, and
there will likely be lots of complaining about the quality of reviews when they
come out (I'm often guilty of this type of complaint).

I decided to write a post describing how I approach paper-reviewing, in the help
that it can be useful for others (especially those who are new to reviewing) in
writing high quality reviews.

I'm mostly an RL researcher, so a lot of the tips below are mostly from my
experience reading RL papers. I think many of the ideas are applicable more
generally, but I acknowledge some may be more RL-specific.

If you have feedback on any of the points below (or if you feel there are points
I'm missing), [let me know](https://twitter.com/pcastr)!

## Tools

I do all my paper reading on my iPad. I use [PDF Expert](https://pdfexpert.com/)
connected to my [Google Drive](https://drive.google.com/corp/drive/my-drive), where
I organize papers in sub-folders for topics (and I'll have one for reviews).

The reason I like this setup is that it avoids me having to print anything, I can
access my annotated papers from anywhere, and it's easier to keep track of papers
that I have/want to read.

## Timeline

I start reviewing pretty much as soon as the review assignments come out. This
means I can review at a fairly leisurely pace and I have enough buffer time for
papers that require more attention.

## Randomizing order

There is apparently _some_ correlation between paper ID and acceptance rate, and
there are likely many causal factors that explain that correlation. But to try
to avoid any such biases, I try to review the papers in some type of random
order (or at least not just front-to-back or back-to-front).

## Entering reviews

I annotate the PDFs of the papers I'm reviewing and write down an initial
assessment (accept, weak accept, etc.), but I _don't_ enter my review or score
into CMT/OpenReview/etc until I'm done reviewing all the papers.  The reason I
do this is because it allows me to calibrate myself across all the papers (e.g.
I may have reviewed the first paper more leniently/harshly than I did the later
papers).

## Doing the reviews

Each section below explores different aspects I consider when reviewing.

###  Problem and contribution

> **What is the problem the paper is addressing? How is this paper contributing
to understanding/solving the problem?**

Alternatively: What is the main message of the paper? Is it clearly stated?
Could I summarize the paper in one or two sentences?

This is useful not just for contextualizing the results, but also when entering
the reviews as you are typically asked to provide a summary. It is also for the
other reviewers and AC of the paper, as it helps ensure that the different
reviewers understood the paper in the same way.

### Impact

> **Can future research build on these results?**

There is often an unfortunate tendency to require "state-of-the-art" results for
a paper to be accepted. In my view, this is the wrong yardstick on which to evaluate
scientific merit. I think the value of a paper should come from whether I feel
future work can build on it.

In the meta-reviews I received for [one of my papers](https://psc-g.github.io/posts/research/rl/scalable/)
the AC said there was a fair bit of discussion between the reviewers, but in the
end they decided to accept it because they felt future research could build off of it.
I'm happy to see that [it is in fact the case](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=14556082876399502510).

Of course, state-of-the-art results are important and can be meaningful, but
only if it the methodology is reproducible, well-explained, and robustly
evaluated (more on this below).

### Theoretical results

> **Are the theoretical results clearly presented, meaningful, and useful?**

Theory is nice, but in my view it needs to serve a purpose. You don't get extra
points just for including a theorem in your paper if that theorem is just
showing a completely vacuous bound.

On the other hand, demonstrating how an algorithmic contribution can be
derived from theoretical principles is a great way for motivating design
decisions.

I'm not going to lie, reviewing theoretical results can be hard. But
_just reading the theorem/proposition is not enough_! Please make an
effort to go through the proofs and try to understand the development. I
have found errors in the proofs of a number of papers I have reviewed
(often the authors were able to fix the proofs in time).

If you don't understand something in a proof, _it's ok to ask questions_!
Try to honestly gauge your level of expertise. If you _feel_ like you
should be able to follow proofs of the type you're reading, then it's
possible the authors did a poor job of presenting it. Ask the authors
to clarify the proof, it will only help in clarity (and may sometimes
even reveal a bug in the proof!).

I find some theoretical papers can go a little overboard with notation;
this can include very long theorem statements (I once reviewed a paper
with a theorem that took a full double-column page to state!) and
excessive use of variables (I once reviewed a paper that ran out of
Greek letters!). These papers are _extremely_ hard to read, even for
experts; as stated above, the contributions made should be clear
so others can build on it. Proof sketches, high-level theorem
summaries, and illustrative examples can go a long way in helping
clarify things without sacrificing mathematical correctness.

### Empirical results

> **Were the experiments well-designed, carefully executed, clearly explained, and fairly evaluated?**

There have beeen a number of papers in the past few years pointing out
the lack of rigour in empirical evaluations: cherry-picking seeds,
unfair comparisons against baselines, insufficient independent runs, etc.

Things I look out for in evaluating empirical results are:

*  How many independent runs were used? In my opinion 3 is the bare minimum, but
   5 is ok especially if running on expensive environments like the
   [ALE](https://arxiv.org/abs/1207.4708).
*  Do their performance curves report variance via confidence intervals,
   standard deviation, or other? If not: ask for them! Is the choice of
   confidence level (e.g. 90\%, 95\%, etc.) justified? Ask what method they
   used to compute the confidence intervals; they should probably be using
   bootstrapping, but that is not what most people use.
*  Are the authors comparing against reasonable baselines? If not, ask them why!
*  It is common for authors to **bold** the "winners" in tables (typically
   their method). This should _only_ be done if the confidence intervals
   between the compared methods _don't_ overlap; if they do overlap, then the
   result is not significant and the authors should _not_ be bolding! Note that
   non-overlapping confidence intervals is a good first order approximation,
   but a more rigorous statistical test would really be best.
*  If the new algorithm and the baseline share hyperparameters and these were
   tuned for the new proposed algorithm, were they also tuned for the baseline?
   If not: ask why!
*  Is the algorithm/method understandable? Do you feel like you could implement
   it based on the description given? Diagrams/figures can go a long way in
   helping clarify architectures and multi-component systems. Remember: one of
   the important points for accepting a paper is whether others can build off
   of the idea!
*  Is there code provided? This is becoming increasingly important as there are
   often implementation details which, while seemingly unimportant, can be
   crucial to an algorithm's success. I will often at least glance through the
   code to make sure it seems to match what is being described in the paper.


### Supplemental material

> **Read the supplemental material!**

Although we're typically not required to look at supplemental material, I find
it important to do so. Often there are important details there (proofs, extended
empirical evaluations, hyperparameter settings, code) that are important
in properly evaluating a paper.

Occasionally I have suggested to authors that certain parts of the supplemental
should be put in the main paper, replacing some other main section that I found
less important to the paper's central message.


## Self-evaluation

> **Do I know this field well enough and do I feel I understood the paper well enough?**

Please be honest with yourself. It's ok to say you are unfamiliar with the field
and/or that you were not able to follow the paper; if other reviewers were also
confused then it might be a good indication that the authors did not do a good
job presenting their work. Making an honest assessment of your confidence on your
review can also help the AC properly weigh the various points made.

## Discussion period

> **Participate throughout the discussion period!**

Get started early in the discussion period! If no one has started the discussion,
start it yourself! It's important to read the other reviews to see on what points
you're in agreement/disagreement. If you seem to be in disagreement with most of
the other reviewers, that's ok, but be prepared to defend your position!

Also: _it's ok to change your mind_! That's part of why the discussion period is
there! Don't feel shy to challenge other reviewers (even if they're more senior
than you) in a respectful manner, and don't feel embarassed to say "I was mistaken,
I'm going to change my score".

## Conclusion

Reviewing is a very important part of academia, but it takes time to do well. If you
feel you don't have the time to review, then it may be better to not accept invitations
to review. My rule for accepting invitations is:
*  Always review for conferences where I'm submitting
*  Always review journal papers that are in my area of research
*  (Mostly) always review for LatinX in AI, Black in AI, and similar workshops.

I've learned a lot from reviewing papers: good things to include in my own papers,
bad things to avoid, proof techniques, and interesting algorithmic ideas. View
it as a learning opportunity and as a way to improve our field; you'll want high
quality reviewers for your own papers!

Finally, I approach reviewing the way I approach interviewing candidates:
> _Look for reasons to accept the paper, rather than looking for reasons to reject
the paper._

Thanks, and good luck!

## Acknowledgements

Thanks to Marlos C. Machado and Johan Samir Obando-Ceron for their feedback in
improving this post!
