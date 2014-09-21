moocalc
=======

A simple onscreen calculator widget using MooTools

![Screenshot](http://mud.owlbox.net/files/mootools/MooCalc/screenshot.png)

How to use
----------

Basic usage:

    <!-- in head -->
    <link href="moo-calc.css" rel="stylesheet" />
    <script src="moo-calc.js"></script>
    <!-- domready -->
    <script>
	window.addEvent('domready',function () {
		new MooCalc('calc',{
			showConversions: true,
			showFuncs: true,
			hideOnResult: false,
		});
	});
    </script>
    <input type="text" id="calc" name="calc" />


Screenshots
-----------

![Screenshot 1](http://mud.owlbox.net/files/mootools/MooCalc/screenshot_full.png)

