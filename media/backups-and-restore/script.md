# Could we restore?

## intro {hold=1}
If ransomware hits tonight, could we restore? [#two] Two numbers decide the next weeks: how much work is lost, and how long we are down. [#four] Four questions show where we stand.

## targets
First, do we know our recovery targets? [#rpo] The {RPO|R P O} is how much work we accept losing. [#rto] The {RTO|R T O} is how long we accept being down. [#it] In most organisations, IT set both by default, from whatever the backup tool did. [#biz] Consider a short list: the ten systems that matter most, with two numbers each.

## copies
Second, can an attacker reach the backups? [#first] Ransomware crews look for the backup server before they encrypt anything. [#same] If it accepts the same administrator login, the backups go first. [#three] The old rule is three copies, on two kinds of storage, one off-site. [#offline] Ransomware adds one more: a copy that is offline or immutable.

## restore
Third, has anyone restored everything? [#green] The backup job says green every night. [#tried] But a report shows the copy was written, not that it can be read back. [#key] One example is the key kept on the server that was just encrypted. [#timed] A timed restore test turns hope into a fact.

## cloud
Fourth, who backs up our cloud applications? [#up] The provider keeps the service running. [#days] But Microsoft keeps deleted content for at most 30 days. [#own] Protecting our own data is our job.

## good {hold=1.2}
What good looks like. [#nist] {NIST|nist} defines both recovery targets. [#ncsc] {NCSC|N C S C} UK guidance sets the three copies. [#gdpr] {GDPR|G D P R} Article 32 asks for the ability to restore, and regular testing of it.

## first {hold=1.2}
A suggested first step. [#ten] Ask IT for the ten most important systems, and the hours each could be down. [#stop] Then ask whether anyone has restored them end to end, from a copy an attacker could not reach, with a stopwatch running. [#call] How much downtime to accept is the board's call.

## outro {hold=2}
A backup is a hope. [#fact] A restore is a fact.
