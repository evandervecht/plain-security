# The unpatched server: known hole, published fix, still open

## intro {hold=1}
How long does a known hole stay open on our systems? [#four] Patching fails in four ways.

## wait
First, the fix is delayed. [#pub] When a vendor publishes a fix, scanners sweep the internet within hours. [#queue] Ours sits in a queue, three weeks from the next maintenance window. [#days] The number that matters is the days between fix published and fix applied.

## eol
Second, software that cannot be patched. [#old] The vendor stopped support years ago, but it still runs payroll. [#perm] Every new hole stays open for good. [#win] Windows 10 support ended on 14 October 2025.

## edge
Third, the box at the edge that nobody owns. [#vpn] A VPN or firewall appliance faces the internet. [#mail] The vendor's critical notice goes to a mailbox nobody reads. [#undo] One appliance with no owner undoes every control behind it.

## unknown
Fourth, systems we did not know we had. [#forgot] A test server, an agency website, a cloud machine from a trial. [#list] None is on the inventory, so none is patched. [#scan] Attackers scan everything with our name on it.

## good {hold=1.2}
What good looks like. [#inv] A complete inventory, kept current automatically. [#dead] Patch deadlines, in days for anything the internet can reach. [#emerg] An emergency path outside the change window. [#owner] A named owner for every edge device. [#nis2] {NIS2|niss two} names vulnerability handling as a risk-management measure.

## first {hold=1.2}
A suggested first step. [#days2] Ask how many days a critical fix for an internet-facing system waits today. [#dash] Then ask whether that number is on a dashboard reported to the board. [#fail] If nobody can answer the first, the second is the problem.

## outro {hold=2}
Known hole, published fix. [#keep] Measure the days, and name an owner.
