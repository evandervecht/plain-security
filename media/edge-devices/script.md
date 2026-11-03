# The box at the edge: who owns it, and is it patched?

## intro {hold=1}
Who owns our VPN box, and is it patched? [#four] Four questions decide whether it is the way in.

## owner
First, who owns it? [#own] Servers have an owner and a patch cycle. [#box] The VPN or firewall was often installed by a supplier years ago, and sits outside both. [#m] Mandiant's 2026 report finds exploits were the most common way in for the sixth year running.

## speed
Second, how fast is it patched? [#days] Attackers start within days, sometimes before the fix exists. [#ncsc] In 2025, Dutch organisations were breached through a {Citrix|sit rix} flaw seven weeks before the patch. [#v] Verizon finds only 26% of known-exploited holes were fully fixed, after a median of 43 days. [#eol] A box past end-of-life never gets a fix.

## expose
Third, what does it expose? [#admin] The admin page is often reachable from the whole internet. [#pw] A VPN login with only a password is one guess from the inside. [#set] Both are settings, not purchases.

## door
Fourth, how much does one login open? [#vpn] A classic VPN puts a connected laptop inside the network. [#stolen] A stolen login reaches everything. [#zt] With zero trust, access is granted per application, so a stolen login reaches one.

## good {hold=1.2}
What good looks like. [#inv] The Five Eyes guidance of February 2025 names an inventory of internet-facing devices, with support dates, as a baseline. [#lane] Edge advisories get an emergency patch lane. [#mfa] The admin page stays off the internet, and every remote login uses {MFA|M F A}. [#nis2] {NIS2|niss two} Article 21 requires vulnerability handling in the maintenance of systems.

## first {hold=1.2}
A suggested first step. [#list] Make one list of every device facing the internet. [#name] Add an owner's name, the version, and the vendor's end-of-support date. [#q] Then ask how many days pass between an advisory and our patch.

## outro {hold=2}
A list, a setting and a date. [#keep] That closes most of the door.
