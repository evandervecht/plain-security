# Cloud misconfiguration: the cloud is secure, our settings are not

## intro {hold=1}
Who in our company can make customer data public, and would anyone notice? [#four] Four settings cause most cloud breaches.

## bucket
First, a storage bucket open to the whole internet. [#share] Someone needs to share a file, a deadline is close, and they make the bucket public. [#back] The setting is never changed back. [#scan] Scanners sweep the internet for exactly this, and can find it within hours. [#own] Nobody attacked us. We published it ourselves.

## key
Second, an access key in the source code. [#static] A static key grants access without a person, a password or a second factor. [#repo] If the repository is public for a few minutes, bots copy the key. [#six] They use it before anyone removes it. [#bill] The fastest outcome is a bill for hundreds of servers.

## role
Third, one role that can do everything, everywhere. [#split] A cloud estate can be split into many separate accounts. That separation is cheap security, if nothing bridges it. [#bridge] Usually one role does: an administrator, or a deployment pipeline. [#all] Whoever holds that credential holds the entire company, backups included.

## region
Fourth, a region where nobody is watching. [#regions] With a stolen key, the intruder picks the region we never open. [#nolog] Logging there was never switched on, so nothing raises an alert. [#invoice] The finance team finds them first, when the invoice doubles. [#proof] And we cannot tell a regulator that we checked.

## good {hold=1.2}
What good looks like. [#zone] A landing zone creates every new account with logging and guardrails already in place. [#policy] A policy at organisation level makes public storage impossible to save. [#nokeys] Workloads use identities instead of static keys. [#least] Each workload gets a role for its own job only. [#logs] All accounts and regions log to one central place. [#cost] These are settings, not products. [#nis2] {NIS2|niss two} lists access control among its measures, and the configuration stays ours.

## first {hold=1.2}
A suggested first step. [#ask] Ask who can change a setting that makes customer data public. [#same] And would anyone notice the same day? [#risk] If the answers are several dozen people, and probably not, that is the risk, not the cloud.

## outro {hold=2}
Four settings, one rule. [#keep] The provider secures the building. We lock our own doors.
