hop-ons.js
==========
Help tool for developers testing responsivity in web projects.
Developed in Javascript with no external dependencies.


Functionality

- Display website in commmon devices size.
- Flip orientation of device.
- Preview size on hover.
- Display as custom size by typing dimensions directly in x- / y-displays.
- Save custom dimensions as a device.
- Parse existing CSS for Media Query limits and add them to devices menu.
- Toggle size of window by 1px when MQ-device is active to show exactly what difference it does.


Horizontal menu description:

1. Reload: reloads page in iframe and resets all the Media Query limits it has found. Does not reload encapsulating page.
2. Flip orientation: flips orientation of current device
3. CSS: Media Query code tips for limits that matches the current device
4. MQ: displays the Media query limits found in user CSS-file as devices, allows direct testing of limits
(5.) Toggle Size: (only visible when a MQ device is active), changes the size by 1px to see MQ's at work


Vertical menu description:
List of devices
The Media Query limits are displayed as devices in a list next to the ordinary device list when the MQ (horizontal 4) button is clicked.

1. Fullpage: fits device to browser window size.
2. iPhone: iPhone 3, 4 viewport size.
3. iPhone5: iPhone5 viewport size.
4. iPad mini
5. iPad
6. HD-display


Usage:

Put a script element with src to the hop-ons-init.js file in header of website.
Requires the wesite to run in some kind of server that allows http-requests (python SimpleHTTPServer works fine), because it uses AJAX to fetch the CSS for parsing and finding Media Query limits.
