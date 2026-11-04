# SSL and TLS cipher suites: a layer deeper into encryption in transit

## intro {hold=1}
Is our encryption in transit as strong as we think? [#suites] Cipher suites decide what gets encrypted, and how strongly. [#readable] Wrong choices leave data readable by design.

## weak
First, weak settings. [#agreed] We agreed on {TLS|T L S} 1.3, but one endpoint still allows a legacy cipher. [#compat] Legacy settings stay on for compatibility. [#log] They are invisible in logs. [#aead] Consider modern ciphers only, and phase out the legacy ones.

## downgrade
Second, a downgrade. [#both] Both sides support {TLS|T L S} 1.3, but a custom client fell back to {TLS|T L S} 1.0. [#retry] Its own retry logic did it. [#silent] The negotiation is silent, and it forces a weak protocol. [#fail] Consider failing on a weak version, with no fallback below {TLS|T L S} 1.2.

## keys
Third, the key exchange. [#static] Session keys are protected by the server's static private key. [#forward] Without forward secrecy, whoever gets that key later can decrypt old traffic. [#harvest] That is harvest now, decrypt later. [#ephem] Consider a key exchange with fresh keys each session, and hybrid post-quantum where available.

## good {hold=1.2}
What good looks like. [#once] Hardening is not a single checklist. [#drift] Old versions are often a default, and configurations drift when teams change. [#scan] Continuous scanning, an owner for every red finding, [#pq] and a plan for hybrid post-quantum key exchange usually keep it contained.

## first {hold=1.2}
A suggested first step. [#ask] Ask the CIO or the CISO for four numbers. [#a] Systems offering only {TLS|T L S} 1.2 or newer, with modern suites. [#b] Systems still accepting {TLS|T L S} 1.0 or 1.1. [#c] Key exchanges with forward secrecy, and connections using hybrid post-quantum.

## outro {hold=2}
Encryption settings drift over time. [#keep] Scan continuously, and give every finding an owner.
