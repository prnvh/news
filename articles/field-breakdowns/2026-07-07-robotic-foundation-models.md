---
title: "Robotic Foundation Models"
subtitle: "Large models trained to see, talk, and act—what transfers and what breaks."
date: 2026-07-07
updated: 2026-07-07
type: essay
author: Frontier Manual
topics: ["ai", "systems"]
tags: ["foundation models", "robotics"]
summary:
  - "Robotic foundation models aim to reuse internet-scale vision and language for control."
  - "The hard parts are action representations, data scarcity, and reliable evaluation."
  - "This breakdown situates VLAs inside the broader embodied intelligence map."
readingTime: "12 min read"
status: published
---

Robotic foundation models are large pretrained systems adapted to produce robot actions from sensory input and language goals. The bet is that internet-scale vision and language can transfer into control—so a robot can see a scene, understand an instruction, and act without being hand-engineered for every task.

Inside embodied intelligence, this chapter focuses on model families, datasets, and fine-tuning recipes rather than low-level control theory. The important subproblems are action tokenization, multimodal alignment, safety constraints, and sim-to-real transfer. The important methods are vision-language-action models, behavior cloning at scale, and co-training with web data.

What is still unclear is how much generality is real versus benchmark-specific, and how to evaluate long-horizon competence once demos look good. On the field map, this feeds the Learning section of Embodied Intelligence and connects to paper notes like RT-2.
