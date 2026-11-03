# Encrypted at rest: who can still read it?

## intro {hold=1}
If someone steals our encrypted data, can they read it? [#four] Usually not from a disk. Usually yes from a login. Four questions decide which.

## login
First, locked on the disk, open at login. [#disk] A stolen disk or backup yields nothing readable. [#login] A phished account or a leaked access key reads everything in plain text. [#q] "Encrypted at rest" in a questionnaire answers the stolen disk question, not the stolen login question.

## keys
Second, whoever holds the key holds the data. [#taped] A key stored next to the data is a safe with the key taped to the door. [#admin] Cloud providers manage keys by default, so anyone with enough admin access in our account can use them. [#kms] For the most sensitive data, consider a key we manage ourselves, with different people managing keys and data. [#lose] Lose the key, and we lose the data too.

## copies
Third, the copy nobody encrypted. [#sys] The database is encrypted. [#copy] The nightly export, the USB stick, the old laptop and the test system loaded with real data may not be. [#one] One readable copy is enough.

## quantum
Fourth, the quantum question. [#aes] Stored data under AES-256 is not the weak spot. [#pk] A large quantum computer would break public-key encryption, such as RSA and ECC. [#where] That matters for recorded network traffic, and for archives encrypted to a public key.

## good {hold=1.2}
What good looks like. [#access] Access comes first: multi-factor login, least privilege, and alerts on bulk reading. [#apart] Keys are kept apart from data, and every use is logged. [#cov] Coverage is checked for every location. [#dora] DORA's technical standard, Articles 6 and 7, requires an encryption policy and key management over the whole key lifecycle.

## first {hold=1.2}
A suggested first step. [#ask] Ask three questions. [#who] Who can read it while the system runs? [#keys2] Where are the keys, and who can use them? [#copies2] Which copies are not encrypted?

## outro {hold=2}
Is it encrypted is the wrong question. [#keep] Ask who can read it.
