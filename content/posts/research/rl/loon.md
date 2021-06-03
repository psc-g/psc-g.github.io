---
title: "Autonomous navigation of stratospheric balloons using reinforcement learning"
date: 2020-12-02T08:06:25+06:00
hero: /posts/research/rl/loon/loonAnimation.gif
description: "Autonomous navigation of stratospheric balloons using reinforcement learning"
menu:
  sidebar:
    name: Flying balloons with RL
    identifier: loon
    parent: rl
    weight: 10
---


In this work we, quite literally, take reinforcement learning to new heights! Specifically, we use deep reinforcement learning to help control the navigation of stratospheric balloons, whose purpose is to deliver internet to areas with low connectivity. This project is an ongoing collaboration with [Loon](https://loon.com/).

It's been incredibly rewarding to see reinforcement learning deployed successfully in a real setting. It's also been terrific to work alongside such fantastic co-authors:\
_Marc G. Bellemare, Salvatore Candido, Pablo Samuel Castro, Jun Gong, Marlos C. Machado, Subhodeep Moitra, Sameera S. Ponda, Ziyu Wang_

## Paper links
You can find the official Nature paper [here](https://www.nature.com/articles/s41586-020-2939-8).

A view-only version of the PDF can be accessed [here](https://rdcu.be/cbBRc).

## Blog posts
Sal Candido, the Loon CTO, wrote [this nice blog post](https://medium.com/loon-for-all/drifting-efficiently-through-the-stratosphere-using-deep-reinforcement-learning-c38723ee2e90) going over what we did.

Scott Osprey wrote this [nice article](https://www.nature.com/articles/d41586-020-03313-1) on the News & Views section of Nature, discussing our paper and the possibilities it opens.

## Abstract
Finally, here is the paper's abstract, reproduced for your convenience:

_Efficiently navigating a superpressure balloon in the stratosphere1 requires the integration of a multitude of cues, such as wind speed and solar elevation, and the process is complicated by forecast errors and sparse wind measurements. Coupled with the need to make decisions in real time, these factors rule out the use of conventional control techniques2,3. Here we describe the use of reinforcement learning4,5 to create a high-performing flight controller. Our algorithm uses data augmentation6,7 and a self-correcting design to overcome the key technical challenge of reinforcement learning from imperfect data, which has proved to be a major obstacle to its application to physical systems8. We deployed our controller to station Loon superpressure balloons at multiple locations across the globe, including a 39-day controlled experiment over the Pacific Ocean. Analyses show that the controller outperforms Loon’s previous algorithm and is robust to the natural diversity in stratospheric winds. These results demonstrate that reinforcement learning is an effective solution to real-world autonomous control problems in which neither conventional methods nor human intervention suffice, offering clues about what may be needed to create artificially intelligent agents that continuously interact with real, dynamic environments._
