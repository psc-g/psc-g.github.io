---
title: "Contrastive Behavioral Similarity Embeddings for Generalization in Reinforcement Learning"
date: 2021-01-14T08:06:25+06:00
hero: /posts/research/rl/pse/pse.png
description: "Contrastive Behavioral Similarity Embeddings for Generalization in Reinforcement Learning"
menu:
  sidebar:
    name: Contrastive Behavioral Similarity Embeddings
    identifier: pse
    parent: rl
    weight: 10
---

This [paper](https://arxiv.org/abs/2101.05265) was accepted as a spotlight at ICLR'21.

We propose a new metric and contrastive loss that comes equipped with theoretical and empirical results.

{{< img src="/posts/research/rl/pse/jumpy.png" title="Jumping task" align="center" width="50%" >}}

## Policy Similarity Metric

We introduce the policy similarity metric (PSM) which is based on [bisimulation metrics](https://arxiv.org/abs/1207.4114).
In contrast to bisimulation metrics (which is built on reward differences), PSMs are built on differences in optimal policies.

{{< img src="/posts/research/rl/pse/psm.png" title="Policy similarity metric" align="center" width="80%" >}}

If we were to use this metric for policy transfer (as Doina Precup & I [explored previously](http://ojs.aaai.org/index.php/AAAI/article/view/7751)), we can upper-bound the difference between the optimal and the transferred policy:

{{< img src="/posts/research/rl/pse/upperBound.png" title="Upper bound" align="center" width="80%" >}}

## Policy Similarity Embeddings

We use this metric to define a loss for learning contrastive metric embeddings (CMEs) that aim to learn a structured representation respecting $d^\*$.

{{< img src="/posts/research/rl/pse/loss.png" title="Loss" align="center" width="80%" >}}

The resulting algorithm is as follows:

{{< img src="/posts/research/rl/pse/algorithm.png" title="Algorithm" align="center" width="50%" >}}

## Empirical Evaluations

### Jumping Task

We first evaluate this loss on the jumping task which, although seemingly simple, proves surprisingly hard to generalize in. our method produces the overall best results, both in quantitative terms:

{{< img src="/posts/research/rl/pse/jumpyTable.png" title="Jumpy Quantitative" align="center" width="80%" >}}

As well as in qualitative terms:

{{< img src="/posts/research/rl/pse/jumpyEmbeddings.jpeg" title="Jumpy Embeddings" align="center" width="80%" >}}

### Linear Quadratic Regulators with spurious correlations

We also evaluated on a linear quadratic regulator with distractors where we obtained really great performance:

{{< img src="/posts/research/rl/pse/lqr.jpeg" title="LQR results" align="center" width="50%" >}}

### DM-Control suite

Finally, we also evaluated on the recently-released [distracting control suite](https://github.com/google-research/google-research/tree/master/distracting_control) where we augment the current SOTA with an auxiliary loss for learning PSEs. This produced a new SOTA :)

{{< img src="/posts/research/rl/pse/dm.png" title="Distracting control suite results" align="center" width="80%" >}}
