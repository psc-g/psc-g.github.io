---
title: "Metrics and continuity in reinforcement learning"
date: 2021-02-03T08:06:25+06:00
hero: /posts/research/rl/metrics_continuity/banner.png
description: "Metrics and continuity in reinforcement learning"
menu:
  sidebar:
    name: Metrics & continuity in RL
    identifier: metrics_continuity
    parent: rl
    weight: 10
---

In this work we investigate the notion of "state similarity" in Markov decision processes. This concept is central to generalization in RL with function approximation.

[Our paper](https://arxiv.org/abs/2102.01514) was published at AAAI'21.

_Charline Le Lan, Marc G. Bellemare, and Pablo Samuel Castro_

The text below was adapted from [Charline's twitter thread](https://twitter.com/charlinelelan/status/1357006401952972808)

In RL, we often deal with systems with large state spaces. We can’t exactly represent the value of each of these states and need some type of generalization. One way to do that is to look at structured representations in which similar states are assigned similar predictions.

{{< img src="/posts/research/rl/metrics_continuity/structuredStates.jpeg" width="80%" title="Learning structured states" align="center" >}}

We consider the case where these representations are induced by state metrics.
_How shall we choose a metric to get good generalization properties?_
An interesting metric should give us continuity properties for the RL function of interest in our problem.
A good metric should also give us a representation as coarse as possible so that we can cheaply generalize to new states.

{{< img src="/posts/research/rl/metrics_continuity/fig1.png" width="70%" title="Figure 1" align="center" >}}

Having these state similarity metrics allow us to define "neighbourhoods": all states that are within at most $\epsilon$ apart. This allows us, for instance, to transfer things such as value functions through a state's neighbourhood.

{{< img src="/posts/research/rl/metrics_continuity/epsilons_anim.gif" width="70%" title="Neighbourhoods" align="center" >}}

Our paper unifies representations of states spaces and the notion of continuity via a taxonomy of metrics. We also provide a hierarchy of metrics to compare the topologies induced by all these metrics.

{{< img src="/posts/research/rl/metrics_continuity/banner.png" width="70%" title="Hierarchy" align="center" >}}

Using our taxonomy, we find that most commonly discussed metrics are actually poorly suited for algorithms that convert representations into values, so we introduce new metrics to overcome this shortcoming.

{{< img src="/posts/research/rl/metrics_continuity/new_metrics.png" width="70%" title="New metrics" align="center" >}}

What kind of generalization do these metrics produce when used for value function approximation? We present an empirical evaluation comparing our metrics and showing the importance of the choice of a neighborhood in RL algorithms.

{{< img src="/posts/research/rl/metrics_continuity/empirical.jpeg" width="70%" title="Empirical results" align="center" >}}

## Links

[Paper](https://arxiv.org/abs/2102.01514)

[Poster](https://docs.google.com/presentation/d/1RqowMqMHScjR1s8pCuM2UdJQGj8ayIozNg53Qsqnf5I/edit#slide=id.gb430592b0c_1_226)

[Slides](https://docs.google.com/presentation/d/1QAfoJWh3jd_lZEkkHQNGXMLysKhhjU5nSOR7oIxVcqY/edit#slide=id.g5410a89cdb_0_0)

[Code](https://github.com/google-research/google-research/tree/master/rl_metrics_aaai2021)
