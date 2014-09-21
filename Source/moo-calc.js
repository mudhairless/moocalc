/*
---
description: A simple onscreen calculator widget

license: MIT-style

authors:
- Ebben Feagan (mudhairless) ebben.feagan@gmail.com

requires:
- core/1.5.0: '*'
- more/1.5.0: Element.Forms

provides:
- MooCalc

...

Examples available at: http://mud.owlbox.net/files/mootools/MooCalc/Examples/example2.html and http://mud.owlbox.net/files/mootools/MooCalc/Examples/example1.html

*/

(function () {

	this.MooCalc = MooCalc = new Class({

		Implements: [Options],

		calc: null,

		options: {
			//onCalculate: function(calcResult){}
			windowClass: 'mooCalc',
			calcPosition: 'bottom',
			showConversions: false,
			showFuncs: false,
			hideOnResult: true,
			unitPrettyNames: {
				mass: {
					g: 'Grams (g)',
					oz: 'Ounces (oz)',
					lb: 'Pounds (lb)',
					ust: 'Short Tons (US t)',
					kg: 'Kilograms (kg)',
					mg: 'Milligrams (mg)',
					mcg: 'Micrograms (mcg)',
					mt: 'Metric Tons (t)',
				},
				temp: {
					k: 'Kelvin (K)',
					c: 'Celsius (C)',
					f: 'Farhenheit (F)'
				},
				length: {
					m: 'Meters (m)',
					km: 'Kilometers (km)',
					cm: 'Centimeters (cm)',
					mm: 'Millimeters (mm)',
					in: 'Inches (in)',
					ft: 'Feet (ft)',
					yd: 'Yards (yd)',
					mi: 'Miles (mi)',
					fur: 'Furlongs (fur)',
					nm: 'US Nautical Miles (nm)',
					ly: 'Light Years (ly)'
				},
				volume: {
					l: 'Liters (L)',
					ml: 'Milliliters (ml)',
					cl: 'Centiliters (cl)',
					kl: 'Kiloliters (kl)',
					dl: 'Deciliters (dL)',
					dal: 'Dekaliters (daL)',
					tsp: 'Teaspoons (tsp)',
					tb: 'Tablespoons (T)',
					g: 'Gallons (g)',
					q: 'Quarts (q)',
					c: 'Cups (c)',
					floz: 'Fluid Ounces (fl oz)',
					p: 'Pints (pt)',
					b: 'Barrels (bbl)',
					j: 'Jiggers (jigger)',
				},
				area: {
					sqm: 'Square Meters (sq m)',
					hec: 'Hectares (hec)',
					sqkm: 'Square Kilometers (sq km)',
					sqmi: 'Square Miles (sq mi)',
					acre: 'Acres (acre)',
					sqyd: 'Square Yards (sq yd)',
				},
			},
			conversionPrettyNames: {
				mass: 'Weight',
				temp: 'Temperature',
				length: 'Length',
				volume: 'Volume',
				area: 'Area',
			},
			conversions: {
				mass: { //base unit is g
					g: {
						to: function (f) { return f; },
						from: function (f) { return f; }
					},
					oz: {
						to: function (f) { return f * 0.035274; },
						from: function (f) { return f / 0.035274; }
					},
					kg: {
						to: function (f) { return f / 1000; },
						from: function (f) { return f * 1000; }
					},
					mg: {
						to: function (f) { return f * 1000; },
						from: function (f) { return f / 1000; }
					},
					mcg: {
						to: function (f) { return (f * 1000) * 1000; },
						from: function (f) { return (f / 1000) / 1000; }
					},
					lb: {
						to: function (f) { return (f * 0.035274)/16; },
						from: function (f) { return (f*16) / 0.035274; },
					},
					mt: {
						to: function (f) { return (f / 1000) / 1000; },
						from: function (f) { return (f * 1000) * 1000; }
					},
					ust: {
						to: function (f) { return f / 9.0718e+5; },
						from: function (f) { return f * 9.0718e+5; }
					}
				},
				temp: { //base unit is kelvin
					k: {
						to: function (f) { return f; },
						from: function (f) { return f; }
					},
					c: {
						to: function (f) { return f - 273.15; },
						from: function (f) { return f + 273.15; }
					},
					f: {
						to: function (f) { return (1.8 * (f-273.15)) + 32;},
						from: function (f) { return ((f-32)/1.8)+273.15; }
					}
				},
				length: { //base unit is meters
					m: {
						to: function (f) { return f; },
						from: function (f) { return f; }
					},
					km: {
						to: function (f) { return f / 1000; },
						from: function (f) { return f * 1000; }
					},
					cm: {
						to: function (f) { return f * 100; },
						from: function (f) { return f / 100; }
					},
					mm: {
						to: function (f) { return f * 1000; },
						from: function (f) { return f / 1000; }
					},
					in: {
						to: function (f) { return f * 39.37; },
						from: function (f) { return f / 39.37; }
					},
					ft: {
						to: function (f) { return f * 3.2808; },
						from: function (f) { return f / 3.2808; }
					},
					yd: {
						to: function (f) { return f * 1.0936; },
						from: function (f) { return f / 1.0936; }
					},
					mi: {
						to: function (f) { return f / 1609.344; },
						from: function (f) { return f * 1609.344; }
					},
					fur: {
						to: function (f) { return f / 201.168; },
						from: function (f) { return f * 201.168; }
					},
					nm: {
						to: function (f) { return f / 1852; },
						from: function (f) { return f * 1852; }
					},
					ly: {
						to: function (f) { return f / 9.45425495549E+15; },
						from: function (f) { return f * 9.45425495549E+15; }
					},
				},
				volume: { //base unit is liters
					l: {
						to: function (f) { return f; },
						from: function (f) { return f; }
					},
					ml: {
						to: function (f) { return f * 1000; },
						from: function (f) { return f / 1000; }
					},
					cl: {
						to: function (f) { return f * 100; },
						from: function (f) { return f / 100; }
					},
					kl: {
						to: function (f) { return f / 1000; },
						from: function (f) { return f * 1000; }
					},
					dl: {
						to: function (f) { return f * 10; },
						from: function (f) { return f / 10; }
					},
					dal: {
						to: function (f) { return f / 10; },
						from: function (f) { return f * 10; }
					},
					tsp: {
						to: function (f) { return f * 202.922077922; },
						from: function (f) { return f / 202.922077922; }
					},
					tb: {
						to: function (f) { return f * 67.6315433518; },
						from: function (f) { return f / 67.6315433518; }
					},
					g: {
						to: function (f) { return f * 0.264172052358; },
						from: function (f) { return f / 0.264172052358; }
					},
					q: {
						to: function (f) { return f *  1.05668820943; },
						from: function (f) { return f /  1.05668820943; }
					},
					c: {
						to: function (f) { return f * 4.22675706291; },
						from: function (f) { return f / 4.22675706291; }
					},
					floz: {
						to: function (f) { return f * 33.8146282082; },
						from: function (f) { return f / 33.8146282082; }
					},
					p: {
						to: function (f) { return f * 2.11337853146; },
						from: function (f) { return f / 2.11337853146; }
					},
					b: {
						to: function (f) { return f * 0.0085216791304; },
						from: function (f) { return f / 0.0085216791304; }
					},
					j: {
						to: function (f) { return f * 22.5426818011; },
						from: function (f) { return f / 22.5426818011; }
					},
				},
				area: { //base unit is square meters
					sqm: {
						to: function (f) { return f; },
						from: function (f) { return f; }
					},
					hec: {
						to: function (f) { return f / (10000); },
						from: function (f) { return f * (10000); }
					},
					sqkm: {
						to: function (f) { return f / (1000 * 1000); },
						from: function (f) { return f * (1000 * 1000); }
					},
					sqmi: {
						to: function (f) { return f / 3.86102158593E-7; },
						from: function (f) { return f * 3.86102158593E-7; }
					},
					acre: {
						to: function (f) { return f / 0.000247105407259; },
						from: function (f) { return f * 0.000247105407259; }
					},
					sqyd: {
						to: function (f) { return f * 1.19599056124; },
						from: function (f) { return f / 1.19599056124; }
					},
				},
			},
			funcs: {
				'fix': {
					binary: true,
					func: function (f,s) {
						return f.toFixed(s);
					},
					title: 'Convert to Fixed point'
				},
				'mod': {
					binary: true,
					func: function (f,s) {
						return f % s;
					},
					title: 'Compute the modulus (remainder of x/y)'
				},
				'x^2': {
					binary: false,
					func: function (f) {
						return Math.pow(f,2);
					},
					title: 'Raise x to the power of 2'
				},
				'x^y': {
					binary: true,
					func: function (f,s) {
						return Math.pow(f,s);
					},
					title: 'Raise x to the power of y'
				},
				'√': { //sqrt
					binary: false,
					func: function (f) {
						return Math.sqrt(f);
					},
					title: 'Compute the square root of x'
				},
				'3√': { // cube root
					binary: false,
					func: function (f) {
						var y = Math.pow(Math.abs(f), 1/3);
    					return f < 0 ? -y : y;
					},
					title: 'Compute the cube root of x'
				},
				'log': {
					binary: false,
					func: function (f) {
						return Math.log(f);
					},
					title: 'Compute the natural logarithm of x'
				},
				'sin': {
					binary: false,
					func: function (f) {
						return Math.sin(f);
					},
					title: 'Compute the Sine of x'
				},
				'tan': {
					binary: false,
					func: function (f) {
						return Math.tan(f);
					},
					title: 'Compute the Tangent of x'
				},
				'cos': {
					binary: false,
					func: function (f) {
						return Math.cos(f);
					},
					title: 'Compute the Cosine of x'
				},
				'1/x': {
					binary: false,
					func: function (f) {
						return 1/f;
					},
					title: 'Returns the reciprical of the entered number.'
				},
			},
		},

		genCalc: null,
		firstPart: 0,
		op: null,
		secondPart: null,
		hasDecimal: false,

		checkForDecimal: function () {
			var mainEC = this;
			if (calc.value != '') {
				if(calc.value.indexOf('.') >  -1){
					mainEC.hasDecimal = true;
				} else {
					mainEC.hasDecimal = false;
				}
			} else {
				mainEC.hasDecimal = false;
			}
		},

		show: function () {
			this.checkForDecimal();
			if(genCalc){
				genCalc.setStyle('display','block');
				calc.setCaretPosition('end');
			}

		},

		hide: function () {
			if(genCalc){
				genCalc.setStyle('display','none');
			}
		},

		getValue: function () {
			if (calc.value == '') {
				return 0;
			} else {
				return parseFloat(calc.value);
			}
		},

		initialize: function (attachTo,options) {
			var mainEC = this;
			this.setOptions(options);
			options = this.options;
			if (typeof(attachTo) == 'string') {
				if (attachTo == '') {
					calc = new Element('input',{type:'text'});
				} else {
					calc = document.id(attachTo);
				}
			} else {
				calc = attachTo;
			}
			calc.addEvent('click',this.show.bind(this));
			genCalc = new Element('div',{class:mainEC.options.windowClass,style:'position:absolute;'});
			var epos = calc.getPosition();
			var esize = calc.getSize();
			genCalc.setPosition({x:epos.x,y:epos.y+esize.y});
			this.hide();

			this.initCalcButtons();
			genCalc.inject(calc,'after');
			calc.setStyle('text-align','right');
			calc.addEvent('keypress',function (e) {
				if(!e.key.match( /[0-9]/ )) {
					if (e.key != 'delete') {
						if (e.key == '+') {
							$('MooCalc_opplus').click();
							calc.focus();
						}
						if (e.key == '-') {
							$('MooCalc_opminus').click();
							calc.focus();
						}
						if (e.key == '/') {
							$('MooCalc_opdiv').click();
							calc.focus();
						}
						if (e.key == '*') {
							$('MooCalc_opmul').click();
							calc.focus();
						}
						if (e.key == 'enter') {
							$('MooCalc_opeq').click();
							//calc.focus();
						}
						if (e.key == 'backspace') {
							$('MooCalc_bspc').click();
							e.preventDefault();
							return false;
						}
						e.preventDefault();
						return false;
					} else {
						$('MooCalc_idB').addClass('selectedWButton');
						setTimeout(function () {
							$('MooCalc_idB').removeClass('selectedWButton');
						},300);
						$('MooCalc_idB').click();
						calc.focus();
						e.preventDefault();
						return false;
					}
				}
				$$('input[value='+e.key+']').addClass('selectedWButton');
				setTimeout(function () {
					$$('input[value='+e.key+']').removeClass('selectedWButton');
				},300);
				return true;
			});
			if(mainEC.options.showConversions){
				this.initConversions();
			}
			if(mainEC.options.showFuncs){
				this.initFuncs();
			} else {
				genCalc.setStyle('width',$$('.buttonAndOpContainer').getStyle('width'));
			}
			if(!mainEC.options.hideOnResult) {
				var closeCon = new Element('div',{class:'closeContainer'});
				var closeB = new Element('input',{type:'button',value:'X',title:'Close Calculator'});
				closeB.addEvent('click',function () {
					mainEC.hide();
				});
				closeB.inject(closeCon);
				closeCon.inject(genCalc);
			}

		},

		initCalcButtons: function () {
			var mainEC = this;
			var bAndoCon = new Element('div',{class:'buttonAndOpContainer'});
			var bCon = new Element('div',{class:'buttonContainer'});
			for(var i = 10; i--; i>0){
				var newb = new Element('input',{type:'button',value:i});
				newb.addEvent('click',function () {
					calc.value = calc.value + this.value;
				});
				newb.inject(bCon);
			}
			var pButton = new Element('input',{type:'button',value:'.',id:'MooCalc_idB'});
			pButton.addEvent('click',function () {
				mainEC.checkForDecimal();
				if (!mainEC.hasDecimal) {
					if (calc.value == '') {
						calc.value = '0.';
					} else {
						calc.value = calc.value + '.';
					}
					mainEC.hasDecimal = true;
				}
			});

			pButton.inject(bCon);
			var clDiv = new Element('div',{class:'clearContainer'});
			var cButton = new Element('input',{type:'button',value:'C'});
			cButton.addEvent('click',function () {
				calc.value = '';
				mainEC.hasDecimal = false;
				this.addClass('selectedRButton');
				setTimeout(function () {
					cButton.removeClass('selectedRButton');
				},200);
			});
			cButton.inject(clDiv);
			var ceButton = new Element('input',{type:'button',value:'CE'});
			ceButton.addEvent('click',function () {
				calc.value = '';
				mainEC.firstPart = null;
				mainEC.secondPart = null;
				mainEC.op = null;
				mainEC.hasDecimal = false;
				this.addClass('selectedRButton');
				setTimeout(function () {
					ceButton.removeClass('selectedRButton');
				},200);
			});
			ceButton.inject(clDiv);
			var delButton = new Element('input',{type:'button',value:'<',id:'MooCalc_bspc'});
			delButton.addEvent('click',function () {
				if (calc.value.length > 0) {
					calc.value = calc.value.substr(0,calc.value.length-1);
					this.addClass('selectedRButton');
					setTimeout(function () {
						delButton.removeClass('selectedRButton');
					},200);
				}
			});
			delButton.inject(clDiv);
			clDiv.inject(bCon);
			bCon.inject(bAndoCon);
			var opCon = new Element('div',{class:'opContainer'});

			var eqb = new Element('input',{type:'button',value:'=',id:'MooCalc_opeq'});
			eqb.addEvent('click',function () {
				if (mainEC.firstPart != null && mainEC.op != null ) {
					if (mainEC.options.funcs[mainEC.op]) {
						calc.value = mainEC.options.funcs[mainEC.op].func(mainEC.firstPart,mainEC.getValue());
					} else {
						mainEC.secondPart = mainEC.getValue();
						calc.value = eval(mainEC.firstPart + mainEC.op + mainEC.secondPart);
					}
					$$('.MooCalc input[type=button]').removeClass('selectedButton');
					mainEC.firstPart = null;
					mainEC.op = null;
					mainEC.secondPart = null;
					mainEC.hasDecimal = false;
					calc.focus();
					if(mainEC.options.hideOnResult)
						mainEC.hide();
				}
			});
			eqb.inject(opCon);
			var opplus = new Element('input',{type:'button',value:'+',id:'MooCalc_opplus'});
			opplus.addEvent('click',function () {
				mainEC.op = '+';
				mainEC.firstPart = mainEC.getValue();
				calc.value = '';
				mainEC.hasDecimal = false;
				$$('.MooCalc input[type=button]').removeClass('selectedButton');
				opplus.addClass('selectedButton');
			});
			opplus.inject(opCon);
			var opminus = new Element('input',{type:'button',value:'-',id:'MooCalc_opminus'});
			opminus.addEvent('click',function () {
				mainEC.op = '-';
				mainEC.firstPart = mainEC.getValue();
				calc.value = '';
				mainEC.hasDecimal = false;
				$$('.MooCalc input[type=button]').removeClass('selectedButton');
				opminus.addClass('selectedButton');
			});
			opminus.inject(opCon);
			var opdiv = new Element('input',{type:'button',value:'/',id:'MooCalc_opdiv'});
			opdiv.addEvent('click',function () {
				mainEC.op = '/';
				mainEC.firstPart = mainEC.getValue();
				calc.value = '';
				mainEC.hasDecimal = false;
				$$('.MooCalc input[type=button]').removeClass('selectedButton');
				opdiv.addClass('selectedButton');
			});
			opdiv.inject(opCon);
			var opmul = new Element('input',{type:'button',value:'*',id:'MooCalc_opmul'});
			opmul.addEvent('click',function () {
				mainEC.op = '*';
				mainEC.firstPart = mainEC.getValue();
				calc.value = '';
				mainEC.hasDecimal = false;
				$$('.MooCalc input[type=button]').removeClass('selectedButton');
				opmul.addClass('selectedButton');
			});
			opmul.inject(opCon);
			opCon.inject(bAndoCon);
			bAndoCon.inject(genCalc);
		},

		initConversions: function () {
			var mainEC = this;
			var cCon = new Element('div',{class:'convContainer'});
			var conversions = new Object();

			var convs = new Element('select',{style:'display:none;'});
			var blankO = new Element('option',{value:'0'});
			blankO.innerHTML = 'Select...';
			blankO.inject(convs);
			var showBtn = new Element('input',{type:'button',value:'Convert'});

			var doConversion = function (ctype,opt1,opt2) {
				if ($(opt1).value != '0' && $(opt2).value != '0') {
					calc.value = mainEC.options.conversions[ctype][$(opt2).value].to(mainEC.options.conversions[ctype][$(opt1).value].from(parseFloat(calc.value)));
					if (mainEC.options.hideOnResult) {
						mainEC.hide();
					}
					calc.focus();
					return true;
				}
				return false;
			};

			Object.keys(mainEC.options.conversions).each(function (item,index,array) {
				var newo = new Element('option',{value:item});
				newo.innerHTML = mainEC.options.conversionPrettyNames[item];
				newo.inject(convs);
				var itemSelectFrom = new Element('select',{style:'display:none;',id:item+'FromSelect',class:'unitconvertleft'});
				new Element('option',{value:'0',html:'From'}).inject(itemSelectFrom);
				var itemSelectTo = new Element('select',{style:'display:none;',id:item+'ToSelect',class:'unitconvertright'});
				new Element('option',{value:'0',html:'To'}).inject(itemSelectTo);
				itemSelectFrom.addEvent('change',function () {
					if(doConversion(item,item+'FromSelect',item+'ToSelect')){
						showBtn.setStyle('display','inline-block');
						$(item+'FromSelect').value = '0';
						$(item+'ToSelect').value = '0';
						$(item+'FromSelect').setStyle('display','none');
						$(item+'ToSelect').setStyle('display','none');
					};
				});
				itemSelectTo.addEvent('change',function () {
					if(doConversion(item,item+'FromSelect',item+'ToSelect')){
						showBtn.setStyle('display','inline-block');
						$(item+'FromSelect').value = '0';
						$(item+'ToSelect').value = '0';
						$(item+'FromSelect').setStyle('display','none');
						$(item+'ToSelect').setStyle('display','none');
					};
				});
				Object.keys(mainEC.options.conversions[item]).each(function (iitem,iindex,aarray) {
					var x = new Element('option',{value:iitem})
					x.innerHTML = mainEC.options.unitPrettyNames[item][iitem];
					x.inject(itemSelectFrom);
					var y = new Element('option',{value:iitem})
					y.innerHTML = mainEC.options.unitPrettyNames[item][iitem];
					y.inject(itemSelectTo);
				});
				conversions[item]=[itemSelectFrom,itemSelectTo];
			});

			convs.addEvent('change',function () {
				if (this.value !== '0') {
					this.setStyle('display','none');
					conversions[this.value].each(function (item,index,array) {
						item.setStyle('display','inline-block');
					});
					this.value = '0';
				}
			});

			showBtn.addEvent('click',function () {
				convs.setStyle('display','inline-block');
				this.setStyle('display','none');
			});

			showBtn.inject(cCon);
			convs.inject(cCon);
			Object.keys(conversions).each(function(item,index,array){
				conversions[item].each(function (iitem,iindex,aaray) {
					iitem.inject(cCon);
				});
			});
			cCon.inject(genCalc);
		},

		initFuncs: function () {
			var mainEC = this;
			var fCon = new Element('div',{class:'funcContainer'});

			Object.keys(mainEC.options.funcs).each(function(item,index,array){
				if (mainEC.options.funcs[item].binary) {
					var newb = new Element('input',{type:'button',value:item,title:mainEC.options.funcs[item].title});
					newb.addEvent('click',function () {
						mainEC.op = item;
						mainEC.firstPart = mainEC.getValue();
						calc.value = '';
						calc.focus();
						mainEC.hasDecimal = false;
						$$('.MooCalc input[type=button]').removeClass('selectedButton');
						this.addClass('selectedButton');
					});
					newb.inject(fCon);
				} else { //unary ops
					var newb = new Element('input',{type:'button',value:item,title:mainEC.options.funcs[item].title});
					newb.addEvent('click',function () {
						calc.value = mainEC.options.funcs[item].func(mainEC.getValue());
						calc.focus();
						mainEC.op = null;
						mainEC.firstPart = null;
						mainEC.secondPart = null;
						mainEC.hasDecimal = false;
						$$('.MooCalc input[type=button]').removeClass('selectedButton');
						if(mainEC.options.hideOnResult)
							mainEC.hide();
					});
					newb.inject(fCon);
				}
			});

			fCon.inject(genCalc);
		},
	});

})();