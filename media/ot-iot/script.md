# The factory, the building and the cameras: four ways they stop

## intro {hold=1}
Can a laptop in the office reach our production line today? [#four] Four ways the plant stops.

## reach
First, the office network reaches the plant. [#cable] Controllers, badge readers and cameras were plugged into whatever cable was nearest. [#same] Today that cable usually leads to the same network as the office laptops. [#line] Infection that starts in finance can reach the machine that fills the bottles.

## patch
Second, these devices cannot be patched. [#never] A controller gets an update never. The vendor is gone, or an update means stopping production. [#factory] Cameras and door controllers ship with a factory password nobody changes. [#choice] The choice is to isolate, replace early, or accept that it is open. That is a business decision with a price tag.

## vendor
Third, the vendor's back door. [#remote] The vendor set up remote access years ago, and it stayed. [#shared] One password, shared by the whole service team, valid around the clock, straight to the controllers. [#contract] The maintenance contract usually says nothing about it.

## safety
Fourth, the damage is physical. [#set] A changed setpoint overheats a vessel. [#screen] The operator screen can show normal values while the process is anything but. [#nobackup] That is not restored from a backup. [#reg] From 20 January 2027, the Machinery Regulation requires that connected devices cannot make new machinery unsafe.

## good {hold=1.2}
What good looks like. [#inv] A device inventory, with an owner for each. [#seg] A wall between office and plant, with one monitored crossing. [#jump] Vendor access only on request, through a jump host that records the session. [#mon] Plant monitoring, and offline backups of every configuration. [#iec] {IEC 62443|I E C six two four four three} zones and conduits are the common yardstick.

## first {hold=1.2}
A suggested first step. [#ask] Ask two questions. Can a laptop in the office reach the production line today? [#who] And who would notice if it did? [#diagram] If the answers are probably and nobody, the first control is a line on a network diagram.

## outro {hold=2}
Four ways the plant stops. [#keep] Draw the line between office and plant.
