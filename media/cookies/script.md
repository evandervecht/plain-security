# Cookie hijacking: how attackers use borrowed credentials

## intro {hold=1}
Can an attacker get into our systems without the password? [#stolen] A stolen session cookie does exactly that. [#mfa] It skips the multi-factor check the user already passed.

## xss
First, a script reads the cookie. [#xss] An attacker injects JavaScript into a page, and that script can read any cookie without the {HttpOnly|http only} flag. [#quiet] Nothing looks wrong, and the multi-factor check was already passed. [#flag] Consider the HttpOnly flag, so JavaScript cannot touch the cookie.

## network
Second, someone catches the cookie on its way. [#proxy] A phishing proxy or plain {HTTP|H T T P} lets the attacker copy it. [#wifi] Wi-Fi sniffing works the same way. [#fix] Consider phishing-resistant {MFA|M F A}, the Secure flag and {HSTS|H S T S}.

## session
Third and fourth, the session itself is abused. [#fixation] With fixation, we hand out a session ID that the attacker guessed first, because it was weak. [#csrf] With a forged request, the browser sends the cookie along with something the user never asked for. [#fix2] Suggested: strong randomness, a new ID at every login, {SameSite|same site} {Lax|lacks} and {CSRF|C S R F} tokens.

## agent
Fifth, a local AI coding agent. [#read] It can read the browser's profile files directly, with no JavaScript and no network. [#flags] HttpOnly, Secure and SameSite do not help here. [#box] Consider a sandboxed agent, device-bound sessions and an outbound allowlist.

## good {hold=1.2}
What good looks like. [#layers] Defence in depth, several layers that work together. [#httponly] HttpOnly stops script theft, but not interception. [#secure] Secure stops interception, but not fixation. [#samesite] SameSite stops forged requests, but not injected scripts. [#weak] The weakest link breaks the chain.

## first {hold=1.2}
A suggested first step. [#ask] Ask the security lead for five numbers. [#kri] The share of cookies with HttpOnly and Secure, and the share of sign-ins with phishing-resistant {MFA|M F A}. [#open] Also open XSS and CSRF findings from testing.

## outro {hold=2}
A stolen cookie is a stolen identity. [#keep] Layer the controls, and track the numbers.
