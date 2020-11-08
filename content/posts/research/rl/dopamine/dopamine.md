---
title: "Dopamine: A framework for flexible value-based reinforcement learning research"
date: 2020-08-27T08:06:25+06:00
hero: /posts/research/rl/dopamine/dopamine.png
description: "Dopamine: A framework for flexible value-based reinforcement learning research"
menu:
  sidebar:
    name: Dopamine
    identifier: dopamine
    parent: rl
    weight: 10
---

{{< img src="/posts/research/rl/dopamine/dopamine.png" title="Dopamine logo" >}}

Dopamine is a framework for flexible, value-based, reinforcement learning research. It was originally written in TensorFlow, but now all agents have been implemented in JAX.

You can read more about it in [our github page](https://github.com/google/dopamine) and in our [white paper](https://arxiv.org/abs/1812.06110).

[Original Google AI blogpost](https://ai.googleblog.com/2018/08/introducing-new-framework-for-flexible.html).

We have a website where you can easily compare the performance of all the Dopamine agents, which I find really useful:

[{{< img src="/posts/research/rl/dopamine/baselines.png" title="Baselines screenshot" >}}](https://google.github.io/dopamine/baselines/plots.html).

We also provide a set of Colaboratory notebooks that really help understand the framework:

- [Create an agent by either subclassing `DQN` or creating a new agent from scratch](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/agents.ipynb)
- [Train DQN and C51 on the Cartpole environment](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/cartpole.ipynb)
- [Load and visualize the logs data produced by Dopamine](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/load_statistics.ipynb)
- [Visualize a trained agent using the visualization utilities provided with Dopamine](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/agent_visualizer.ipynb)
- [Visualize a trained JAX agent using the visualization utilities provided with Dopamine](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/jax_agent_visualizer.ipynb)
- [Download and visualize different agents with Tensorboard](https://colab.research.google.com/github/google/dopamine/blob/master/dopamine/colab/tensorboard.ipynb)
