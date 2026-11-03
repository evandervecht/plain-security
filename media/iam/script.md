# IAM: who may do what, and who checks

## intro {hold=1}
Who decides what each account may do, and who checks? [#four] {IAM|I A M} goes wrong in four ways.

## orphans
First, the account nobody owns. [#most] Most identities in a company are not people. They are service accounts, keys and scripts. [#left] Their creator left years ago, and their passwords never change. [#rights] Their rights were set generously, once. [#abuse] Nobody notices when one is abused.

## wildcards
Second, roles designed too wide. [#star] A role gets a wildcard, because the precise list was long. [#copy] Then the role is copied to the next team. [#estate] Years later, one stolen developer laptop equals the entire data estate. Nobody remembers deciding it.

## hats
Third, one person holds both signatures. [#vendor] Creating a supplier is fine. [#pay] Releasing a payment is fine. [#both] The same account doing both means one attacker can invent a vendor and pay it. [#log] Both actions are logged, and both look legitimate.

## shared
Fourth, the login everybody shares. [#four2] A team of four uses one administrator account. [#sheet] The password lives in a spreadsheet, and nobody changes it. [#who] When something disappears, the log names admin. [#leaver] And last summer's intern can still log in.

## good {hold=1.2}
What good looks like. [#inv] An inventory gives every account a named owner. [#vault] A vault holds the secrets. [#least] Roles are built from what the job does, with no wildcards. [#sod] A written matrix says which permissions no single account may hold. [#pam] Only personal accounts, with privileged access checked out per task. [#cert] Business owners, not {IT|I T}, confirm access every quarter. [#nis2] {NIS2|niss two} requires access control policies, in Article 21.

## first {hold=1.2}
A suggested first step. [#ask] Ask two questions. Who owns the list of who may do what? [#when] And when did a business owner last sign it off? [#shrug] If either answer is a shrug, the rights are whatever they have grown into.

## outro {hold=2}
Four ways rights go wrong. [#keep] Name an owner, and have the business sign it off.
