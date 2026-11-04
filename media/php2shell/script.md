# php2shell: one request, and the web server is theirs

## intro {hold=1}
Can one request from the internet take over our web server? [#flaws] On 21 October 2026, the {PHP|P H P} project fixed two critical flaws. [#nologin] They need no login. [#three] Three questions matter.

## update
First, are we updated? [#itself] The flaws are in PHP itself, not in our website. [#one] One request, with no login, can run an attacker's code on the server. [#cvss] Both are rated critical. [#only] PHP says its own settings reduce some attack paths, but only the update makes a server safe.

## old
Second, is any of our PHP too old for a fix? [#eol] PHP 8.1 and older get no official release. [#distro] Linux distributions may ship a patch as a package. [#project] Moving an old application is rarely a job for a single day. So it needs a budget, an owner and a date.

## suppliers
Third, where does PHP run that we do not manage ourselves? [#where] Hosted websites, plugins, container images and appliances. [#wait] There we often wait for the vendor. [#ask] So the question becomes: which suppliers run PHP for us, and have they confirmed the update?

## good {hold=1.2}
What good looks like. [#nis2] {NIS2|niss two} Article 21 requires vulnerability handling and supply chain security. [#list] In practice that is a version list with end-of-support dates, [#plan] an upgrade plan with a date, [#conf] and written confirmation from every supplier. [#sbom] A software bill of materials in contracts answers "where do we run PHP" from a list.

## first {hold=1.2}
A suggested first step. [#q1] Ask which internet-facing systems run PHP, including those that suppliers run for us. [#q2] Which run a version with no official fix? [#q3] And who confirms in writing that each is updated or isolated, and by when? [#now] Update now, then check for intruders.

## outro {hold=2}
Two flaws, three questions. [#keep] Update first, then list every PHP we run.
