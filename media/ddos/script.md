# DDoS: offline without a break-in

## intro {hold=1}
Can we be offline without anyone breaking in? [#four] A {DDoS|D D O S} attack can do it, in four ways.

## flood
First, the pipe fills up. [#crowd] Hundreds of thousands of hijacked devices send traffic at once. [#full] Our connection has a fixed size, so real customers cannot get through. [#only] Only capacity in front of us, bigger than any attacker, absorbs it.

## exhaust
Second, expensive requests. [#bots] Bots ask for product searches, logins and password resets. [#up] The dashboards say the site is up, but nobody can use it. [#cap] Capping the expensive actions helps more than adding servers.

## dns
Third, one address book for everything. [#dns] Customers find us through {DNS|D N S}. [#all] If that provider fails, our website, email and app vanish at once. [#reg] It is rarely on the risk register.

## timed
Fourth, the timing. [#peak] Attackers pick our busiest day. [#demo] A short demonstration attack is followed by a demand to pay. [#pays] Paying proves that we pay, and invites the next demand.

## good {hold=1.2}
What good looks like. [#cdn] A {CDN|C D N} with scrubbing sits in front of everything public. [#dns2] Two independent {DNS|D N S} providers answer for us. [#rate] Rate limiting and bot management protect the expensive pages. [#fail] A failover page and a tested runbook keep customers informed. [#nis2] {NIS2|niss two} names business continuity and crisis management as risk-management measures.

## first {hold=1.2}
A suggested first step. [#cost] Ask what one hour offline costs on our busiest day. [#who] Then ask who, by name, may switch the mitigation on at three in the morning. [#minute] If either answer takes longer than a minute, that is the gap. [#nopay] Consider deciding in advance that we do not pay.

## outro {hold=2}
Availability is revenue per hour. [#keep] Put capacity in front of us, and decide before the demand arrives.
