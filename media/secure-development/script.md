# Building software that holds

## intro {hold=1}
Which of our applications has no owner and no maintenance budget? [#four] Four ways software fails before anyone attacks it.

## keys
First, keys typed into the code. [#copy] That code is copied to every laptop, the build server, backups and agencies. [#bots] If the repository goes public by accident, bots find the keys within minutes. [#old] Keys committed years ago usually still work.

## pipeline
Second, the build pipeline. [#chain] A chain of machines compiles, tests and publishes every release. [#lines] It runs unattended, with broad rights. An attacker adds a few lines during the build. [#signed] The result is signed with our certificate, and customers trust it.

## testing
Third, security tested once, after the fact. [#pen] A penetration test months after release finds flaws that were cheap to fix during design. [#live] Now the code is live, and the flaws were reachable the whole time.

## owner
Fourth, software behaves like a pet. [#contract] The agency delivers, the contract ends, and nobody is assigned to the application. [#age] Components age, and advisories pile up unread. [#records] The portal still holds every customer record it collected.

## good {hold=1.2}
What good looks like. [#vault] Secret scanning and a vault. [#pipe] A protected pipeline: {MFA|M F A}, least privilege and signed builds. [#done] Security in the definition of done, with automated checks. [#own] A named owner and a budget for every application. [#nis2] {NIS2|N I S two} names security in development and maintenance, and the {OWASP|oh wasp} Top Ten is the yardstick for the checks.

## first {hold=1.2}
A suggested first step. [#ask] Ask for the list of applications in production. [#neither] Mark the ones with no owner and no budget. [#risk] That list is the real risk register for this topic.

## outro {hold=2}
Four ways software fails. [#keep] Every application needs an owner and a budget.
