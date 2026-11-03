# Code security: what is inside the software we ship

## intro {hold=1}
Do we know what is inside the software we ship? [#four] Four places flaws hide.

## own
First, the code we write. [#top] Broken access control is number one in the {OWASP|oh wasp} Top Ten. [#scan] Scanners are good at known patterns. [#logic] They cannot know that an invoice belongs to another customer.

## oss
Second, the open-source parts. [#reuse] Modern software is assembled from reused components. [#publish] When a flaw is published in one, every application shipping the old version has it too. [#sbom] An {SBOM|S B O M}, the list of components in a release, is matched against public vulnerability databases.

## config
Third, how things are configured. [#iac] Servers and storage are described in text files, so they are also code. [#bucket] One line that opens a storage bucket is copied to every environment. [#image] An image built two years ago still carries two-year-old libraries.

## findings
Fourth, too many findings. [#list] Scanners report every flaw, whether or not our software uses it. A severity score alone keeps the list long. [#three] Three questions shrink it. [#reach] Is the flawed code reachable? [#kev] Is it being exploited now, according to the {KEV|K E V} catalogue? [#epss] Is exploitation likely soon, according to {EPSS|E P S S}?

## good {hold=1.2}
What good looks like. [#access] A second person reads any change that decides who may see what. [#dep] Dependency scanning, with an {SBOM|S B O M} for every release. [#tmpl] Templates and images checked before deployment. [#triage] Exploited flaws first. [#nis2] {NIS2|N I S two} Article 21 names security in development and maintenance.

## first {hold=1.2}
A suggested first step. [#ask] Ask for two numbers. [#kevn] Known-exploited flaws that are reachable in production. [#days] And how many days the oldest one has been open.

## outro {hold=2}
Four places flaws hide. [#keep] Count what is exploited and reachable.
