---
title: "Revisiting Rainbow: Promoting more insightful and inclusive deep reinforcement learning research"
date: 2020-11-22T08:06:25+06:00
hero: /posts/research/rl/revisiting_rainbow/revisiting_rainbow.png
description: "Revisiting Rainbow: Promoting more insightful and inclusive deep reinforcement learning research"
menu:
  sidebar:
    name: Revisiting Rainbow
    identifier: revisiting
    parent: rl
    weight: 10
---

_Johan S. Obando-Ceron and Pablo Samuel Castro_

This is a summary of our [paper](https://arxiv.org/) which will be presented in the
[deep reinforcement learning workshop at NeurIPS 2020](https://sites.google.com/corp/view/deep-rl-workshop-neurips2020/home).

## Introduction

Since the introduction of DQN [Mnih et al., 2015](https://deepmind.com/research/publications/human-level-control-through-deep-reinforcement-learning)
reinforcement learning has witnessed a dramatic
increase in research papers [Henderson et al., 2018](https://arxiv.org/abs/1709.06560). A large portion of these papers propose new
methods that build on the original DQN algorithm and network architecture, often adapting methods
introduced before DQN to work well with deep networks. New methods are typically evaluated on a set of environments that have now
become standard, such as the Arcade Learning Environment (ALE)
[Bellemare et al., 2012](https://arxiv.org/abs/1207.4708) and the control tasks available in MuJoCo and DM control suites
[Todorov et al., 2012](https://ieeexplore.ieee.org/document/6386109), [Tassa et al., 2020](https://arxiv.org/abs/2006.12983).

While these benchmarks have helped to evaluate new methods in a standardized manner, they have
also implicitly established a minimum amount of computing power in order to be recognized as
valid scientific contributions.

Furthermore, at a time when efforts such as [Black in AI](https://blackinai2020.vercel.app/) and [LatinX in AI](http://www.latinxinai.org/) are helping bring people from
underrepresented (and typically underprivileged) segments of society into the research community,
these newcomers are faced with enormous computational hurdles to overcome if they wish to be an
integral part of said community.

In this work we argue for a need to change the status-quo in evaluating and proposing new research to avoid
exacerbating the barriers to entry for newcomers from underprivileged communities.

We complement
this argument by revisiting the Rainbow algorithm [Hessel et al., 2018](https://arxiv.org/abs/1710.02298), which proposed a new state
of the art algorithm by combining a number of recent advances, on a set of small- and medium-sized
tasks. This allows us to conduct a “counterfactual” analysis: would Hessel et al. [2018] have reached
the same conclusions if they had run on the smaller-scale experiments we investigate here? We extend
this analysis by investigating the interaction between the different algorithms considered and the
network architecture used; this is an element not explored by Hessel et al. [2018], yet as we show
below, is crucial for proper evaluation of the methods under consideration.


# The Cost of Rainbow
Although the value of the Rainbow agent is undeniable, this result
could have only come from a large research laboratory with ample access to compute:
*  It takes roughly 5 days to train an Atari game on a Tesla P100 GPU
*  There are 57 games in total
*  To report performance with confidence bounds it is common to use at least five independent runs

Thus, to provide the convincing empirical evidence for Rainbow, Hessel et al. [2018] required
at least 34,200 GPU hours (or 1425 days); in other words, these experiments _must_ be run in parallel with multiple GPUs.

Considering that the cost of a Tesla P100 is about US<span>$</span>6,000, it becomes prohibitively expensive for
smaller research laboratories. To put things in perspective, the average minimum monthly wage in Latin America
(excluding Venezuela) is approximately US<span>$</span>313 (data taken from [here](https://www.statista.com/statistics/953880/latin-america-minimum-monthly-wages/));
in other words, _one GPU is the equivalent of approximately 20 minimum wages._

Needless to say, this is far from inclusive.

## Revisiting Rainbow
As in the original Rainbow paper, we evaluate the effect of adding the following components to the original DQN algorithm:
*  **[Double Q-learning](https://arxiv.org/abs/1509.06461)** mitigates overestimation bias in the Q-estimates by decoupling the maximization of the action from its selection
in the target bootstrap.
*  **[Prioritized experience replay](https://arxiv.org/abs/1511.05952)** samples trajectories from the replay buffer proportional to their respective temporal difference error.
*  **[Dueling networks](https://arxiv.org/abs/1511.06581)**  uses two streams sharing the initial convolutional layers, separately estimating $V^\*(s)$ and the advantages for each action
*  **[Multi-step learning](https://link.springer.com/article/10.1007/BF00115009)** uses multi-step targets for temporal difference learning
*  **[Distributional RL](https://arxiv.org/abs/1707.06887)** maintains estimates of return distributions, rather than return values.
*  **[Noisy Nets](https://arxiv.org/abs/1706.10295)** replaces standard $\epsilon$-greedy exploration with noisy linear layers that include a noisy stream.

### Classic control
Our first set of experiments were performed on four classic control environments: CartPole, Acrobot, LunarLander, and MountainCar. We first investigate the effect of independently adding each algorithmic component to DQN:

{{< img src="/posts/research/rl/revisiting_rainbow/revisitingClassicAdd.png" title="Revisiting Classic Add" >}}

Just like Hessel et al. [2018] we find that, in aggregate, the addition of each of these algorithms does
improve learning over the base DQN. However, while
Hessel et al. [2018] found prioritized replay and multi-step to be the most
impactful additions, in these environments the gains from these additions are
more tempered.
What is most interesting is that when distributional RL is added to DQN _without
any of the other components_, the gains can sometimes be minimal (see
LunarLander), and can sometimes have a large negative effect on learning
(Acrobot and MountainCar). This is consistent across the various learning rates we considered.

In contrast, when we look at the _removal_ of each of these components from the full Rainbow agent:

{{< img src="/posts/research/rl/revisiting_rainbow/revisitingClassicRemove.png" title="Revisiting Classic Remove" >}}

we can see that what hurts the most is the removal of distributional RL. These results suggest there is a symbiotic between distributional RL and one of the other
algorithms considered, an investigation that warrants investigation in future work, along the lines
of the theoretical investigation by [Lyle et al. [2019]](https://arxiv.org/abs/1901.11084), which demonstrated that the combination of
distributional RL with non-linear function approximators can sometimes have adverse effects on
training.

### MinAtar
In order to strengthen the Rainbow Connection, we also ran a set of experiments on the MinAtar
environment [Young and Tian, 2019](https://arxiv.org/abs/1903.03176), which is a set of miniaturized versions of five ALE games
(Asterix, Breakout, Freeway, Seaquest, and SpaceInvaders). These environments are considerably
larger than the four classic control environments previously explored, but they are significantly faster
to train than regular ALE environments. Specifically, training one of these agents takes approximately
12-14 hours on a P100 GPU. For these experiments, we followed the network architecture used by
Young and Tian [2019] consisting of a single convolutional layer followed by a linear layer.

{{< img src="/posts/research/rl/revisiting_rainbow/minatar.png" width="50%" title="MinAtar" >}}
