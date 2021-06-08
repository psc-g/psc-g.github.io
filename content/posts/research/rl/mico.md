---
title: "MICo: Learning improved representations via sampling-based state similarity for Markov decision processes"
date: 2021-06-07T08:06:25+06:00
hero: /posts/research/rl/mico/banner.png
description: "MICo: Learning improved representations via sampling-based state similarity for Markov decision processes"
menu:
  sidebar:
    name: MICo
    identifier: mico
    parent: rl
    weight: 10
---

We present a new behavioural distance over the state space of a Markov
decision process, and demonstrate the use of this distance as an effective
means of shaping the learnt representations of deep reinforcement learning
agents.

_Pablo Samuel Castro\*, Tyler Kastner\*, Prakash Panangaden, and Mark Rowland_

This blogpost is a summary of our [paper](). The code is available
[here](https://github.com/google-research/google-research/tree/master/mico).

The following figure gives a nice summary of the empirical gains our new loss
provides, yielding an improvement on all of the
[Dopamine](https://github.com/google/dopamine) agents.

{{< img src="/posts/research/rl/mico/human_median.png" width="50%" title="HumanMedian" align="center" >}}

## Introduction

The success of reinforcement learning (RL) algorithms in large-scale, complex
tasks depends on forming useful representations of the environment with which
the algorithms interact. Feature selection and feature learning has long been
an important subdomain of RL, and with the advent of deep reinforcement
learning there has been much recent interest in understanding and improving
the representations learnt by RL agents.

We introduce the _MICo_ (**M**_atching under_ **I**_ndependent_ **Co**_uplings_)
_distance_,  and develop the theory around its computation and estimation,
making comparisons with existing metrics on the basis of computational and
statistical efficiency. We empirically demonstrate that
_directly shaping the representation_ with MICo (as opposed to implicitly as
most previous methods) yields improvements on a number of value-based deep
RL agents.

<details>
  <summary>Expand to read more details</summary>

  Much of the work in representation learning has taken place from the
  perspective of auxiliary tasks
  [[Jaderberg et al., 2017]](https://arxiv.org/abs/1611.05397),
  [[Fedus et al., 2019]](https://arxiv.org/abs/1902.06865);
  in addition to the primary reinforcement learning task, the agent may attempt
  to predict and control additional aspects of the environment. Auxiliary tasks
  shape the agent’s representation of the environment implicitly, typically via
  gradient descent on the additional learning objectives. As such, while
  auxiliary tasks continue to play an important role in improving the
  performance of deep RL algorithms, our understanding of the effects of
  auxiliary tasks on representations in RL is still in its infancy.

  In contrast to the implicit representation shaping of auxiliary tasks, a
  separate line of work on behavioural metrics, such as bisimulation metrics
  [[Desharnais et al., 1999]](https://link.springer.com/chapter/10.1007/3-540-48320-9_19),
  [[Ferns et al., 2004]](https://arxiv.org/abs/1207.4114), aims to capture
  structure in the environment by learning a metric measuring behavioral
  similarity between states. Recent works have successfully used behavioural
  metrics to shape the representations of deep RL agents
  [[Gelada et al., 2019]](https://arxiv.org/abs/1906.02736),
  [[Zhang et al., 2021]](https://arxiv.org/abs/2006.10742),
  [[Agarwal et al., 2021]](https://arxiv.org/abs/2101.05265).
  However, in practice behavioural metrics are difficult to estimate from both
  statistical and computational perspectives, and these works either rely on
  specific assumptions about transition dynamics to make the estimation
  tractable, and as such can only be applied to limited classes of
  environments, or are applied to more general classes of environments not
  covered by theoretical guarantees.

  The principal objective of this work is to develop new measures of behavioral
  similarity that avoid the statistical and computational difficulties
  described above, and simultaneously capture richer information about the
  environment.
</details>

## Background

To streamline the reading of this post, I've made the details in the background
section collapsible. Click on each section header to read more.

### Reinforcement learning

Reinforcement learning methods are used for sequential decision making in uncertain environments.
You can read an introduction to reinforcement learning in
[this post](/posts/mentoring/intro-to-rl/), or expand the section below for more details.

<details>
  <summary>More details</summary>

  Denoting by $\mathscr{P}(S)$ the set of probability distributions on a set
  $S$, we define a Markov decision process $(\mathcal{X}, \mathcal{A}, \gamma,
  P, r)$ as:
  *  A finite state space $\mathcal{X}$;
  *  A finite action space $\mathcal{A}$;
  *  A transition kernel $P : \mathcal{X} \times \mathcal{A}\rightarrow \mathscr{P}(\mathcal{X})$;
  *  A reward function $r : \mathcal{X} \times\mathcal{A} \rightarrow \mathbb{R}$;
  *  A discount factor $\gamma \in [0,1)$.

  For notational convenience we introduce the notation $P_x^a \in
  \mathscr{P}(\mathcal{X})$ for the next-state distribution given state-action
  pair $(x, a)$, and $r_x^a$ for the corresponding immediate reward.

Policies are mappings from states to distributions
over actions: $\pi \in \mathscr{P}(\mathcal{A})^\mathcal{X}$ and induce a
_value function_ $V^{\pi}:\mathcal{X}\rightarrow\mathbb{R}$ defined via the recurrence:

$$V^{\pi}(x) := \mathbb{E}\_{a\sim\pi(x)}\left[ r_x^a  + \gamma\mathbb{E}\_{x'\sim P_x^a} [V^{\pi}(x')]\right]$$

It can be shown that this recurrence uniquely defines $V^\pi$ through a contraction mapping argument.

The control problem is concerned with finding the optimal policy

$$ \pi^{\*} = \arg\max\_{\pi\in\mathscr{P}(\mathcal{A})^\mathcal{X}}V^{\pi} $$

It can be shown that while the optimisation problem above appears to have
multiple objectives (one for each coordinate of $V^\pi$, there is in fact a
policy $\pi^{\*} \in \mathscr{P}(\mathcal{A})^\mathcal{X}$ that simultaneously
maximises all coordinates of $V^\pi$, and that this policy can be taken to be
deterministic; that is, for each $x \in \mathcal{X}$, $\pi(\cdot|x) \in
\mathscr{P}(\mathcal{A})$ attributes probability 1 to a single action.  In
reinforcement learning in particular, we are often interested in finding, or
approximating, $\pi^{\*}$ from direct interaction with the MDP in question via
sample trajectories, _without knowledge of $P$ or $r$_ (and sometimes not
even $\mathcal{X}$).

</details>

### Bisimulation metrics

Bisimulation metrics quantify the _behavioural distance_ between two states in a Markov decision process.
I give a brief introduction to bisimulation metrics in [this post](/posts/research/rl/scalable/#bisimulation),
or you can read more details by expanding the section below.

<details>
  <summary>More details</summary>

  A _metric_ $d$ on a set $X$ is a function $d:X\times X\rightarrow [0, \infty)$ respecting the following axioms for any $x, y, z \in X$:
  *  **Identity of indiscernibles:** $d(x, y) = 0 \iff x = y$;
  *  **Symmetry:** $d(x, y) = d(y, x)$;
  *  **Triangle inequality:** $d(x, y) \leq d(x, z) + d(z, y)$.

  A _pseudometric_ is similar, but the "identity of indiscernibles" axiom is weakened:
  *  $x = y \implies d(x, y) = 0$;
  *  $d(x, y) = d(y, x)$;
  *  $d(x, y) \leq d(x, z) + d(z, y)$.

  Note that the weakened first condition _does_ allow one to have $d(x, y) = 0$ when $x\ne y$.

  A _(pseudo)metric space_ $(X, d)$ is defined as a set $X$ together with a (pseudo)metric $d$ defined on $X$.

Bisimulation is a fundamental notion of behavioural equivalence introduced by
[Park and Milner](https://dl.acm.org/doi/book/10.5555/534666) in the early
1980s in the context of nondeterministic transition systems.  The probabilistic
analogue was introduced by [Larsen and
Skou](https://www.sciencedirect.com/science/article/pii/0890540191900306).  The
notion of an equivalence relation is not suitable to capture the extent to
which quantitative systems may resemble each other in behaviour.  To provide a
quantitative notion, bisimulation metrics were introduced by
[[Desharnais et al., 1999]](https://link.springer.com/chapter/10.1007/3-540-48320-9_19)
in the context of probabilistic transition systems without rewards.  In
reinforcement learning the reward is an important ingredient, accordingly the
_bisimulation metric_ for states of MDPs was introduced by
[[Ferns et al., 2004]](https://arxiv.org/abs/1207.4114).

Various notions of similarity between states in MDPs have been considered in
the RL literature, with applications in policy transfer, state aggregation, and
representation learning. The _bisimulation metric_  is of
particular relevance for this paper, and defines state similarity in an MDP by
declaring two states $x,y \in \mathcal{X}$ to be close if their immediate
rewards are similar, and the transition dynamics at each state leads to next
states which are also judged to be similar.

Central to the definition of the bisimulation metric is the operator
$T_k : \mathcal{M}(\mathcal{X}) \rightarrow \mathcal{M}(\mathcal{X})$, defined
over $\mathcal{M}(\mathcal{X})$, the space of pseudometrics on $\mathcal{X}$.
We now turn to the definition of the operator itself, given by

$$T_k(d)(x, y) = \max_{a \in \mathcal{A}} [|r_x^a - r_y^a] + \gamma W_d(P^a_x, P^a_y)]$$

for each $d \in \mathcal{M}(\mathcal{X})$, and each
$x, y \in \mathcal{X}$. It can be verified that the function
$T_K(d) : \mathcal{X} \times \mathcal{X} \rightarrow \mathbb{R}$
satisfies the properties of a pseudometric, so under this definition $T_K$ does
indeed map $\mathcal{M}(\mathcal{X})$ into itself.

The other central mathematical concept underpinning the operator $T_K$ is the Kantorovich distance $W_d$ (Commonly known as the Wasserstein distance) using base metric $d$. $W_d$ is formally a pseudometric over the set of probability distributions $\mathscr{P}(\mathcal{X})$, defined as the solution to an optimisation problem. The problem specifically is formulated as finding an optimal coupling between the two input probability distributions that minimises a notion of transport cost associated with $d$. Mathematically, for two probability distributions $\mu, \mu' \in \mathscr{P}(\mathcal{X})$, we have
\begin{align*}
    W_d(\mu, \mu') = \min_{\substack{(Z, Z') \\ Z \sim \mu, Z' \sim \nu'}} \mathbb{E}[d(Z, Z')] \, .
\end{align*}
Note that the pair of random variables $(Z, Z')$ attaining the minimum in the
above expression will in general not be independent. That the minimum is
actually attained in the above example in the case of a finite set
$\mathcal{X}$ can be seen by expressing the optimisation problem as a linear
program. Minima are obtained in much more general settings too; see
[Cedric Villani's book](https://cedricvillani.org/sites/dev/files/old_images/2012/08/preprint-1.pdf)
for more details.

The operator $T_K$ can be analysed in a similar way to standard operators in
dynamic programming for reinforcement learning. It can be shown that it is a
contraction mapping with respect to the $L^\infty$ metric over
$\mathcal{M}(\mathcal{X})$, and that $\mathcal{M}(\mathcal{X})$ is a complete
metric space with respect to the same metric.
Thus, by Banach's fixed point theorem, $T_K$ has a unique fixed point in
$\mathcal{M}(\mathcal{X})$, and repeated application of $T_K$ to any initial
pseudometric will converge to this fixed point.

Finally, Ferns et al. show that this metric bounds differences in the optimal
value function, hence its importance in RL:

$$|V^{\*}(x) - V^{\*}(y)| \leq d^\sim(x, y) \quad \forall x,y\in\mathcal{X}$$

</details>

### Representation learning in RL

In large-scale environments, RL agents must approximate value functions in a
more concise manner, by forming a _representation_ of the environment.

<details>
  <summary>More details</summary>

In large-scale environments, it is infeasible to express value functions
directly as vectors in $\mathbb{R}^{\mathcal{X} \times \mathcal{A}}$. Instead,
RL agents must approximate value functions in a more concise manner, by forming
a _representation_ of the environment, that is, a feature embedding
$\phi: \mathcal{X} \rightarrow \mathbb{R}^M$, and predicting state-action values
linearly from these features. _Representation learning_ is the problem of
finding a useful representation $\phi$.  Increasingly, deep RL agents are
equipped with additional losses to aid representation learning. A common
approach is to require the agent to make additional predictions (so-called
_auxilliary tasks_) with its representation, typically with the aid of
extra network parameters, with the intuition that an agent is more likely to
learn useful features if it is required to solve many related tasks. We refer
to such methods as _implicit_ representation shaping, since improved
representations are a side-effect of learning to solve auxiliary tasks.

Since bisimulation metrics capture additional information about the MDP in
addition to that summarised in value functions, bisimulation metrics are a
natural candidate for auxiliary tasks in deep reinforcement learning.
[Gelada et al. [2019]](https://arxiv.org/abs/1906.02736),
[Zhang et al. [2021]](https://arxiv.org/abs/2006.10742), and
[Agarwal et al. [2021]](https://arxiv.org/abs/2101.05265)
introduce auxiliary tasks based on bisimulation
metrics, but require additional assumptions on the underlying MDP in order for
the metric to be learnt correctly (Lipschitz continuity, deterministic, and
Gaussian transitions, respectively). The success of these approaches provides
motivation in this paper to introduce a notion of state similarity applicable
to arbitrary MDPs, without further restriction. Further, we learn this state
similarity _explicitly_: that is, without the aid of any additional network
parameters.

</details>

## Limitations of bisimulation metrics

Bisimulation metrics provide a strong notion of distance on the state space of
an MDP; however, they have been difficult to use at scale and compute online,
including the following reasons:

### Computational complexity

The metric can be computed via fixed-point
iteration since the operator $T_K$ is a contraction mapping. The map $T_K$ contracts at rate
$\gamma$ with respect to the $L^\infty$ norm on $\mathcal{M}$, and therefore
obtaining an $\varepsilon$-approximation of $d^\sim$ under this norm requires
$O(\log(1/\varepsilon) / \log(1/\gamma))$ applications of $T_K$ to
an initial pseudometric $d_0$. The cost of each application of $T_K$
is dominated by the computation of $|\mathcal{X}|^2|\mathcal{A}|$ $W_d$
distances for distributions over $\mathcal{X}$, each costing
$\tilde{O}(|\mathcal{X}|^{2.5})$ in theory, and $\tilde{O}(|\mathcal{X}|^3)$ in
practice. Thus, the overall practical cost is
$\tilde{O}(|\mathcal{X}|^{5}|\mathcal{A}|\log(\varepsilon) / \log(\gamma))$.

This property expresses the intrinsic computational difficulty of computing this
metric.

### Bias under sampled transitions.

Computing $T_K$ requires access to the transition probability distributions
$P_x^a$ for each $(x, a) \in \mathcal{X} \times \mathcal{A}$ which, as
mentioned [above](#background), are typically not available; instead,
stochastic approximations to the operator of interest are employed. Whilst
there has been work in studying online, sample-based approximate computation of
the bisimulation metric, these methods are generally biased, in contrast to
sample-based estimation of standard RL operators.

This property illustrates the problems associated with attempting to move from
operator-based computation to online, sampled-based computation of the metric
(for example, when the environment dynamics are unknown). 

### Lack of connection to non-optimal policies

One of the principal behavioural characterisations of the bisimulation metric
$d^\sim$ is the upper bound shown [above](#bisimulation-metrics).  However, in
general we do not have

$$|V^\pi(x) - V^\pi (y)| \leq d^\sim(x, y)$$

for arbitrary policies $\pi \in \Pi$; a simple example is illustrated below:

{{< img src="/posts/research/rl/mico/counterExample.png" width="30%" title="counterExample" align="center" >}}

In this MDP, $d^\sim(x, y) = (1-\gamma)^{-1}$, but for the policy $\pi(b|x)=1, \pi(a|y) = 1$, we have $|V^\pi(x) - V^\pi(y)| = k(1-\gamma)^{-1}$.

More generally, notions of state similarity that the bisimulation metric encodes may not be closely related to behavioural similarity under the policy $\pi$. Thus, learning about $d^\sim$ may not in itself be useful for large-scale reinforcement learning agents.

This property shows that even if the metric is computable exactly, the
information it yields about the MDP may not be practically useful. Although
$\pi$-bisimulation (introduced by me [here](/posts/research/rl/scalable/))  and extended by
[Zhang et al. [2021]](https://arxiv.org/abs/2006.10742)) addresses this property, their 
practical algorithms are limited to MDPs with deterministic transitions or
MDPs with Gaussian transition kernels, respectively. 

## The MICo distance

We now present a new notion of distance for state similarity, which we refer to
as _MICo_ (**M**_atching under _**I**_ndependent _**Co**_uplings_), designed to
overcome the drawbacks described above. We make some modifications to
$T_K$ to deal with the previously mentioned shortcomings, detailed below.

In order to deal with the prohibitive cost of computing the Kantorovich
distance, which optimizes over all coupling of the distributions $P_x^a$ and
$P_y^a$, we use the independent coupling.

To deal with lack of connection to non-optimal policies, we consider an
on-policy variant of the metric, pertaining to a chosen policy $\pi \in
\mathscr{P}(\mathcal{A})^\mathcal{X}$.  This leads us to the following
definition.

> **Definition**
>> Given a policy $\pi \in\mathscr{P}(\mathcal{A})^\mathcal{X}$, 
>> the MICo update operator, $T^\pi\_M : \mathbb{R}^{\mathcal{X}\times\mathcal{X}} \rightarrow \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$, is defined by
>> 
>> $$(T^\pi\_M U)(x, y)  = |r^\pi\_x - r^\pi\_y| + \gamma \mathbb{E}\_{\begin{subarray}{l}x'\sim P^{\pi}\_x \\ y'\sim P^{\pi}\_y\end{subarray}} \left[ U(x', y') \right]$$
>> 
>> for all functions $U:\mathcal{X}\times\mathcal{X}\rightarrow\mathbb{R}$, with $r^\pi\_x = \sum\_{a \in \mathcal{A}} \pi(a|x) r\_x^a$ and $P^{\pi}\_x = \sum\_{a\in\mathcal{A}}\pi(a|x)P\_x^a(\cdot)$ for all $x \in \mathcal{X}$.

As with the bisimulation operator, this can be thought of as encoding desired
properties of a notion of similarity between states in a self-referential
manner; the similarity of two states $x, y \in \mathcal{X}$ should be determined
by the similarity of the rewards and the similarity of the states they lead to.

> **Proposition**
>> The MICo operator $T^\pi_M$ is a contraction mapping on $\mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ with respect to the $L^\infty$ norm.

<details>
  <summary>Proof</summary>

Let $U, U' \in \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$. Then note that

$$|(T^\pi U)(x, y) - (T^\pi U')(x, y)| =  \left|\gamma\sum\_{x', y'}\pi(a|x)\pi(b|y)P\_x^a(x')P\_y^b(y') (U - U')(x', y') \right| \leq \gamma \|U - U'\|\_\infty$$

for any $x,y \in \mathcal{X}$, as required.

</details>

The following corollary now follows immediately from Banach's fixed-point theorem and the completeness of $\mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ under the $L^\infty$ norm.

> **Corollary**
>> The MICo operator $T^\pi\_M$ has a unique fixed point $U^\pi \in
>> \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$, and repeated application of
>> $T^\pi\_M$ to any initial function $U \in
>> \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ converges to $U^\pi$.

Having defined a new operator, and shown that it has a corresponding fixed-point, there are two questions to address:
-  Does this new notion of distance overcome the drawbacks of the bisimulation metric described above?
-  What does this new object tell us about the underlying MDP?

### Addressing the drawbacks of the bisimulation metric

In this section, we provide a series of results that show that the newly-defined notion of distance addressess each of these shortcomings presented previously. The proofs of these results rely on the following lemma, connecting the MICo operator to a lifted MDP.

> **Lemma (Lifted MDP)**
>> The MICo operator $T^\pi\_M$ is the Bellman evaluation operator for an auxiliary MDP.

<details>
  <summary>Proof</summary>
  Given the MDP specified by the tuple $(\mathcal{X}, \mathcal{A}, P, R)$, we construct an auxiliary MDP $(\widetilde{\mathcal{X}},\widetilde{\mathcal{A}},
  \widetilde{P}, \widetilde{R})$ defined by:
  *  State space $\widetilde{\mathcal{X}} = \mathcal{X}^2$
  *  Action space $\widetilde{\mathcal{A}} = \mathcal{A}^2$
  *  Transition dynamics given by $\widetilde{P}\_{(u, v)}^{(a, b)}((x,y)) = P\_u^a(x)P\_v^b(y)$ for all $(x,y), (u,v) \in \mathcal{X}^2$, $a,b \in \mathcal{A}$
  *  Action-independent rewards $\widetilde{R}\_{(x,y)} = |r^\pi\_x - r^\pi\_y|$ for all $x, y \in \mathcal{X}$.

  The Bellman evaluation operator $\widetilde{T}^{\tilde{\pi}}$ for this auxiliary MDP at discount rate $\gamma$ under the policy $\tilde{\pi}(a,b|x,y) = \pi(a|x) \pi(b|y)$ is given by:
   $$ (\widetilde{T}^{\tilde{\pi}}U)(x,y) = \widetilde{R}\_{(x,y)} + \gamma \sum\_{(x^\prime, y^\prime) \in \mathcal{X}^2} \widetilde{P}\_{(x, y)}^{(a, b)}((x^\prime, y^\prime)) \tilde{\pi}(a,b|x,y) U(x^\prime, y^\prime)$$
   $$ \qquad = |r^\pi\_x - r^\pi\_y| + \gamma \sum\_{(x^\prime, y^\prime) \in \mathcal{X}^2}  P^\pi\_x(x^\prime)P\_y^\pi(y^\prime)  U(x^\prime, y^\prime)$$
   $$ = (T^\pi\_MU)(x, y) \qquad\qquad \qquad\qquad \qquad\quad$$

  for all $U \in \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ and $(x, y) \in \mathcal{X} \times\mathcal{X}$, as required.

</details>

Equipped with the above lemma, we can address the three limitations listed [above](#limitations-of-bisimulation-metrics):

#### Computational complexity

> **Proposition**
>> The computational complexity of computing an $\varepsilon$-approximation in $L^\infty$ to the MICo metric is $O(|\mathcal{X}|^4 \log(\varepsilon) / \log(\gamma))$.

<details>
  <summary>Proof</summary>

Since the operator $T^\pi\_M$ is a $\gamma$-contraction under $L^\infty$, we require $\mathcal{O}(\log(1/\varepsilon) / \log(1/\gamma))$ applications of the operator to obtain an $\varepsilon$-approximation in $L^\infty$. Each iteration of value iteration updates $|\mathcal{X}|^2$ table entries, and the cost of each update is $\mathcal{O}(|\mathcal{X}|^2)$, leading to an overall cost of $O(|\mathcal{X}|^4\log(\varepsilon) / \log(\gamma))$.

</details>

In contrast to the bisimulation metric, this represents a computational saving
of $O(|\mathcal{X}|)$, which arises from the lack of a need to
solve optimal transport problems over the state space in computing the MICo
distance. There is a further saving of $\mathcal{O}(|\mathcal{A}|)$ that arises
since MICo focuses on an individual policy $\pi$, and so does not require the
max over actions in the bisimulation operator definition.

#### Online approximation

> **Proposition**
>> Suppose rewards depend only on state, and consider the sequence of estimates $(U\_t)\_{t \geq 0}$, with $U\_0$ initialised arbitrarily, and $U\_{t+1}$ updated from $U\_t$ via a pair of transitions $(x\_t, a\_t, r\_t, x'\_t)$, $(y\_t, b\_t, \tilde{r}\_t, y'\_t)$ as:
>> $$U\_{t+1}(x, y) \leftarrow (1-\epsilon\_t(x, y))U\_t(x, y) + \epsilon\_t(x, y) ( |r - \tilde{r}| + \gamma U\_{t}(x', y') )$$
>> Suppose all state-pairs tuples are updated infinitely often, and stepsizes for these updates satisfy the Robbins-Monro conditions. Then $U\_t \rightarrow U^\pi$ almost surely.

<details>
  <summary>Proof</summary>

  Due to the interpretation of the MICo operator $T^\pi\_M$ as the Bellman evaluation operator in an auxiliary MDP, algorithms and associated proofs of correctness for computing the MICo distance online can be straightforwardly derived from standard online algorithms for policy evaluation.
  Under the assumptions of the proposition, the update described is exactly a TD(0) update in the lifted MDP described above. We can therefore appeal to Proposition~4.5 of [Bertsekas and Tsitsiklis [1996]](http://athenasc.com/ndpbook.html) to obtain the result.
  Note that the wide range of online policy evaluation methods incorporating off-policy corrections and multi-step returns, as well as techniques for applying such methods at scale, may also be used.

</details>

#### Relationship to underlying policy

> **Proposition**
>> For any policy $\pi \in \mathscr{P}(\mathcal{A})^{\mathcal{X}}$ and states $x,y \in \mathcal{X}$, we have $|V^\pi(x) - V^\pi(y)| \leq U^\pi(x, y)$.

<details>
  <summary>Proof</summary>

  We apply a coinductive argument [[Kozen, 2007]](https://www.cs.cornell.edu/~kozen/Papers/coinduction.pdf) to show that if
  \begin{align}\label{eq:pf1}
    |V^\pi(x) - V^\pi(y)| \leq U(x, y) \ \text{for all } x, y \in \mathcal{X} ,
  \end{align}
  for some $U \in \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ symmetric in its two arguments, then we also have
  $$|V^\pi(x) - V^\pi(y)| \leq (T^\pi_M U)(x, y) \ \text{for all } x, y \in \mathcal{X}$$

  Since the hypothesis holds for the constant function $U(x,y) = 2 R_\text{max}/(1-\gamma)$, and $T^\pi_M$ contracts around $U^\pi$, the conclusion then follows. Therefore, suppose the coinductive hypothesis holds. Then we have
    $$V^\pi(x) - V^\pi(y) = r^\pi_xx - r^\pi_y + \gamma \sum_{x' \in \mathcal{X}} P^\pi_x(x') V(x') - \gamma \sum_{y' \in \mathcal{X}} P^\pi_y(y') V(y') $$
    $$\leq |r^\pi_x - r^\pi_y| + \gamma \sum_{x', y' \in \mathcal{X}} P^\pi_x(x')P^\pi_y(y') (V^\pi(x') - V^\pi(y')) $$
    $$\leq |r^\pi_x - r^\pi_y| + \gamma \sum_{x', y' \in \mathcal{X}} P^\pi_x(x')P^\pi_y(y') U(x', y') $$
    $$= (T^\pi_M U)(x, y) $$

  By symmetry, $V^\pi(y) - V^\pi(x) \leq (T^\pi\_M U)(x, y)$, as required.

</details>

### Diffuse metrics

To characterize the nature of the fixed point $U^\pi$, we introduce a novel notion of distance which we name _diffuse metrics_, which we define below. 

> **Definition (Diffuse metrics)**
>> Given a set $\mathcal{X}$, a function $d:\mathcal{X}\times \mathcal{X} \to \mathbb{R}$ is a diffuse metric if the following axioms hold:
>> *  $d(x,y)\geq 0$ for any $x,y\in \mathcal{X},$
>> *  $d(x,y)=d(y,x)$ for any $x,y\in \mathcal{X},$
>> *  $d(x,y)\leq d(x,z)+d(y,z)$ $\forall x,y,z\in \mathcal{X}.$

These differ from the standard metric axioms in the first point: we no longer
require that a point has zero self-distance, and two distinct points
may have zero distance.  Notions of this kind are increasingly common in machine
learning as researchers develop more computationally tractable versions of
distances, as with entropy-regularised optimal transport distances
[[Cuturi, 2013]](https://arxiv.org/abs/1306.0895), which also do not satisfy the axiom of zero
self-distance.

<details>
  <summary>Extra details</summary>

An example of a diffuse metric is the Łukaszyk–Karmowski distance
[[Łukaszyk, 2003]](https://link.springer.com/article/10.1007/s00466-003-0532-2),
which is used in the MICo metric as the operator between the
next-state distributions.  Given a diffuse metric space $(\mathcal{X}, \rho)$, the Łukaszyk–Karmowski distance $d^{\rho}\_{\text{LK}}$ is a diffuse metric on probability measures on $\mathcal{X}$ given by 

$$d^\rho\_{\text{LK}}(\mu,\nu)=\mathbb{E}\_{x\sim \mu, y\sim \nu}[\rho(x,y)]$$

This example demonstrates the origin of the name _diffuse_ metrics; the
non-zero self distances arises from a point being spread across a probability
distribution.

The notion of a distance function having non-zero self distance was first
introduced by [[Matthews, 1994]](https://www.dcs.warwick.ac.uk/pmetric/Ma94.pdf) who called it a _partial metric_.  We
define it below:

> **Definition (Partial metric)**
>> Given a set $\mathcal{X}$, a function $d:\mathcal{X}\times \mathcal{X} \to \mathbb{R}$ is a partial metric if 
>> *  $x=y \iff d(x,x)=d(y,y)=d(x,y)$ for any $x,y\in \mathcal{X},$
>> *  $d(x,x)\leq d(y,x)$ for any $x,y\in \mathcal{X},$
>> *  $d(x,y)= d(y,x)$ for any $x,y\in \mathcal{X},$
>> *  $d(x,y)\leq d(x,z)+d(y,z)-d(z, z)$ $\forall x,y,z\in \mathcal{X}.$

This definition was introduced to recover a proper metric from the distance
function: that is, given a partial metric $d$, one is guaranteed that
$\tilde{d}(x,y)=d(x,y)-\frac{1}{2}\left(d(x,x)+d(y,y)\right)$ is a proper
metric.

The above definition is still too stringent for the Łukaszyk–Karmowski distance (and hence MICo distance), since it fails axiom 4 (the modified triangle inequality) as shown in the following counterexample.

> **Example**
>> The Łukaszyk–Karmowski distance does not satisfy the modified triangle inequality: let $\mathcal{X}$ be $[0,1]$, and $\rho$ be the Euclidean distance $|\cdot|$. Let $\mu$,$\nu$ be Dirac measures concentrated at 0 and 1, and let $\eta$ be $\frac{1}{2}(\delta\_0+\delta\_1)$. Then one can calculate that $d\_{LK}(\rho)(\mu,\nu)=1$, while $d\_{LK}(\rho)(\mu,\eta)+d\_{LK}(\rho)(\nu,\eta)-d\_{LK}(\rho)(\eta,\eta)=1/2$, breaking the inequality.

In terms of the Łukaszyk–Karmowski distance, the MICo distance can be written as the fixed point 
$$ U^\pi(x,y)=|r^\pi\_x-r^\pi\_y|+d\_{\text{LK}}(U^\pi) (P^\pi\_x,P^\pi\_y)$$

This characterisation leads to the following result.

</details>

> **Proposition**
>> The MICo distance is a diffuse metric.

<details>
  <summary>Proof</summary>
  Non-negativity and symmetry of $U^\pi$ are clear, so it remains to check the triangle inequality. To do this, we define a sequence of iterates $(U\_k)\_{k \geq 0}$ in $ \mathbb{R}^{\mathcal{X}\times\mathcal{X}}$ by $U\_0(x, y) = 0$ for all $x, y \in \mathcal{X}$, and $ U\_{k+1} = T^\pi\_M U\_k$ for each $k \geq 0$. Recall that by \autoref{corr:mico-fp} that $U\_k \rightarrow U^\pi$. We will show that each $U\_k$ satisfies the triangle inequality by induction. By taking limits on either side of the inequality, we will then recover that $U^\pi$ itself satisfies the triangle inequality.
    
  The base case of the inductive argument is clear from the choice of $U\_0$. For the inductive step, assume that for some $k \geq 0$, $U\_k(x,y) \leq U\_k(x, z) + U\_k(z, y)$ for all $x, y, z \in \mathcal{X}$. Now for any $x, y, z \in \mathcal{X}$, we have
  $$U\_{k+1}(x, y) = |r^\pi\_x - r^\pi\_y| + \gamma \mathbb{E}\_{X' \sim P^\pi\_x, Y' \sim P^\pi\_y}[U\_k(X', Y')]\qquad\qquad\qquad\qquad\qquad\qquad\qquad\qquad\qquad$$
  $$\leq |r^\pi\_x - r^\pi\_z| + |r^\pi\_z - r^\pi\_y| + \gamma \mathbb{E}\_{X' \sim P^\pi\_x, Y' \sim P^\pi\_y, Z' \sim P^\pi\_z}[U\_k(X', Z') + U\_k(Z', Y')]$$
  $$= U\_{k+1}(x, z) + U\_{k+1}(z, y)\qquad\qquad\qquad\qquad\qquad\qquad\qquad\qquad\qquad\quad$$

  as required.

</details>

Note that a state $x \in \mathcal{X}$ has zero self-distance iff the Markov chain induced by $\pi$ initialised at $x$ is deterministic. Indeed, the
magnitude of a state's self-distance is indicative of the amount of "dispersion"
in the distribution. Hence, in general, we have $U^\pi(x, x) > 0$, and $U^\pi(x, x) \not= U^\pi(y, y)$ for distinct states $x, y \in \mathcal{X}$.


## The MICo loss

The impetus of our work is the development of principled mechanisms for directly shaping the representations used by RL agents so as to improve their learning. In this section we present a novel loss based on the MICo update operator $T^\pi\_M$ that can be incorporated into any value-based agent. Given the fact that MICo is a diffuse metric that can admit non-zero self-distances, special care needs to be taken in how these distances are learnt; indeed, traditional mechanisms for measuring distances between representations (e.g. Euclidean and cosine distances) are geometrically-based and enforce zero self-distances.

We assume a value-based agent learning an estimate $Q\_{\xi,\omega}$ defined by the composition of two function approximators $\psi$ and $\phi$ with parameters $\xi$ and $\omega$, respectively: $Q\_{\xi, \omega}(x, \cdot) = \psi\_{\xi}(\phi\_{\omega}(x))$. We will refer to $\phi\_{\omega}(x)$ as the _representation_ of state $x$ and aim to make distances between representations match the MICo distance; we refer to $\psi\_{\xi}$ as the _value approximator_.
We define the parameterized representation distance, $U\_{\omega}$, as an approximant to $U^{\pi}$:
$$U^{\pi}(x, y) \approx U\_{\omega}(x, y)  := \frac{\| \phi\_{\omega}(x) \|\_2 + \| \phi\_{\omega}(y) \|\_2 }{2} + \beta \theta(\phi\_{\omega}(x), \phi\_{\omega}(y))$$
where $\theta(\phi\_\omega(x), \phi\_\omega(y))$ is the angle between vectors $\phi\_\omega(x)$ and $\phi\_\omega(y)$ and $\beta$ is a scalar.
Our learning target is then 
$$T^U\_{\bar{\omega}}(r\_x, x', r\_y, y') = |r\_x - r\_y| + \gamma U\_{\bar{\omega}}(x', y')$$
where $\bar{\omega}$ is a separate copy of the network parameters that are synchronised with $\omega$ at infrequent intervals. This is a common practice that was introduced by [Mnih et al., [2015]](https://deepmind.com/research/publications/human-level-control-through-deep-reinforcement-learning) (and in fact, we use the same update schedule they propose). The loss for this learning target is
$$\mathcal{L}\_{\text{MICo}}(\omega) = \mathbb{E}\_{\langle x, r\_x, x'\rangle ,  \langle y, r\_y, y'\rangle}\left[ \left(T^U\_{\bar{\omega}}(r\_x, x', r\_y, y') - U\_{\omega}(x, y)\right)^2 \right]$$

where $\langle x, r\_x, x'\rangle$ and $\langle y, r\_y, y'\rangle$ are pairs of transitions sampled from the agent's replay buffer.
We can combine $\mathcal{L}\_{\text{MICo}}$ with the temporal-difference loss $\mathcal{L}\_{\text{TD}}$ of any value-based agent as $(1-\alpha)\mathcal{L}\_{\text{TD}} + \alpha\mathcal{L}\_{\text{MICo}}$, where $\alpha \in (0,1)$. Each sampled mini-batch is used for both MICo and TD losses. The figure below illustrates the network architecture used for learning:

{{< img src="/posts/research/rl/mico/networkArchitecture.png" width="50%" title="Network Architecture" align="center" >}}

Although the loss $\mathcal{L}\_{\text{MICo}}$ is designed to learn the MICo diffuse metric $U^\pi$, the values of the metric itself are parametrised through $U\_\omega$ defined above, which is constituted by several distinct terms. This appears to leave a question as to how the representations $\phi\_\omega(x)$ and $\phi\_\omega(y)$, as Euclidean vectors, are related to one another when the MICo loss is minimised. Careful inspection of the form of $U\_\omega(x, y)$ shows that the (scaled) angular distance between $\phi\_\omega(x)$ and $\phi\_\omega(y)$ can be recovered from $U\_\omega$ by subtracting the learnt approximations to the self-distances $U^\pi(x, x)$ and $U^\pi(y,y)$, as the figure below illustrates:

{{< img src="/posts/research/rl/mico/projection.png" width="50%" title="MICo projection" align="center" >}}

We therefore define the reduced MICo distance $\Pi U^\pi$, which encodes the distances enforced between the representation vectors $\phi\_\omega(x)$ and $\phi\_\omega(y)$, by:
$$\beta \theta(\phi\_{\omega}(x) ,\phi\_{\omega}(y))  \approx \Pi U^{\pi}(x, y) = U^{\pi}(x, y) - \frac{1}{2}U^{\pi}(x, x) - \frac{1}{2}U^{\pi}(y, y)$$

In the following sections we investigate the following two questions: {\bf (1)} How informative of $V^{\pi}$ is $\Pi U^{\pi}$?; and {\bf (2)} How useful are the features encountered by $\Pi U^{\pi}$ for policy evaluation? We conduct these investigations on tabular environments where we can compute the metrics exactly, which helps clarify the behaviour of our loss when combined with deep networks.

### Value bound gaps
Although we have $|V^{\pi}(x) - V^{\pi}(y)| \leq U^{\pi}(x, y)$, we do not, in general, have the same upper bound for $\Pi U^{\pi}(x, y)$ as demonstrated by the following result.

> **Lemma**
>> There exists an MDP with two states $x$, $y$, and a policy $\pi\in\Pi$ where $|V^{\pi}(x) - V^{\pi}(y)| > \Pi U^{\pi}(x, y)$.

<details>
  <summary>Proof</summary>

  Consider a single-action MDP with two states ($x$ and $y$) where $y$ is absorbing, $x$ transitions with equal probability to $x$ and $y$, and a reward of $1$ is received only upon taking an action from state $x$.

  There is only one policy for this MDP which yields the value function $V(x) \approx 1.8$ and $V(y) = 0$.

  The MICo distance gives $U(x, x) \approx 1.06$, $U(x, y) \approx 1.82$, and $U(y, y) = 0$, while the reduced MICo distance yields $\Pi U(x, x) = \Pi U(y, y) = 0$, and
  $$\Pi U(x, y) \approx 1.29 < |V(x) - V(y)| = 1.8$$

</details>

Despite this negative result, it is worth evaluating how often _in practice_ this inequality is violated and by how much, as this directly impacts the utility of this distance for learning representations. To do so in an unbiased manner we make use of Garnet MDPs, which are a class of randomly generated MDPs.

<details>
  <summary>Details of Garnet MDPs</summary>
  Given a specified number of states $n\_{\mathcal{X}}$ and the number of actions $n\_{\mathcal{A}}$, $\text{Garnet}(n\_{\mathcal{X}}, n\_{\mathcal{A}})$ is generated as follows:

  1.  The branching factor $b\_{x, a}$ of each transition $P\_x^a$ is sampled uniformly from $[1:n\_{\mathcal{X}}]$.
  2.  $b\_{x, a}$ states are picked uniformly randomly from $\mathcal{X}$ and assigned a random value in $[0, 1]$; these values are then normalized to produce a proper distribution $P\_x^a$.
  3.  Each $r\_x^a$ is sampled uniformly in $[0, 1]$.

</details>

For each $\text{Garnet}(n\_{\mathcal{X}}, n\_{\mathcal{A}})$ we sample 100 stochastic policies $\{\pi\_i\}$ and compute the average gap: $\frac{1}{100 |\mathcal{X}|^2}\sum\_i \sum\_{x, y} d(x, y) - |V^{\pi\_i}(x) - V^{\pi\_i}(y)|$, where $d$ stands for any of the considered metrics.
Note we are measuring the _signed_ difference, as we are interested in the frequency with which the upper-bound is violated.
As seen in the figure below, our metric _does_ on average provide an upper bound on the difference in values that is also tighter bound than those provided by $U^{\pi}$ and $\pi$-bisimulation. This suggests that the resulting representations remain informative of value similarities, despite the reduction $\Pi$.

{{< img src="/posts/research/rl/mico/valueGaps.png" width="50%" title="Value gaps" align="center" >}}

### State features

In order to investigate the usefuleness of the representations produced by $\Pi U^{\pi}$, we construct state features directly by using the computed distances to project the states into a lower-dimensional space with the [UMAP](https://arxiv.org/abs/1802.03426) dimensionality reduction algorithm (Note that since UMAP expects a metric, it is ill-defined with the diffuse metric $U^{\pi}$.). We then apply linear regression of the true value function $V^{\pi}$ against the features to compute $\hat{V^{\pi}}$ and measure the average error across the state space. As baselines we compare against random features (RF), Proto Value Functions (PVF) [[Mahadevan, 2007]](https://www.jmlr.org/papers/volume8/mahadevan07a/mahadevan07a.pdf), and the features produced by [$\pi$-bisimulation](/posts/research/rl/scalable/). We present our results on three domains in in the figure below, the classic four-rooms GridWorld (left), the mirrored rooms introduced in [my paper](/posts/research/rl/scalable/), and the grid task introduced by [Dayan, [1993]](http://www.gatsby.ucl.ac.uk/~dayan/papers/d93b.pdf):

{{< img src="/posts/research/rl/mico/stateFeatures.png" width="80%" title="State features" align="center" >}}

Despite the independent couplings, $\Pi U^{\pi}$ performs on par with $\pi$-bisimulation, which optimizes over all transition probability couplings, suggesting that $\Pi U^{\pi}$ yields good representations.

## Empirical evaluation

Having developed a greater understanding of the properties inherent to the representations produced by the MICo loss, we evaluate it on the [Arcade Learning Environment](https://jair.org/index.php/jair/article/view/10819).
The code necessary to run these experiments is [available on GitHub](\\https://github.com/google-research/google-research/tree/master/mico).
We will first describe the regular network and training setup for these agents so as to facilitate the description of our loss.

<details>
  <summary>Baseline network and loss description</summary>

  The networks used by Dopamine for the ALE consist of 3 convolutional layers followed by two fully-connected layers (the output of the networks depends on the agent). We denote the output of the convolutional layers by $\phi\_{\omega}$ with parameters $\omega$, and the remaining fully connected layers by $\psi\_{\xi}$ with parameters $\xi.$ Thus, given an input state $x$ (e.g. a stack of 4 Atari frames), the output of the network is $Q\_{\xi,\omega}(x, \cdot) = \psi\_{\xi}(\phi\_{\omega}(x))$. Two copies of this network are maintained: an _online_ network and a _target_ network; we will denote the parameters of the target network by $\bar{\xi}$ and $\bar{\omega}$. During learning, the parameters of the online network are updated every 4 environment steps, while the target network parameters are synced with the online network parameters every 8000 environment steps.
  We refer to the loss used by the various agents considered as $\mathcal{L}\_{\text{TD}}$; for example, for DQN this would be:
  $$\mathcal{L}\_{\text{TD}}(\xi, \omega) := \mathbb{E}\_{(x, a, r, x')\sim\mathcal{D}}\left[\rho\left(r + \gamma\max\_{a'\in\mathcal{A}}Q\_{\bar{\xi},\bar{\omega}}(x', a') - Q\_{\xi, \omega}(x, a) \right) \right]$$
  where $\mathcal{D}$ is a replay buffer with a capacity of 1M transitions, and $\rho$ is the Huber loss.

</details>

### MICo loss description

We will be applying the MICo loss to $\phi\_{\omega}(x)$. As described in \autoref{sec:loss}, we express the distance between two states as:
$$U\_{\omega}(x, y) = \frac{\| \phi\_{\omega}(x) \|\_2 + \| \phi\_{\bar{\omega}}(y) \|\_2 }{2} + \beta \theta(\phi\_{\omega}(x), \phi\_{\bar{\omega}}(y))$$

where $\theta(\phi\_\omega(x), \phi\_{\bar{\omega}}(y))$ is the angle between vectors $\phi\_\omega(x)$ and $\phi\_{\bar{\omega}}(y)$ and $\beta$ is a scalar.
Note that we are using the target network for the $y$ representations; this was done for learning stability. We used $\beta=0.1$ for the results in the main paper, but present some results with different values of $\beta$ below.

<details>
  <summary>Details on angular distance computation</summary>

  In order to get a numerically stable operation, we implement the angular distance between representations $\phi\_\omega(x)$ and $\phi\_\omega(y)$ according to the calculations
  $$\text{CS}(\phi\_\omega(x), \phi\_\omega(y)) = \frac{\langle \phi\_\omega(x), \phi\_\omega(y)\rangle }{\|\phi\_\omega(x)\|\|\phi\_\omega(y)\|}$$
  $$\theta(\phi\_\omega(x), \phi\_\omega(y)) = \arctan2\left(\sqrt{1 - \text{CS}(\phi\_\omega(x), \phi\_\omega(y))^2}, \text{CS}(\phi\_\omega(x), \phi\_\omega(y))\right)$$

</details>



Based on the [MICo update operator](#the-mico-distance), our learning target is then (note the target network is used for both representations here):
$$T^U\_{\bar{\omega}}(r\_x, x', r\_y, y') = |r\_x - r\_y| + \gamma U\_{\bar{\omega}}(x', y')$$
and the loss is
$$\mathcal{L}\_{\text{MICo}}(\omega) = \mathbb{E}\_{\langle x, r\_x, x'\rangle, \langle y, r\_y, y'\rangle\sim\mathcal{D}}\left[ \left(T^U\_{\bar{\omega}}(r\_x, x', r\_y, y') - U\_{\omega}(x, y)\right)^2 \right]$$

We found it important to use the Huber loss to minimize $\mathcal{L}\_{\text{MICo}}$ as this emphasizes greater accuracy for smaller distances as oppoosed to larger distances. We experimented using the MSE loss but found that larger distances tended to overwhelm the optimization process, thereby degrading performance.

As mentioned [above](#the-mico-loss), we use the same mini-batch sampled for $\mathcal{L}\_{\text{TD}}$ for computing $\mathcal{L}\_{\text{MICo}}$. Specifically, we follow the method [I introduced](/posts/research/rl/scalable/) for constructing new matrices that allow us to compute the distances between all pairs of sampled states (see code for details on matrix operations).

Our combined loss is then:
$$\mathcal{L}\_{\alpha}(\xi, \omega) = (1-\alpha)\mathcal{L}\_{\text{TD}}(\xi, \omega) + \alpha\mathcal{L}\_{\text{MICo}}(\omega)$$

### Results

We added the MICo loss to all the JAX agents provided in the [Dopamine library](https://github.com/google/dopamine).
For all experiments we used the hyperparameter settings provided with Dopamine. We found that a value of $\alpha=0.5$ worked well with quantile-based agents (QR-DQN, IQN, and M-IQN), while a value of $\alpha=0.01$ worked well with DQN and Rainbow. We hypothesise that the difference in scale of the quantile, categorical, and non-distributional loss functions concerned leads to these distinct values of $\alpha$ performing well. 
We found it important to use the Huber loss to minimize $\mathcal{L}\_{\text{MICo}}$ as this emphasizes greater accuracy for smaller distances as oppoosed to larger distances. We experimented using the MSE loss but found that larger distances tended to overwhelm the optimization process, thereby degrading performance. We evaluated on all 60 Atari 2600 games over 5 seeds.

We begin by presenting the improvements achieved for each agent in the bar plots below:


*  [DQN](https://deepmind.com/research/publications/human-level-control-through-deep-reinforcement-learning), using mean squared error loss to minimize $\mathcal{L}\_{\text{TD}}$ for DQN (as suggested in [our recent Revisiting Rainbow paper](/posts/research/rl/revisiting_rainbow/))

{{< img src="/posts/research/rl/mico/dqnBars.png" width="80%" title="DQN bar plots" align="center" >}}

*  [Rainbow](https://arxiv.org/abs/1710.02298)

{{< img src="/posts/research/rl/mico/rainbowBars.png" width="80%" title="Rainbow bar plots" align="center" >}}

*  [QR-DQN](https://arxiv.org/abs/1710.10044)

{{< img src="/posts/research/rl/mico/quantileBars.png" width="80%" title="QR-DQN bar plots" align="center" >}}

*  [IQN](https://arxiv.org/abs/1806.06923)

{{< img src="/posts/research/rl/mico/iqnBars.png" width="80%" title="IQN bar plots" align="center" >}}

*  [M-IQN](https://papers.nips.cc/paper/2020/hash/2c6a0bae0f071cbbf0bb3d5b11d90a82-Abstract.html); given that the authors had implemented their agent in TensorFlow (whereas our agents are in JAX), we have reimplemented M-IQN in JAX and run 5 independent runs (in contrast to the 3 run by the authors).

{{< img src="/posts/research/rl/mico/miqnBars.png" width="80%" title="M-IQN bar plots" align="center" >}}


The figure below presents the aggregate normalized performance across all games; as can be seen, our loss is able to provide good improvements over the agents they are based on, suggesting that the MICo loss can help learn better representations for control.

{{< img src="/posts/research/rl/mico/joinedNormalized.png" width="80%" title="Human normalized scores" align="center" >}}


## Conclusion

In this paper, we have introduced the MICo distance, a notion of state similarity that can be learnt at scale and from samples. We have studied the theoretical properties of MICo, and proposed a new loss to make the non-zero self-distances of this diffuse metric compatible with function approximation, combining it with a variety of deep RL agents to obtain strong performance on the Arcade Learning Environment. In contrast to auxiliary losses that _implicitly_ shape an agent's representation, MICo directly modifies the features learnt by a deep RL agent; our results indicate that this helps improve performance. To the best of our knowledge, this is the first time _directly_ shaping the representation of RL agents has been successfully applied at scale. We believe this represents an interesting new approach to representation learning in RL; continuing to develop theory, algorithms and implementations for direct representation shaping in deep RL is an important and promising direction for future work.


## Acknowledgements

The authors would like to thank Gheorghe Comanici, Rishabh Agarwal, Nino
Vieillard, and Matthieu Geist for their valuable feedback on the paper and
experiments. Pablo Samuel Castro would like to thank Roman Novak and Jascha
Sohl-Dickstein for their help in getting angular distances to work stably!
