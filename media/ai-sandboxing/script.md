# A sandbox for AI

## intro {hold=1}
Where should an {AI|A I} agent be allowed to run? [#follow] Sooner or later, one will follow an instruction we did not give. [#four] A sandbox can fall short in four ways.

## laptop
First, the agent runs as you. [#rights] On a work laptop, it has that person's files, saved passwords and cloud keys. [#hidden] One hidden line in a web page or ticket can steer it. [#ncsc] {NCSC|N C S C} UK advises safeguards outside the model. [#off] And one vendor's documentation says its sandbox is off by default.

## wall
Second, a container is a thin wall. [#kernel] Every container on a machine talks to the same kernel. [#own] A microVM or a virtual machine gives the agent a kernel of its own. [#match] For code an AI wrote after reading the internet, consider a stronger wall.

## door
Third, the door to the internet is open, and the keys are inside. [#leave] A hijacked agent can send what it reads to any site. [#block] Two settings close most of this. Block outbound traffic by default, with a short list of allowed sites. [#broker] And keep the real keys outside, handing in a short-lived token for each task.

## pilot
Finally, the pilot that never ended. [#test] It starts with test data and an end date. [#real] Then someone copies in real customer data. [#month] Months later, it is in daily use, with no owner and no logs. [#gdpr] Personal data in a pilot is still personal data.

## good {hold=1.2}
What good looks like. [#throw] A throwaway machine for each task, with nothing of value inside. [#wallc] A wall matched to what runs in it. [#default] Outbound blocked by default, and no standing keys. [#person] A named person approves merging, deploying, sending and paying. [#owasp] {OWASP|oh wasp} lists unexpected code execution among the top ten risks for agents.

## first {hold=1.2}
A suggested first step. [#check] Check whether agents run sandboxed today, rather than assuming it. [#own2] Then give them a machine of their own, not someone's laptop. [#rules] And set three rules for every pilot: fake data, an end date, one route to production. [#call] Where to start is your call.

## outro {hold=2}
Give the agent nothing of value, and nowhere to send it.
