# Entra ID: the keys to Microsoft 365

## intro {hold=1}
Could one phished administrator hand over our whole Microsoft 365? [#four] Entra ID is where it breaks, in four ways.

## admins
First, too many people own the tenant. [#key] Global Administrator is the master key. It reads every mailbox and changes every password. [#perm] Most tenants give it permanently to far more people than they think. [#phish] Fool one of them, and the whole tenant is taken.

## gate
Second, the gate is open. [#legacy] Legacy sign-in sends a bare password and cannot ask for a second factor. [#exempt] Some administrators are exempt from {MFA|M F A}, and personal phones nobody manages open company mail. [#count] The company believes it has {MFA|M F A}, but not where it counts.

## guests
Third, the guests never left. [#invite] Inviting an outsider takes one click. Removing one takes a decision nobody owns. [#keep] Guests keep every Team and folder they were ever added to. [#read] Board material stays readable by people we no longer work with.

## hybrid
Fourth, the back door between two worlds. [#sync] A sync tool links our own directory with the cloud. [#keys] Its server holds credentials strong enough to change cloud accounts. [#both] So a breach in either world becomes a breach of both.

## good {hold=1.2}
What good looks like. [#pim] {PIM|pim} means nobody is an administrator by default. Aim for five eligible people or fewer. [#ca] A Conditional Access baseline blocks legacy sign-in and demands a second factor from everyone. [#key2] Administrators get passkeys or hardware keys. [#guest] Every guest gets an owner and an expiry. [#tier] The sync server is treated as tier zero. [#cost] These are settings in a licence we already pay for. [#nis2] {NIS2|niss two} names access control and secure sign-in among its measures.

## first {hold=1.2}
A suggested first step. [#ask] Ask how many people can take over the tenant today, and how many should. [#five] If the answer is above five, or nobody knows, that is the finding.

## outro {hold=2}
Four ways to lose the tenant. [#keep2] Fewer standing administrators, and a closed gate.
