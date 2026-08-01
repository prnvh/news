---
title: "What is von Neumann architecture?"
subtitle: "A short draft note on stored-program computers, shared memory, and the bottleneck between processor and memory."
date: 2026-07-15
type: brief
author: Frontier Manual
topics: ["computer-science", "hardware", "systems"]
tags: ["architecture", "memory", "computing"]
summary:
  - "Von Neumann architecture describes stored-program computers where instructions and data live in memory."
  - "Its central tradeoff is the bottleneck between processing and memory movement."
  - "It remains a useful baseline for understanding modern computing systems."
readingTime: "4 min read"
status: draft
---

Von Neumann architecture is the classic model of a stored-program computer: memory holds both instructions and data, and a processor fetches, decodes, and executes those instructions step by step.

This draft will explain the model, the von Neumann bottleneck, and why modern systems still inherit its basic shape even when they use caches, parallelism, accelerators, and specialized memory hierarchies.
