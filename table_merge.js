;(function( $, window, document, undefined ) {
		"use strict";
		var merge = "merge",
			defaults = {
				msS: "thaian2009"
			};
		function f ( element, options ) {
			this.element = element;
			this.settings = $.extend({}, defaults, options );
			this._defaults = defaults;
			this._name = merge;
			this.init();
		}
		$.extend( f.prototype, {
			init: function() {
				var _this = this;
				var table = $(this.element)[0];
				_this.doColSpan(table);
				_this.doRowSpan(table);
			},
			doRowSpan: function(table) {
				var trs= table.rows;
				var tr_len=  trs.length;
				var col= 0;
				var tds= trs[0].cells;
				for(var m=0; m< tds.length;m++) {
					col= col + tds[m].colSpan;
				}
				for(var i=i=2; i< trs.length;i++) {
					for(var j=1; j< col; j++) {
						var td_col= j;
						var td= trs[i].cells[td_col];
						if(td!= null) {
							var html= $(td).text();
							var tr_tem= td.parentElement.nextElementSibling;
							var rowspan= 0;
							while(tr_tem!= null && i >= td.parentElement.rowIndex-1 ) {
								var cur= tr_tem.cells[td_col];
								if($(cur).text()==html && td.nextElementSibling!= null && cur!= null) {
									if(cur.nextElementSibling!= null) {
										if(cur.colSpan <= 1) {
											$(cur).attr('dup', 'true');
											rowspan= rowspan + 1;
										}
										else {
											if(cur.colSpan==td.colSpan) {
												$(cur).attr('dup', 'true');
												rowspan= rowspan + 1;
											}
										}
									}
								}
								else {
									html = '';
									rowspan= rowspan - 1;
								}
								tr_tem= tr_tem.nextElementSibling;
							}
							if(rowspan > 0) {
								$(td).attr('rowspan', rowspan + 1);
							}
						}
					}
				}
				$('#' + $(table)[0].id + ' tr td[dup="true"]').remove();
			},
			doColSpan: function(table) {	
				var trs= table.rows;
				var tr_len=  trs.length;
				for(var i=0; i<tr_len; i++) {
					var tds= trs[i].cells;
					var td_len= tds.length;
					for(var j=0;j<td_len;j++) {
						var colspan= 0;
						var td= tds[j];
						var td_tem= td.nextElementSibling;
						var html= $(td).text();
						if(td_tem!== null) {
							while(td_tem !== null) {
								var td_tem_html= td_tem.innerText;
								if(html== td_tem_html) {
									$(td_tem).attr('dup', 'true');
									colspan= colspan + 1;
								}
								else {
									html = '';
								}
								td_tem= td_tem.nextElementSibling;
							}
							if(colspan > 0) {
								$(td).attr('colspan', colspan + 1);
							}
						}
					}
				}
				$('#' + $(table)[0].id + ' tr td[dup="true"]').remove();

			}
		});
		$.fn[ merge ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + merge )) {
					$.data( this, "plugin_" + merge, new f( this, options ) );
				}
			});
		};
	})( jQuery, window, document );
