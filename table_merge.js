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
				var $table = $(this.element);
				_this.doColSpan($table);
				_this.doRowSpan();
				_this.deleteCellsByCol();
				_this.deleteCellsByRow();
			},
			doColSpan: function(elm){
				var colSpanCount = 1;
				var tObj=elm[0];
				for(var i=0; i<tObj.rows.length; i++){
					if(tObj.rows[i]!=null){
						for(var j in tObj.rows[i].cells){
							if(tObj.rows[i].cells[j].innerHTML){
								if(colSpanCount > 1){
									colSpanCount--;
									continue;
								}
								colSpanCount = this.getColSpanCount(tObj, i, j);
								if(colSpanCount > 1){
									tObj.rows[i].cells[j].colSpan = colSpanCount;
								}
							}
						}
					}
				}
			},
			getColSpanCount: function(tObj, i, j) {
				var colSpanCount = 1,
					nextX = parseInt(j, 10);
				while (this.isEqualToNextRightCell(tObj, i, j, ++nextX)) {
					colSpanCount++;
				}
				return colSpanCount;
			},
			isEqualToNextRightCell: function(tObj, i, j, nextX){
				return tObj.rows[i].cells[nextX] &&
					tObj.rows[i].cells[j].innerHTML === tObj.rows[i].cells[nextX].innerHTML;
			},
			doRowSpan: function(){
				var tObj= $(this.element)[0];
				for(var i=0; i<tObj.rows.length; i++){
					if(tObj.rows[i]!=null){
						for(var j in tObj.rows[i].cells){
							if(tObj.rows[i].cells[j].innerHTML){
								var rowSpanCount = this.getRowSpanCount(tObj, i, j);
								if(rowSpanCount > 1){
									tObj.rows[i].cells[j].rowSpan = rowSpanCount;
								}
							}
						}
					}
				}
			},
			getRowSpanCount: function(tObj, i, j){
				var rowSpanCount = 1;
				var nextY = parseInt(i);
				while(true){
					nextY++;
					if(this.isEqualToNextUnderCell(tObj, i, j, nextY)){
						rowSpanCount++;
						continue;
					}
					else{
						break;
					}
				}
				return rowSpanCount;
			},
			isEqualToNextUnderCell: function(tObj, i, j, nextY){
				return tObj.rows[nextY] && tObj.rows[nextY].cells[j] && tObj.rows[i].cells[j].innerHTML == tObj.rows[nextY].cells[j].innerHTML;
			},
			deleteCellsByCol: function(){
				var s="";
				var tObj= $(this.element)[0];
				for(var i=0; i<tObj.rows.length; i++){
					if(tObj.rows[i]!=null){
						for(var j in tObj.rows[i].cells){
							if(tObj.rows[i].cells[j].innerHTML){
								for(var k = 1; k < tObj.rows[i].cells[j].colSpan; k++){
									tObj.rows[i].deleteCell(parseInt(j) + 1);
								}
							}
						}
					}
				}
			},
			deleteCellsByRow: function(){
				var deletedCount = 0;
				var tObj= $(this.element)[0];
				for(var i=0; i<tObj.rows.length; i++){
					if(tObj.rows[parseInt(i)+1]){
						for(var j in tObj.rows[i].cells){
							var rowSpanCount = tObj.rows[i].cells[j].rowSpan;
							if(rowSpanCount > 1){
								for(var k in tObj.rows[parseInt(i)+1].cells){
									if(tObj.rows[i].cells[j].innerHTML == tObj.rows[parseInt(i)+1].cells[k].innerHTML){
										tObj.rows[parseInt(i)+1].deleteCell(k);
									}
								}
							}
						}
					}
				}
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
