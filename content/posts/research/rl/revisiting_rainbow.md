---
title: "Revisiting Rainbow: Promoting more insightful and inclusive deep reinforcement learning research"
date: 2020-11-30T08:06:25+06:00
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

The code is available [here](https://github.com/JohanSamir/revisiting_rainbow).

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
in other words, _one GPU is the equivalent of approximately 20 minimum wages._ Needless to say, this is far from inclusive.

{{< img src="/posts/research/rl/revisiting_rainbow/minimumWage.png" title="Minimum wage in LATAM" align="center" >}}

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
In order to strengthen [the Rainbow connection](https://youtu.be/WS3Lkc6Gzlk), we also ran a set of experiments on the MinAtar
environment [Young and Tian, 2019](https://arxiv.org/abs/1903.03176), which is a set of miniaturized versions of five ALE games
(Asterix, Breakout, Freeway, Seaquest, and SpaceInvaders). These environments are considerably
larger than the four classic control environments previously explored, but they are significantly faster
to train than regular ALE environments. Specifically, training one of these agents takes approximately
12-14 hours on a P100 GPU. For these experiments, we followed the network architecture used by
Young and Tian [2019] consisting of a single convolutional layer followed by a linear layer.

{{< img src="/posts/research/rl/revisiting_rainbow/minatar.png" width="50%" title="MinAtar" align="center" >}}

In these experiments we still find distributional RL to be the most significant of the additions, but it
does not seem to require being coupled with another algorithm to produce improvements. This begs
the question as to whether the use of distributional RL with convolutional layers avoids the pitfalls
sometimes observed in the classic control experiments. However, the results from Seaquest suggest
that the combination with one of the algorithms is hurting performance; based on the ablation results
from Rainbow, it appears that noisy networks have a detrimental effect on performance.

{{< img src="/posts/research/rl/revisiting_rainbow/revisitingMinatar.png" title="Revisiting Minatar" >}}

### Conclusions
When viewed in aggregate we find our results consistent with those of [Hessel et al., 2018](https://arxiv.org/abs/1710.02298): the results
for each algorithmic component can vary from environment to environment. If we were to suggest
a single agent that balances the tradeoffs of the different algorithmic components, our version of
Rainbow would likely be consistent with Hessel et al.: combining all components produces a
better overall agent.

However, there are important details in the variations of the different algorithmic components
that merit a more thorough investigation. An important finding of our work is that distributional
RL, when added on its own to DQN, may actually hurt performance. Our investigation suggests
that its true benefits come when combined with another algorithmic component (in the classic
control environments) or when used on a convolutional neural network (as in the MinAtar games).
Investigating these interactions further will lead to a better understanding of distributional RL.

## Beyond the Rainbow
We leverage the low cost of the small-scale environments to conduct a more thorough
investigation into some of the algorithmic components studied above.

### Reevaluating the Huber loss
We begin by questioning the choice of the Huber loss, which is what is usually used to train DQN
agents as it is meant to be less sensitive to outliers. We trained our agents using the mean-squared
error loss and found the surprising result that on all environments considered using the MSE instead
of the Huber loss yielded improvements, and in all but one environment (Freeway) the improvements
were significant, sometimes even surpassing the performance of the full Rainbow agent.

{{< img src="/posts/research/rl/revisiting_rainbow/huber.png" title="Huber loss" >}}

This begs the question as to whether the Huber loss is truly the best loss to use for DQN, especially
considering that reward clipping is typically used for most ALE experiments, mitigating the occurence
of outlier observations.

### Examining network architectures
We investigated the interaction of the best per-game hyper-parameters with the number of layers and
units per layer. It is worth highlighting once again
that the low computational cost of these experiments is what allows us to perform these thorough
sweeps.

Aside from CartPole, DQN appears to be fairly robust to the choice of number of layers and hidden units.

{{< img src="/posts/research/rl/revisiting_rainbow/netArchDQN.png" title="Network architectures, DQN" >}}

We observe a similar story with Rainbow.

{{< img src="/posts/research/rl/revisiting_rainbow/netArchRainbow.png" title="Network architectures, Rainbow" >}}

### Examining batch sizes
Another often overlooked hyper-parameter in training RL agents is the batch size. What we found is that while
for DQN (top row) it is sub-optimal to use a batch size below 64, Rainbow (bottom row) seems fairly robust to both small
and large batch sizes.

{{< img src="/posts/research/rl/revisiting_rainbow/batchSizes.png" title="Batch sizes" >}}

### Quantile Regression
Finally, given the importance of distributional RL, we investigate the effect of the distribution
parameterization. Instead of estimated probabilities for fixed locations as is done with C51 (the distributional
algorithm used by Rainbow), we investigate parameterizing the distribution using quantiles as was done by
[Dabney et al., [2017]](https://arxiv.org/abs/1710.10044).  Compared to C51, QR-DQN has no
restrictions or bound for value, and therefore improves significantly over C51.

Overall, it seems that while using quantiles yields results comparable to C51, they are much less
sensitive to varying learning rates. However, we found that the  combination of quantile regression with dueling networks led to no learning, in stark
contrast to what [Dabney et al. [2017]](https://arxiv.org/abs/1710.10044) hypothesized when introducing QR-DQN.
This is a surprising finding which we plan to investigate further.

{{< img src="/posts/research/rl/revisiting_rainbow/quantile.png" title="QR-DQN" >}}

## Conclusion
On a limited computational budget we were able to reproduce, at a high-level, the findings of
[Hessel et al. [2018]](https://arxiv.org/abs/1710.02298) and uncover new and interesting phenomena. Evidently it is much easier to revisit
something than to discover it in the first place. However, our intent with this work was to argue for
the relevance and significance of empirical research on small- and medium-scale environments. We
believe that these less computationally intensive environments lend themselves well to a more critical
and thorough analysis of the performance, behaviours, and intricacies of new algorithms.

It is worth remarking that when we initially ran
10 independent trials for the classic control environments, the confidence intervals were very wide
and inconclusive; boosting the independent trials to 100 gave us tighter confidence intervals with
small amounts of extra compute. This would be impractical for most large-scale environments.

We are by no means calling for less emphasis to be placed on large-scale benchmarks. We are simply
urging researchers to consider smaller-scale environments as a valuable tool in their investigations,
and reviewers to avoid dismissing empirical work that focuses on these smaller problems. By doing
so, we believe, we will get both a clearer picture of the research landscape and will reduce the barriers
for newcomers from diverse, and often underprivileged, communities. These two points can only
help make our community and our scientific advances stronger.

## Acknowledgements
The authors would like to thank Marlos C. Machado and Sara Hooker for their insightful comments
on our work.
