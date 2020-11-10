---
title: "Scalable methods for computing state similarity in deterministic MDPs"
date: 2019-11-22T08:06:25+06:00
hero: /posts/research/rl/scalable/banner.gif
description: "Scalable methods for computing state similarity in deterministic MDPs"
menu:
  sidebar:
    name: Scalable methods ...
    identifier: scalable
    parent: rl
    weight: 10
---

This post describes my paper [Scalable methods for computing state similarity in deterministic MDPs](https://arxiv.org/abs/1911.09291), published at [AAAI 2020](https://aaai.org/Conferences/AAAI-20/). The code is available [here](https://github.com/google-research/google-research/tree/master/bisimulation_aaai2020).

## Motivation

We consider distance metrics between states in an MDP. Take the following MDP, where the goal is to reach the green cells:

{{< img src="/posts/research/rl/scalable/sampleMDP.png" title="Sample MDP" width="50%" align="center" >}}

### Physical distance betweent states?

Physical distance often fails to capture the similarity properties we'd like:

{{< img src="/posts/research/rl/scalable/physicalDistance.png" title="Physical distance" width="50%" align="center" >}}

### State abstractions

Now imagine we add an exact copy of these states to the MDP (think of it as an additional "floor"):

{{< img src="/posts/research/rl/scalable/sampleMDPCopy.png" title="Sample MDP with copy" width="50%" align="center" >}}

And imagine after each action the agent randomly transitions between these two floors:

{{< img src="/posts/research/rl/scalable/sampleMDPCopy2.png" title="Sample MDP with copy and transitions" width="50%" align="center" >}}

Notice that since the optimal policy is _identical_ on both floors, we just doubled the state space for no reason! We should really be grouping together similar states.

## MDPs

Consider the standard MDP defintion $\langle\mathcal{S}, \mathcal{A}, \mathcal{R}, \mathcal{P}, \gamma\rangle$, where $\mathcal{S}$ is the state space, $\mathcal{A}$ is the action space, $\mathcal{R}:\mathcal{S}\times\mathcal{A}\rightarrow\mathbb{R}$ is the one-step reward function, $\mathcal{P}:\mathcal{S}\times\mathcal{A}\rightarrow\Delta(\mathcal{S})$ is the next-state distribution function, and $\gamma\in \[0, 1\)$ is the discount factor.

## Bisimulation

What we need is a notion of state distance that captures _behavioural indistinguishability_.

### Equivalence relations

First, let me explain bisimulation relations, which was introduced by [Givan, Dean, and Greig](https://www.sciencedirect.com/science/article/pii/S0004370202003764).

Two states, $s$ and $t$, are considered _bisimlar_ (denoted $s\sim t$) if, under all actions:

1. They have equal immediate rewards:
   $$ \forall a\in\mathcal{A}.\quad \mathcal{R}(s, a) = \mathcal{R}(t, a) $$
2. Transition with equal probability to bisimulation equivalence classes:
   $$ \forall a\in\mathcal{A}, \forall c\in\mathcal{S}/\_{\sim}.\quad\mathcal{P}(s, a)(c) := \sum\_{s'\in c}\mathcal{P}(s, a)(s') = \mathcal{P}(t, a)(c)$$


This is often easiest to understand via an illustration. Consider the folloowing system:

{{< img src="/posts/research/rl/scalable/bisimEquivExample.png" title="Example for bisimulation equivalence" width="50%" align="center" >}}

A bisimulation equivalence relation would collapse the 8 states above into an equivalent 4-state MDP:

{{< img src="/posts/research/rl/scalable/bisimEquivExampleCollapsed.png" title="Example for bisimulation equivalence, collapsed" width="50%" align="center" >}}

But, unfortunately, bisimulation equivalence is brittle, as it's a 0/1 relationship!

### Metrics

Bisimulation metrics generalize bisimulation relations, and quantify the _behavioural distance_ between two states in an MDP. They are defined as any metric $d$ where $d(s, t) = 0 \iff s\sim t$. [Ferns, Panangaden, and Precup](https://arxiv.org/abs/1207.4114) proved that the following operator admits a fixed point $d^{\sim}$, and this fixed point is a bisimulation metric:

$$ F(d)(s, t) = \max\_{a\in\mathcal{A}}\left[ |R(s, a) - R(t, a)| + \gamma T_K(d)(P(s, a), P(t, a)) \right] $$

where $s,t\in\mathcal{S}$ are two states in the MDP, $\mathcal{A}$ is the action space, $R:\mathcal{S}\times\mathcal{A}\rightarrow\mathbb{R}$ is the reward function, $P:\mathcal{S}\times\mathcal{A}\rightarrow\Delta(\mathcal{S})$ is the transition function, and $T_K(d)$ is the Kantorovich (also known as the Wasserstein, Earth Mover's, Sinkhorn, ...) distance between two probability distributions under a state metric $d$.

These metrics have nice theoretical properties, such as: the bisimulation distance between two states is an upper-bound on their optimal value difference:

<div>
$$ | V^*(s) - V^*(t)| \leq d^{\sim}(s, t) $$
</div>

## Shortcomings and solutions

Bisimulation metrics have three shortcomings I address in my paper.

### Pessimism

#### Problem

They're inherently _pessimistic_ (the max is considering the worst possible case!):
$$ F(d)(s, t) = {\color{red} \max\_{a\in\mathcal{A}}}\left[ |R(s, a) - R(t, a)| + \gamma T_K(d)(P(s, a), P(t, a)) \right] $$
Take the following example MDP, where edge labels indicate the action (${a, b}$) and non-zero rewards ($[K]$).

{{< img src="/posts/research/rl/scalable/counterexample.png" title="Counterexample" width="25%" align="center" >}}

When $\gamma = 0.9$, $V^∗(s) = V^∗(t) = 10K$, while $d^{\sim}(s, t) = 10K$, which shows that the bound mentioned in the last section can be made to be as loose as desired.

#### Solution

I introduce _on-policy bisimulation metrics_, $d^{\pi}\_{\sim}$. These are similar to regular bisimulation metrics, but are defined with respect to a policy $\pi:\mathcal{S}\rightarrow\Delta(\mathcal{A})$. In the paper I prove that
$$ |V^{\pi}(s) - V^{\pi}(t) | \leq d^{\pi}\_{\sim}(s, t) $$

### Computational Expense

#### Problem

Bisimulation metrics have been traditionally solved via dynamic programming. But this can be very expensive, as it requires updating the metric estimate for all state-action pairs at every iteration! Note that this means computing the Kantorovich (which is an expensive linear program) $|\mathcal{S}|\times|\mathcal{A}|$ times at each iteration.

#### Solution

Sampling! If we assume a deterministic MDP, I provide an update rule using sampled pairs of $\langle s, a, r, s'\rangle$ transitions, and prove that this is guaranteed to converge to the true metric! See Theorem 4 in [the paper](https://arxiv.org/pdf/1911.09291.pdf) for details.

### Full state enumerability

#### Problem

Existing methods for computing/approximating bisimulation metrics require full state enumerability.

#### Solution

Use neural networks! Consider a trained Rainbow agent, and take the penultimate layer as the representation ($\phi$):

{{< img src="/posts/research/rl/scalable/trainedAgentRepr.png" title="Trained Rainbow agent representation" width="50%" align="center" >}}

We can concatenate the representations of two states:

{{< img src="/posts/research/rl/scalable/concatRepr.png" title="Concatenation of two representations" width="35%" align="center" >}}

And feed them through a neural network, where we denote the output of the network as $\psi(s, t)$:

{{< img src="/posts/research/rl/scalable/network.png" title="Concatenation of two representations, then fed through network" width="100%" align="center" >}}

We define a target for regular bisimulation ($s'$ and $t'$ are the unique next states from $s$ and $t$, respectively):
$$ \mathbf{T}\_{\theta}(s, t, a) = \max (\psi\_{\theta}(s, t, a), |\mathcal{R}(s, a)-\mathcal{R}(t, a)| + \gamma\psi\_{\theta}(s', t'))$$

and for on-policy bisimulation:
$$ \mathbf{T}^{\pi}\_{\theta}(s, t, a) = |\mathcal{R}^{\pi}(s)-\mathcal{R}^{\pi}(t)| + \gamma\psi^{\pi}\_{\theta}(s', t'))$$

Which is then incorporated into the loss (where $\mathcal{D}$ is the dataset, e.g. a replay buffer):
$$ \mathcal{L}^{(\pi)}\_{s,t,a} = \mathbb{E}\_{\mathcal{D}}\left(\mathbf{T}^{(\pi)}\_{\theta}(s, t, a) - \psi^{(\pi)}\_{\theta}(s, t, a)\right)^2 $$

## Evaluate on Atari 2600

Take a trained Rainbow agent and compute the distance from the first state:

{{< img src="/posts/research/rl/scalable/firstState.png" title="First state in SpaceInvaders" width="25%" align="center" >}}

to every other state:

{{< img src="/posts/research/rl/scalable/si.gif" title="First state in SpaceInvaders to every other state" width="100%" align="center" >}}

Let's see the results! Notice how the metric jumps when an alien ship is destroyed:

{{< img src="/posts/research/rl/scalable/siDistances.gif" title="First state in SpaceInvaders to every other state, with distances" width="100%" align="center" >}}

## Citing

The original tweet is [here](https://twitter.com/pcastr/status/1197856799195619333).

Please use the following BibTeX entry if you'd like to cite this work:
```
@inproceedings{castro20bisimulation,
  author    = {Pablo Samuel Castro},
  title     = {Scalable methods for computing state similarity in deterministic {M}arkov {D}ecision {P}rocesses},
  year      = {2020},
  booktitle = {Proceedings of the Thirty-Fourth AAAI Conference on Artificial Intelligence (AAAI-20)},
}
```
