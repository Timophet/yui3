YUI.add("dial",function(h){var g=false;if(h.config.doc.namespaces&&h.config.doc.namespaces.add){h.config.doc.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML");if(h.config.doc.createElement("v:oval").strokeColor){g=true;}}var e=h.Lang,d=h.Widget,b=h.Node;function a(i){a.superclass.constructor.apply(this,arguments);}a.NAME="dial";a.ATTRS={min:{value:-220},max:{value:220},diameter:{value:100},value:{value:0,validator:function(i){return this._validateValue(i);}},minorStep:{value:1},majorStep:{value:10},stepsPerRev:{value:100},decimalPlaces:{value:0},strings:{valueFn:function(){return h.Intl.get("dial");}},handleDist:{value:0.75}};function c(i){return h.ClassNameManager.getClassName(a.NAME,i);}a.CSS_CLASSES={label:c("label"),labelString:c("label-string"),valueString:c("value-string"),northMark:c("north-mark"),ring:c("ring"),ringVml:c("ring-vml"),marker:c("marker"),markerUser:c("marker-user"),centerButton:c("center-button"),centerButtonVml:c("center-button-vml"),resetString:c("reset-str"),handle:c("handle"),handleUser:c("handle-user"),dragging:h.ClassNameManager.getClassName("dd-dragging")};var f=a.CSS_CLASSES.label+h.guid();a.LABEL_TEMPLATE='<div id="'+f+'" class="'+a.CSS_CLASSES.label+'"><span class="'+a.CSS_CLASSES.labelString+'">{label}</span><span class="'+a.CSS_CLASSES.valueString+'"></span></div>';if(g===false){a.RING_TEMPLATE='<div class="'+a.CSS_CLASSES.ring+'"><div class="'+a.CSS_CLASSES.northMark+'"></div></div>';a.MARKER_TEMPLATE='<div class="'+a.CSS_CLASSES.marker+' marker-hidden"><div class="'+a.CSS_CLASSES.markerUser+'"></div></div>';a.CENTER_BUTTON_TEMPLATE='<div class="'+a.CSS_CLASSES.centerButton+'"><div class="'+a.CSS_CLASSES.resetString+'">{resetStr}</div></div>';a.HANDLE_TEMPLATE='<div class="'+a.CSS_CLASSES.handle+'"><div class="'+a.CSS_CLASSES.handleUser+'" aria-labelledby="'+f+'" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0" title="{tooltipHandle}"></div></div>';}else{a.RING_TEMPLATE='<div class="'+a.CSS_CLASSES.ring+'">'+'<div class="'+a.CSS_CLASSES.northMark+'"></div>'+'<v:oval strokecolor="#ceccc0" strokeweight="1px" class="'+a.CSS_CLASSES.ringVml+'"><v:fill type=gradient color="#8B8A7F" color2="#EDEDEB" angle="45"/></v:oval>'+"<v:oval></v:oval>"+"</div>"+"";a.MARKER_TEMPLATE='<div class="'+a.CSS_CLASSES.marker+' marker-hidden">'+'<v:oval stroked="false" class="'+a.CSS_CLASSES.markerUser+'">'+'<v:fill opacity="20%" color="#000"/>'+"</v:oval>"+"<v:oval></v:oval>"+"</div>"+"";a.CENTER_BUTTON_TEMPLATE='<div class="'+a.CSS_CLASSES.centerButton+'">'+'<v:oval strokecolor="#ceccc0" strokeweight="1px" class="'+a.CSS_CLASSES.centerButtonVml+'">'+'<v:fill type=gradient color="#C7C5B9" color2="#fefcf6" colors="35% #d9d7cb, 65% #fefcf6" angle="45"/>'+'<v:shadow on="True" color="#000" opacity="10%" offset="2px, 2px"/>'+"</v:oval>"+"<v:oval></v:oval>"+'<div class="'+a.CSS_CLASSES.resetString+'">{resetStr}</div>'+"</div>"+"";a.HANDLE_TEMPLATE='<div class="'+a.CSS_CLASSES.handle+'">'+'<v:oval stroked="false" class="'+a.CSS_CLASSES.handleUser+'"'+' aria-labelledby="'+f+'" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0" title="{tooltipHandle}">'+'<v:fill opacity="20%" color="#6C3A3A"/>'+"</v:oval>"+"<v:oval></v:oval>"+"</div>"+"";}h.extend(a,d,{renderUI:function(){this._renderLabel();this._renderRing();this._renderMarker();this._renderCenterButton();this._renderHandle();this.contentBox=this.get("contentBox");this._centerX=this.get("diameter")/2;this._centerY=this.get("diameter")/2;this._handleDist=this._centerX*this.get("handleDist");this._originalValue=this.get("value");this._timesWrapped=0;this._angle=this._getAngleFromValue(this.get("value"));this._setTimesWrapedFromValue(this.get("value"));this._handleUserNode.set("aria-valuemin",this.get("min"));this._handleUserNode.set("aria-valuemax",this.get("max"));},bindUI:function(){this.after("valueChange",this._afterValueChange);var j=this.get("boundingBox"),k=(!h.UA.opera)?"down:":"press:",l=(!h.UA.opera)?"down:":"press:";k+="38, 40, 33, 34, 35, 36";l+="37, 39";h.on("key",h.bind(this._onDirectionKey,this),j,k);h.on("key",h.bind(this._onLeftRightKey,this),j,l);h.on("mouseenter",h.bind(this._dialCenterOver,this),this._centerButtonNode);h.on("mouseleave",h.bind(this._dialCenterOut,this),this._centerButtonNode);h.on("click",h.bind(this._resetDial,this),this._centerButtonNode);h.on("mousedown",h.bind(function(){this._handleUserNode.focus();},this),this._handleNode);var i=new h.DD.Drag({node:this._handleNode,on:{"drag:drag":h.bind(this._handleDrag,this),"drag:start":h.bind(this._handleDragStart,this),"drag:end":h.bind(this._handleDragEnd,this)}});},_setTimesWrapedFromValue:function(i){if(i%this.get("stepsPerRev")===0){this._timesWrapped=(i/this.get("stepsPerRev"))-1;}else{this._timesWrapped=Math.floor(i/this.get("stepsPerRev"));}},_dialCenterOver:function(i){this._resetString.setContent(h.substitute("{resetStr}",this.get("strings")));},_dialCenterOut:function(i){this._resetString.setContent("");},_handleDrag:function(l){var j=Math.atan((this._centerYOnPage-l.pageY)/(this._centerXOnPage-l.pageX))*(180/Math.PI),i=(this._centerXOnPage-l.pageX);if(i<0){j=(j+90);}else{j=(j-90);}if(l.pageY<this._centerYOnPage){if((this._prevX<=this._centerXOnPage)&&(l.pageX>this._centerXOnPage)){this._timesWrapped=(this._timesWrapped+1);}else{if((this._prevX>this._centerXOnPage)&&(l.pageX<=this._centerXOnPage)){this._timesWrapped=(this._timesWrapped-1);}}}this._prevX=l.pageX;var k=this._getValueFromAngle(j);if((k>this.get("min"))&&(k<this.get("max"))){this.set("value",k);}else{if(k>this.get("max")){this.set("value",this.get("max"));}else{if(k<this.get("min")){this.set("value",this.get("min"));}}}},_handleDragStart:function(i){this._markerNode.removeClass("marker-hidden");if(!this._prevX){this._prevX=this._handleNode.getX();}this._centerYOnPage=(this._ringNode.getY()+this._centerY);this._centerXOnPage=(this._ringNode.getX()+this._centerX);},_handleDragEnd:function(){var i=this._handleNode;
i.transition({duration:0.08,easing:"ease-in",left:this._setNodeToFixedRadius()[0]+"px",top:this._setNodeToFixedRadius()[1]+"px"},h.bind(function(){this._markerNode.addClass("marker-hidden");this._prevX=this._handleNode.getX();},this));this._setTimesWrapedFromValue(this.get("value"));},_setNodeToFixedRadius:function(l){var j=(this._angle-90),i=(Math.PI/180);var k=Math.round(Math.sin(j*i)*this._handleDist);var m=Math.round(Math.cos(j*i)*this._handleDist);if(l){l.setXY([(this._ringNode.getX()+this._centerX+m),(this._ringNode.getY()+this._centerY+k)]);}else{return[this._centerX+m,this._centerX+k];}},syncUI:function(){this._uiSetValue(this.get("value"));},_renderLabel:function(){var i=this.get("contentBox"),j=i.one("."+a.CSS_CLASSES.label);if(!j){j=b.create(h.substitute(a.LABEL_TEMPLATE,this.get("strings")));i.append(j);}this._labelNode=j;this._valueStringNode=this._labelNode.one("."+a.CSS_CLASSES.valueString);},_renderRing:function(){var i=this.get("contentBox"),j=i.one("."+a.CSS_CLASSES.ring);if(!j){j=b.create(a.RING_TEMPLATE);i.append(j);j.setStyles({width:this.get("diameter")+"px",height:this.get("diameter")+"px"});}this._ringNode=j;},_renderMarker:function(){var j=this.get("contentBox"),i=j.one("."+a.CSS_CLASSES.marker);if(!i){i=b.create(a.MARKER_TEMPLATE);j.one("."+a.CSS_CLASSES.ring).append(i);}this._markerNode=i;this._markerUserNode=this._markerNode.one("."+a.CSS_CLASSES.markerUser);},_setXYResetString:function(){this._resetString.setStyle("top",(this._centerButtonNode.get("region").height/2)-(this._resetString.get("region").height/2)+"px");this._resetString.setStyle("left",(this._centerButtonNode.get("region").width/2)-(this._resetString.get("region").width/2)+"px");},_renderCenterButton:function(){var i=this.get("contentBox"),j=i.one("."+a.CSS_CLASSES.centerButton);if(!j){j=b.create(h.substitute(a.CENTER_BUTTON_TEMPLATE,this.get("strings")));i.one("."+a.CSS_CLASSES.ring).append(j);}this._centerButtonNode=j;this._resetString=this._centerButtonNode.one("."+a.CSS_CLASSES.resetString);this._setXYResetString();this._resetString.setContent("");var k=this._ringNode.get("region").width*0.25;this._centerButtonNode.setXY([(this._ringNode.getX()+k),(this._ringNode.getY()+k)]);},_renderHandle:function(){var i=this.get("contentBox"),j=i.one("."+a.CSS_CLASSES.handle);if(!j){j=b.create(h.substitute(a.HANDLE_TEMPLATE,this.get("strings")));i.one("."+a.CSS_CLASSES.ring).append(j);}this._handleNode=j;this._handleUserNode=this._handleNode.one("."+a.CSS_CLASSES.handleUser);},setLabelString:function(i){this.get("contentBox").one("."+a.CSS_CLASSES.labelString).setContent(i);},setResetString:function(i){this.set("strings.resetStr",i);this.get("contentBox").one("."+a.CSS_CLASSES.resetString).setContent(i);this._setXYResetString();this._resetString.setContent("");},setTooltipString:function(i){this.get("contentBox").one("."+a.CSS_CLASSES.handleUser).set("title",i);},_onDirectionKey:function(i){i.preventDefault();switch(i.charCode){case 38:this._incrMinor();break;case 40:this._decrMinor();break;case 36:this._resetDial();break;case 35:this._setToMax();break;case 33:this._incrMajor();break;case 34:this._decrMajor();break;}},_onLeftRightKey:function(i){i.preventDefault();switch(i.charCode){case 37:this._decrMinor();break;case 39:this._incrMinor();break;}},_incrMinor:function(){var i=(this.get("value")+this.get("minorStep"));i=Math.min(i,this.get("max"));this.set("value",i.toFixed(this.get("decimalPlaces"))-0);},_decrMinor:function(){var i=(this.get("value")-this.get("minorStep"));i=Math.max(i,this.get("min"));this.set("value",i.toFixed(this.get("decimalPlaces"))-0);},_incrMajor:function(){var i=(this.get("value")+this.get("majorStep"));i=Math.min(i,this.get("max"));this.set("value",i.toFixed(this.get("decimalPlaces"))-0);},_decrMajor:function(){var i=(this.get("value")-this.get("majorStep"));i=Math.max(i,this.get("min"));this.set("value",i.toFixed(this.get("decimalPlaces"))-0);},_setToMax:function(){this.set("value",this.get("max"));},_setToMin:function(){this.set("value",this.get("min"));},_resetDial:function(){this.set("value",this._originalValue);this._handleUserNode.focus();},_getAngleFromValue:function(i){var j=i%this.get("stepsPerRev");var k=j/this.get("stepsPerRev")*360;return k;},_getValueFromAngle:function(j){if(j<0){j=(360+j);}else{if(j===0){j=360;}}var i=(j/360)*this.get("stepsPerRev");i=(i+(this._timesWrapped*this.get("stepsPerRev")));return i.toFixed(this.get("decimalPlaces"))-0;},_afterValueChange:function(i){this._uiSetValue(i.newVal);},_uiSetValue:function(i){this._angle=this._getAngleFromValue(i);if(this._handleNode.hasClass(a.CSS_CLASSES.dragging)===false){this._setTimesWrapedFromValue(i);this._setNodeToFixedRadius(this._handleNode);this._prevX=this._handleNode.getX();}this._valueStringNode.setContent(i);this._handleUserNode.set("aria-valuenow",i);this._handleUserNode.set("aria-valuetext",i);this._setNodeToFixedRadius(this._markerNode);if((i===this.get("max"))||(i===this.get("min"))){if(this._markerUserNode.hasClass("marker-max-min")===false){this._markerUserNode.addClass("marker-max-min");if(g===true){this._markerUserNode.one("fill").set("color","#AB3232");}}}else{if(g===true){this._markerUserNode.one("fill").set("color","#000");}if(this._markerUserNode.hasClass("marker-max-min")===true){this._markerUserNode.removeClass("marker-max-min");}}},_validateValue:function(k){var j=this.get("min"),i=this.get("max");return(e.isNumber(k)&&k>=j&&k<=i);}});h.Dial=a;},"@VERSION@",{requires:["widget","dd-drag","substitute","event-mouseenter","transition","intl"],skinnable:true,lang:["en","es"]});