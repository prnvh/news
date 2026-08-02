---
title: "Spatial and Network Principles Behind Neural Locomotion"
date: 2026-08-01
type: research-note
slug: spatial-and-network-principles-behind-neural-locomotion
topics: ["neuroscience", "robotics"]
status: published
---

**Source:** [Komi et al. 2026](https://doi.org/10.1038/s41467-026-74228-0)  
**Authors:**  
**Goals:**  
**Why read:** paper on spinal cord and locomotion. relevant to neuromorphic hardware.

---

## Notes.

specialized neural circuit within the spinal cord known as CPGs (central pattern generators).

some neurons have been linked to core functions like rhythm generation, coordination of left hand and flexor extensor alternation. however these are across multiple neuron classes.

propose framework that ties cellular identity, spatial organization and network architecture to emergent dynamics.

the main components of motoneurons are excitatory (E) and inhibitory (I) neurons which make various synapses with targets along the line.

when inspecting output from an arbitrary location, we find that excitation dominates locally while inhibition dominates at longer ranges. they call the asymmetric form as a "mexican hat".

they explore the mexican hat projectome using 5 subpopulations (sp1-5). giving each cell a gaussian probability to form synapses with a mean projection length and width together the projections for the mexican hat projectome.

individual populations modulate distinct properties. for example, amplitude can be increased without affecting frequency by enhancing local excitation in central lobe. modulating gain of ascending inhibitory projections (sp2) allows control of the frequency without altering the amplitude.

asymmetry is the main reason for this phenomena. symmetric networks can support stable bumps of activity, but asymmetry allows for transforming bumps into travelling waves. thus allowing for rhythms, rotations, and slowdowns/halts.

- symmetric: excitation and inhibition would exist in a symmetric object shape
- asymmetric: excitation and inhibition exist in the mexican hat shape.

![Mexican hat connectivity profile](/images/locomotion-mexican-hat.png)

excitation dominates locally and then inhibition dominates mid range, causing it to go negative. and then it stabilises back to 0 at further distances. (small bump above 0 is small long range excitation)

![Neuron classes in the spinal cord](/images/locomotion-neuron-classes.png)

different neuron classes within the vertebra that have their own functions and behaviors  
V2a tend to have local and long-range ipsilateral projections, V0, dI6, and V3 are primarily commissural, and V1 and V2b have mainly ascending and descending ipsilateral axons.
