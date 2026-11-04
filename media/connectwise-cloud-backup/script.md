# The trusted app that let them in

## intro {hold=1}
Which outside apps can sign in to our Microsoft 365 without anyone typing a password? [#cw] On 16 October 2026, ConnectWise reported unauthorized access to the app credentials of its {Cloud Backup|cloud backup} service. [#three] Three questions matter.

## app
First, whose key opens the door? [#key] Someone with those credentials signs in as the app itself. [#nouser] There is no user and no multi-factor prompt. [#rights] Once an administrator approves an app, it keeps its rights until someone removes them. [#admin] Microsoft reports one management app that gave itself Global Administrator.

## speed
Second, how fast do they move? [#agents] Microsoft says the attackers used an open-source framework of AI agents. [#tenants] They tried to sign in to more than 2,250 tenants. [#hours] In several cases, privileged access came in less than three hours. [#alert] A monthly review is too slow. Consider alerts on new app keys and admin roles, day and night.

## backup
Third, what if our backup supplier is the incident? [#paused] ConnectWise suspended the backup service, and two more as a precaution. [#kept] It says existing archives remain encrypted and preserved. [#nodate] On 23 October 2026, it had given no firm date to return. [#msp] If an {MSP|M S P} runs our IT, did they use these tools for us?

## good {hold=1.2}
What good looks like. [#nis2] {NIS2|niss two} Article 21 requires supply chain security and access control. [#list] That means a list of every outside app with its rights and an owner. [#appid] Logs searched by application ID. [#alerts] Alerts handled within the hour. [#second] And a second copy of critical mail and files.

## first {hold=1.2}
A suggested first step. [#q1] Ask which outside apps can read our mail and files, or change admin roles. [#q2] Ask whether anyone would notice a new admin role within hours. [#q3] Ask for a written tenant review from our {MSP|M S P}. [#keep] Keep the affected apps disabled, rather than deleted, until ConnectWise gives instructions.

## outro {hold=2}
This attack used trust we had already given. [#trim] Trim what outside apps can do.
