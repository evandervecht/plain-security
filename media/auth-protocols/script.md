# Eight ways to prove who you are

## intro {hold=1}
Which of our logins still end in a password? [#eight] There are eight ways to prove who you are, and each can fail.

## tokens
First, tokens. [#oauth] {OAuth2|oh auth two} lets an app act for you without your password. [#consent] The risk is consent. A malicious app asks for broad scopes, and someone clicks Allow. [#bearer] Access tokens work for whoever holds them, and a stolen refresh token keeps working for weeks.

## legacy
Second, the legacy estate. [#kerb] {Kerberos|kerberos} and {NTLM|N T L M} keep Windows domains running. [#roast] Attackers crack service account passwords offline, or replay hashes. [#vpn] {LDAP|L D A P} and {RADIUS|radius} sit behind VPNs and Wi-Fi, and a password is often all it takes. [#off] Microsoft plans to switch network NTLM off by default in the next major Windows Server release.

## keys
Third, static keys. [#key] A key that a script or tool sends with every request is a password with no owner. [#leak] It leaks into code, tickets and chat, and rarely expires. [#find] Whoever finds one can do everything it allows, from anywhere, until someone rotates it.

## agents
Fourth, AI agents. [#agent] They log in, hold credentials and act, but they are not a person, and they do not do multi-factor authentication. [#inject] A line of text in a document an agent reads can redirect it. [#valid] It then uses its own valid token, so every log entry looks legitimate.

## good {hold=1.2}
What good looks like. [#pass] {Passkeys|pass keys} for people, built on the {FIDO2|fido two} standard. The key is bound to the real domain, so a fake site gets nothing. [#mtls] Certificates with mutual {TLS|T L S} for services. [#agentid] One identity, one owner and a kill switch for each agent. [#pw] Passwords, SMS codes and static keys do not hold up.

## first {hold=1.2}
A suggested first step. [#admin] Start passkeys with administrators, and anyone who can move money. [#recov] Then check that lost-device recovery does not fall back to SMS or a helpdesk call.

## outro {hold=2}
Passwords, SMS codes and static keys do not hold up. [#keep] {Passkeys|pass keys} and certificates do.
