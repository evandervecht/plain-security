# Supply chain attacks: breached through someone we trust

## intro {hold=1}
Can an attacker reach us through a vendor we trust? [#four] Yes, in four ways.

## updates
First, the update we trusted carried the attacker in. [#signed] The poisoned version is signed with the vendor's real certificate. [#auto] Our own systems install it on schedule. [#all] One compromised vendor reaches every customer at once. [#deep] Tools with the deepest access are the most likely to be abused.

## access
Second, our supplier's key opens our door. [#login] Our IT partner holds a standing login into our systems. [#shared] Often it is one shared account, valid around the clock, with more rights than the job needs. [#steal] Break into one supplier, and the intruder holds the keys of dozens of companies. [#look] Every login looks like routine maintenance.

## code
Third, our software is built from strangers' code. [#parts] Our app is a thin layer on top of hundreds of open-source components. [#owner] When a maintainer is tricked, or hands the project to a stranger, the next version can carry malicious code. [#name] It runs under our name. [#list] And without a list of components, we cannot answer: are we affected?

## saas
Fourth, their breach, but the data is ours. [#where] Payroll records and the customer list live with vendors. [#chain] Those vendors run on other vendors. [#leak] When one is breached, the data leaks without a single packet touching us. [#clock] Under {GDPR|G D P R}, the breach notification clock is still ours.

## good {hold=1.2}
What good looks like. [#inv] One list of every supplier that holds our data or can reach our systems. [#clauses] Contract clauses cover breach notification and audit rights. [#access] Supplier logins are named accounts that expire. [#staged] Updates reach a small test group first. [#sbom] A software bill of materials alerts us the day a component turns bad. [#cost] This is mostly a list, a contract and a habit, not a product. [#nis2] {NIS2|niss two} names supply chain security as a risk management measure.

## first {hold=1.2}
A suggested first step. [#ask] Ask which suppliers can reach what, and who owns that list. [#hour] If nobody can produce it within the hour, that is the finding.

## outro {hold=2}
Four ways trust gets abused. [#keep] Know the list, and write the clauses before you sign.
