# Things that expire: domains, DNS and certificates

## intro {hold=1}
Could we go offline because somebody forgot to renew something? [#four] Four things with an expiry date can do it.

## domain
First, the domain. [#rent] It is rented, usually a year at a time. [#fail] Renewal fails when a card expires, or the contact mailbox belongs to someone who left. [#stranger] Then a stranger can register the name, and our email arrives at them.

## dns
Second, {DNS|D N S}. [#one] One provider answers for everything, so if it stops, website, email and logins stop together. [#sig] Signatures expire too. [#denic] On 5 May 2026, a faulty key rollover at the German registry left most German domains unreachable for about three hours.

## cert
Third, a certificate. [#date] A {TLS|T L S} certificate has an end date. [#warn] When it passes, browsers warn, and systems refuse to talk to each other. [#erics] In 2018, one expired certificate in Ericsson software took mobile networks offline in several countries for most of a day. [#sunday] The internal ones nobody watches expire on a Sunday.

## short
Fourth, shorter lifetimes. [#forum] An industry rule, not a law, cuts how long certificates last. [#days] Public certificates used to last 398 days. From 15 March 2029, the maximum is 47 days. [#hand] Renewing by hand will not keep up.

## good {hold=1.2}
What good looks like. [#list] One inventory of everything with a date, each with an owner by name. [#auto] Auto-renew on a company account, with a lock on the main domain. [#alert] Alerts thirty days ahead, sent to a team. [#acme] {ACME|ack mee} renews certificates by itself. [#ncsc] {NCSC|N C S C} UK guidance suggests auto-renewal, a shared contact mailbox and {two-step|two step} verification on the registrar account.

## first {hold=1.2}
A suggested first step. [#make] Make one list of every domain and certificate we own. [#owner] Give each an expiry date and an owner. [#test] Then ask what would stop if the certificate on our busiest system link expired tonight.

## outro {hold=2}
Nobody hacked anything. [#keep] A date passed. A name on a list prevents it.
