# Email security: four ways it breaks

## intro {hold=1}
Can a stranger send email that looks like it comes from our CFO? [#four] Email breaks in four ways.

## listen
First, someone listens in. [#hop] A message crosses several networks before it lands. [#plain] If one hop uses plaintext instead of {TLS|T L S}, whoever sits there can read it. [#quiet] Nothing breaks and no alert fires, so it can go unnoticed for years.

## rewrite
Second, someone rewrites the message. [#iban] Often the attacker writes from a hacked supplier mailbox and changes one bank account number. [#late] Both sides see a normal thread, and the mismatch surfaces weeks later. [#call] Consider a call-back: confirm any bank change by phone, on a number you already have.

## pretend
Third, someone pretends to be us. [#from] Nothing in the email protocol stops a stranger from typing our domain into the From field. [#cost] The cost is CEO fraud, phishing of our customers under our brand, and our own mail landing in spam.

## middle
Fourth, someone sits in the middle. [#strip] Encryption between mail servers is optional by default, so an attacker can strip the offer, and both servers fall back to plaintext. [#both] From there, they read everything and can change anything. [#board] That is why it matters at the top. It defeats the assumption that we have encryption.

## good {hold=1.2}
What good looks like. [#spf] {SPF|S P F} lists who may send as our domain. {DKIM|dee kim} signs each message. [#dmarc] {DMARC|dee mark} tells receivers what to do when those fail. Only reject blocks. [#sts] MTA-STS and {DANE|dane} make encryption mandatory, so a stripped connection fails. [#dns] These are DNS records and mail server settings, so the cost is engineering hours. [#nis2] {NIS2|niss two} Article 21 lists cyber hygiene and encryption, and these controls help show both.

## first {hold=1.2}
A suggested first step. [#ask] Ask whether we move {DMARC|dee mark} to reject, and MTA-STS to enforce. [#modes] The monitoring modes cost the same effort and block nothing. [#test] A free online test shows where we stand.

## outro {hold=2}
Four ways email breaks. [#keep] Enforce the records, and keep the call-back for payments.
