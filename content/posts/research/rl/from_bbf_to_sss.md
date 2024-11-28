---
title: "From \"Bigger, Better, Faster\" to \"Smaller, Sparser, Stranger\""
date: 2024-11-27T08:06:25+06:00
hero: /posts/research/rl/from_bbf_to_sss/banner.png
description: "From \"Bigger, Better, Faster\" to \"Smaller, Sparser, Stranger\""
menu:
  sidebar:
    name: From BBF to SSS
    identifier: bbftosss
    parent: rl
    weight: 10
---

This is a post based on a talk I gave a few times in 2023. I had been meaning to put it in blog post form for over a year but kept putting it off... I guess better late than never. I think some of the ideas still hold, so hope some of you find it useful!

## Bigger, better, faster

In the [seminal DQN paper](https://www.nature.com/articles/nature14236), Mnih et al. demonstrated that reinforcement learning, when combined with neural networks as function approximators, could learn to play Atari 2600 games at superhuman levels. The DQN agent learned to do this over 200 million environment frames, which is roughly equivalent to 1000 hours of human gameplay...

_This is still quite a lot!_ We can't always assume cheap simulators are available; sample efficiency is key!

[Kaiser et al.](https://arxiv.org/abs/1903.00374) introduced the Atari 100k benchmark which evaluates agents for 100k agent interactions (or 400k environment frames), equivalent to roughly 2 hours of human gameplay.

In [Bigger, Better, Faster: Human-level Atari with human-level efficiency](https://arxiv.org/abs/2305.19452), our ICML 2023 paper, we introduced BBF, a model-free agent which was able to achieve superhuman performance with only 100k agent interactions:

{{< img src="/posts/research/rl/from_bbf_to_sss/bbf_fig1.png" title="BBF over time" width="50%" align="center" >}}

To achieve this, we combined a number of recent techniques from the literature, including [SPR](https://openreview.net/forum?id=uCQfPZwRaUu) and [network resets](https://openreview.net/forum?id=OpC-9aBBVJe). The following figure ablates each of the components, indicating which proved to be most important.

{{< img src="/posts/research/rl/from_bbf_to_sss/bbf_ablations.png" title="BBF ablations" width="50%" align="center" >}}

## Yes, but why?

The natural question is: _why_ do we need all these components? We will explore some of the main components in separate sections below.

### Self-supervised learning

[SPR](https://openreview.net/forum?id=uCQfPZwRaUu) was the base agent for BBF, which relies on self-supervised learning (BYOL, specifically). What does self-supervised learning buy us? 

> Good representations!

This is a topic near and dear to me, as I've done a lot of work on it, mostly based on [bisimulation metrics](https://arxiv.org/abs/1207.4114). To read more about my work in this space, see:

*   [Scalable methods for computing state similarity in deterministic MDPs](/posts/research/rl/scalable/)
*   [MICo](/posts/research/rl/mico/)
*   [Contrastive Behavioral Similarity Embeddings for Generalization in Reinforcement Learning](/posts/research/rl/pse/)
*   [A Kernel Perspective on Behavioural Metrics for Markov Decision Processes](https://openreview.net/forum?id=nHfPXl1ly7)
*   [Metrics and continuity in reinforcement learning](/posts/research/rl/metrics_continuity/)

### Network resets

Another critical component of BBF is the use of network resets, as used in [SR-SPR](https://openreview.net/forum?id=OpC-9aBBVJe) (and first introduced in [The Primacy Bias in Deep Reinforcement Learning](https://arxiv.org/abs/2205.07802)). Why do resets help so much?

> Mitigate overfitting and maintain plasticity!

There is a growing body of work demonstrating that RL networks tend to overfit to their most recent data, and this seems to cause a loss in plasticity (which is essential for online RL). Some works exploring this idea are:

*   [The Value-Improvement Path: Towards Better Representations for Reinforcement Learning](https://arxiv.org/abs/2006.02243)
*   [Understanding plasticity in neural networks](https://arxiv.org/abs/2303.01486)
*   [The Dormant Neuron Phenomenon in Deep Reinforcement Learning](https://arxiv.org/abs/2302.12902)
*   [Slow and Steady Wins the Race: Maintaining Plasticity with Hare and Tortoise Networks](https://arxiv.org/abs/2406.02596)
*   [Normalization and effective learning rates in reinforcement learning](https://arxiv.org/abs/2407.01800)

### Larger networks

The use of larger networks was important to achieve BBF's ultimate performance; but scaling networks in RL is really hard. More generally, the takeaway is:

> Architectures matter!

As evidence of this, consider the following plot, evaluating the impact of switching from the original DQN architecture to the [IMPALA resnet](https://arxiv.org/abs/1802.01561) architecture, and nothing else!

{{< img src="/posts/research/rl/from_bbf_to_sss/impala_rocks.png" title="Impala rocks!" width="50%" align="center" >}}

There is a growing body of work exploring alternate architectures for deep RL agents. Here are a few recent ones that I have been involved in.

*   [The State of Sparse Training in Deep Reinforcement Learning](https://arxiv.org/abs/2206.10369)
*   [In value-based deep reinforcement learning, a pruned network is a good network](https://arxiv.org/abs/2402.12479)
*   [Mixtures of Experts Unlock Parameter Scaling for Deep RL](https://openreview.net/forum?id=X9VMhfFxwn)
*   [Don't flatten, tokenize! Unlocking the key to SoftMoE's efficacy in deep RL](https://arxiv.org/abs/2410.01930)

### Variable horizons

In BBF we used a receding update horizon and an increasing discount factor. Why was this useful?

> Bias/variance tradeoff!

When using multi-step returns we make a choice of a value of $n$ in the following equation:

$$Q(x\_0, a\_0) \leftarrow Q(x\_0, a\_0) + \alpha \left( \sum_{t=0}^{n}\gamma^t r\_t + \max\_{a\_{n+1}} \gamma^{n+1} Q(x\_n, a\_{n+1}) - Q(x\_0, a\_0) \right)$$

As $n$ grows, this approaches a Monte Carlo estimate which has low bias but high variance; if $n = 0$, it is the standard one-step Bellman update which has low variance but high bias. This notion is theoretically explored in [“Bias-Variance” Error Bounds for Temporal Difference Updates](https://www.cis.upenn.edu/~mkearns/papers/tdlambda.pdf), where the authors suggest a decreasing schedule for $n$, similar to what we used in BBF.

When using multi-step updates, the choice of the discount factor $\gamma$ affects how much future rewards affect the current state's value estimate. This isillustrated in the following plot, where the $x$-axis indicates the number of steps in the future the reward is received, and the $y$-axis indicates how much it contributes to the value function for different values of $\gamma$.

{{< img src="/posts/research/rl/from_bbf_to_sss/value_contribution.png" title="Value contribution" width="50%" align="center" >}}

In BBF we use a schedule that increases $\gamma$, inspired by [How to Discount Deep Reinforcement Learning: Towards New Dynamic Strategies](https://arxiv.org/abs/1512.02011).

How best to balance this bias-variance tradeoff is still an open problem. We identified the benefits certain types of variance can have in [Small batch deep reinforcement learning](https://arxiv.org/abs/2310.03882) and in [On the consistency of hyper-parameter selection in value-based deep reinforcement learning](https://arxiv.org/abs/2406.17523).

# Why does this matter?

The point of this post is not to promote BBF (although I do quite like it). The main takeaway is:

> We designed BBF through experimental, not theoretical, RL.

This is by no means discrediting theoretical RL work, as that is very important. However, the reality is that there is still a theory-practice gap in that theoretical results still tell us very little about how modern methods can/should work. We need to approach deep RL as an _empirical science_. It needs to be empirical because (unfortunately) theoretical results won't buy us much; and it needs to be scientific in the sense that our aim should be at _better understanding how these methods work_, as opposed to SotA chasing. I'm very encouraged by recent works (in particular those presented at [RLC](https://rl-conference.cc/)) that do seem to be pushing in this direction. Let's continue pushing the frontier of empirical science in RL!

And of course, let's continue pushing the frontiers of theoretical RL research. I like to make a comparison to physics, where there are theoretical and empirical physicists that are _complementary_ to each other, both aiming at a better understanding of how the universe works.

{{< img src="/posts/research/rl/from_bbf_to_sss/physics.png" title="Theoretical and empirical physics" width="50%" align="center" >}}
