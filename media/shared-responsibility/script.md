# Shared responsibility: whose job is it?

## intro {hold=1}
When something breaks in the cloud, whose job was it? [#four] Four misunderstandings cause most of the trouble.

## certified
First, the provider is certified, so we are secure. [#real] The certificate is real, and it stops at a line. [#below] Below the line, the provider is responsible. [#above] Above it, our data, our users and our configuration are ours. [#every] In every service model, identity and data stay with us. [#audit] A clean provider audit can sit next to our own open storage.

## patched
Second, it is in the cloud, so it is patched and backed up. [#host] The provider patches the physical host. [#vm] The operating system inside our rented server is ours. [#green] The provider's status page shows green throughout. [#db] And so does a database left open to the world.

## vendor
Third, the vendor takes care of everything. [#runs] With finished software, the vendor runs the application and recovers it when their side fails. [#users] We own the users, their rights and our own settings. [#delete] When our administrator deletes a mailbox, that is not their failure. [#gone] Their backup does not bring it back.

## sla
Fourth, it is in the contract. [#up] A service level agreement covers uptime. [#late] Breach notification may only say, within a reasonable time. [#news] Then we read about our own breach in the news. [#clock] And our notification clock started when we became aware.

## good {hold=1.2}
What good looks like. [#matrix] A responsibility matrix, one page per service, signed by a named owner on our side. [#cuec] The provider's audit report lists our controls, in the auditor's own words. [#owner] Every workload has an owner. [#backup] We back up our own software data. [#contract] A contract checklist asks for notification in hours. [#cost] This is mostly paperwork and ownership. [#nis2] {NIS2|niss two} is clear: outsourcing a layer does not outsource the obligation.

## first {hold=1.2}
A suggested first step. [#ask] Ask for the responsibility matrix of the five services we depend on most. [#who] And for the name of the person on our side who signed each one. [#find] If either is missing, that is the finding.

## outro {hold=2}
Four misunderstandings. [#keep] The cloud is a division of labour, and our part is written down.
