# Terraform state: the map of everything you run

## intro {hold=1}
Where is the file that maps everything we run, and who can read it? [#map] It is called the Terraform state. [#five] Five things decide whether it is an asset or a liability.

## what
First, what state is. [#code] The code says what we want. [#state] The state records what was built, and its ID. [#cloud] The cloud is what actually runs. [#lose] Lose the state, and the tool forgets what it owns.

## secrets
Second, secrets. [#plain] The tool's documentation says a secret in the configuration is stored in the state. [#enc] Cloud storage encrypts it at rest, but decrypts it for everyone with read access. [#who] So the reader list matters more than the encryption setting.

## lock
Third, two writers, one file. [#two] If a pipeline and an engineer change the same infrastructure at once, one overwrites the other. [#lock] Locking stops that. [#s3] With Amazon S3, it is switched off unless you turn it on. [#ver] Versioning keeps earlier copies, so a bad change can be undone.

## boot
Fourth, who builds the place where state lives? [#chick] The storage must exist before Terraform can use it. [#start] A usual way out is to start with a small local setup, [#build] build the locked, versioned, encrypted bucket, [#move] and then move the state in.

## where
Fifth, where the state lives. [#four] {HCP|H C P} Terraform, GitLab, Amazon S3 and Azure storage all encrypt at rest. [#diff] The difference is who can read it.

## good {hold=1.2}
What good looks like. [#remote] Remote state, never in a code repository. [#short] A short, reviewed reader list. [#nosec] No secrets in the state. [#lv] Locking on. Versions on. [#boot] A documented bootstrap, with an owner. [#nis] {NIS2|niss two} Article 21 lists backup, access control, asset management. Well run state can support them.

## first {hold=1.2}
A suggested first step. [#ask] Ask for the list of readers, not the encryption setting. [#rest] And ask whether anyone has tried restoring it.

## outro {hold=2}
Treat the state as a crown jewel. [#own] Give it an owner.
