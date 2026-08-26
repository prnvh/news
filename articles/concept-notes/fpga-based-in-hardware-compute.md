---
title: "What is FPGA-based in-hardware compute?"
subtitle: "LUT-native FPGA designs cut latency by sitting closer to the fabric, at the cost of harder training."
description: "A short note on LUT-native FPGA compute and why it matters for low-latency in-hardware inference."
date: 2026-08-26
type: brief
author: Frontier Manual
topics: ["hardware", "compute", "robotics"]
tags: ["FPGA", "LUT-native", "in-hardware computing"]
summary:
  - "LUT-native FPGAs map computation onto the fabric instead of running an algorithm on top of LUTs."
  - "That can cut latency by orders of magnitude compared with conventional FPGA neural nets."
  - "The tradeoff is that these networks are harder to train."
related: ["FPGN"]
status: published
---

LUT native FPGAs are more native to the FPGA and hence provide orders of magnitude less latency. Harder to train though.

See the [FPGN](/paper-notes/FPGN) paper note.
