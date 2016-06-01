/* energize.js v0.1.0 */
(function(){if("ontouchstart"in window){var b,c,d,e,f,g,a={};b=function(a,b){return Math.abs(a[0]-b[0])>5||Math.abs(a[1]-b[1])>5},c=function(a){this.startXY=[a.touches[0].clientX,a.touches[0].clientY],this.threshold=!1},d=function(a){return this.threshold?!1:(this.threshold=b(this.startXY,[a.touches[0].clientX,a.touches[0].clientY]),void 0)},e=function(a){if(!this.threshold&&!b(this.startXY,[a.changedTouches[0].clientX,a.changedTouches[0].clientY])){var c=a.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),d.simulated=!0,a.target.dispatchEvent(d)}},f=function(b){var c=Date.now(),d=c-a.time,e=b.clientX,f=b.clientY,h=[Math.abs(a.x-e),Math.abs(a.y-f)],i=g(b.target,"A")||b.target,j=i.nodeName,k="A"===j,l=window.navigator.standalone&&k&&b.target.getAttribute("href");return a.time=c,a.x=e,a.y=f,(!b.simulated&&(500>d||1500>d&&50>h[0]&&50>h[1])||l)&&(b.preventDefault(),b.stopPropagation(),!l)?!1:(l&&(window.location=i.getAttribute("href")),i&&i.classList&&(i.classList.add("energize-focus"),window.setTimeout(function(){i.classList.remove("energize-focus")},150)),void 0)},g=function(a,b){for(var c=a;c!==document.body;){if(!c||c.nodeName===b)return c;c=c.parentNode}return null},document.addEventListener("touchstart",c,!1),document.addEventListener("touchmove",d,!1),document.addEventListener("touchend",e,!1),document.addEventListener("click",f,!0)}})();


/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.6
 * Copyright (C) 2014 Oliver Nightingale
 * MIT Licensed
 * @license
 */
!function(){var t=function(e){var n=new t.Index;return n.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),e&&e.call(n,n),n};t.version="0.5.6",t.utils={},t.utils.warn=function(t){return function(e){t.console&&console.warn&&console.warn(e)}}(this),t.EventEmitter=function(){this.events={}},t.EventEmitter.prototype.addListener=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=t;if("function"!=typeof e)throw new TypeError("last argument must be a function");n.forEach(function(t){this.hasHandler(t)||(this.events[t]=[]),this.events[t].push(e)},this)},t.EventEmitter.prototype.removeListener=function(t,e){if(this.hasHandler(t)){var n=this.events[t].indexOf(e);this.events[t].splice(n,1),this.events[t].length||delete this.events[t]}},t.EventEmitter.prototype.emit=function(t){if(this.hasHandler(t)){var e=Array.prototype.slice.call(arguments,1);this.events[t].forEach(function(t){t.apply(void 0,e)})}},t.EventEmitter.prototype.hasHandler=function(t){return t in this.events},t.tokenizer=function(t){if(!arguments.length||null==t||void 0==t)return[];if(Array.isArray(t))return t.map(function(t){return t.toLowerCase()});for(var e=t.toString().replace(/^\s+/,""),n=e.length-1;n>=0;n--)if(/\S/.test(e.charAt(n))){e=e.substring(0,n+1);break}return e.split(/(?:\s+|\-)/).filter(function(t){return!!t}).map(function(t){return t.toLowerCase()})},t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions={},t.Pipeline.registerFunction=function(e,n){n in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+n),e.label=n,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var n=e.label&&e.label in this.registeredFunctions;n||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var n=new t.Pipeline;return e.forEach(function(e){var i=t.Pipeline.registeredFunctions[e];if(!i)throw new Error("Cannot load un-registered function: "+e);n.add(i)}),n},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){t.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)},this)},t.Pipeline.prototype.after=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e)+1;this._stack.splice(i,0,n)},t.Pipeline.prototype.before=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);this._stack.splice(i,0,n)},t.Pipeline.prototype.remove=function(t){var e=this._stack.indexOf(t);this._stack.splice(e,1)},t.Pipeline.prototype.run=function(t){for(var e=[],n=t.length,i=this._stack.length,o=0;n>o;o++){for(var r=t[o],s=0;i>s&&(r=this._stack[s](r,o,t),void 0!==r);s++);void 0!==r&&e.push(r)}return e},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},t.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},t.Vector.Node=function(t,e,n){this.idx=t,this.val=e,this.next=n},t.Vector.prototype.insert=function(e,n){var i=this.list;if(!i)return this.list=new t.Vector.Node(e,n,i),this.length++;for(var o=i,r=i.next;void 0!=r;){if(e<r.idx)return o.next=new t.Vector.Node(e,n,r),this.length++;o=r,r=r.next}return o.next=new t.Vector.Node(e,n,r),this.length++},t.Vector.prototype.magnitude=function(){if(this._magniture)return this._magnitude;for(var t,e=this.list,n=0;e;)t=e.val,n+=t*t,e=e.next;return this._magnitude=Math.sqrt(n)},t.Vector.prototype.dot=function(t){for(var e=this.list,n=t.list,i=0;e&&n;)e.idx<n.idx?e=e.next:e.idx>n.idx?n=n.next:(i+=e.val*n.val,e=e.next,n=n.next);return i},t.Vector.prototype.similarity=function(t){return this.dot(t)/(this.magnitude()*t.magnitude())},t.SortedSet=function(){this.length=0,this.elements=[]},t.SortedSet.load=function(t){var e=new this;return e.elements=t,e.length=t.length,e},t.SortedSet.prototype.add=function(){Array.prototype.slice.call(arguments).forEach(function(t){~this.indexOf(t)||this.elements.splice(this.locationFor(t),0,t)},this),this.length=this.elements.length},t.SortedSet.prototype.toArray=function(){return this.elements.slice()},t.SortedSet.prototype.map=function(t,e){return this.elements.map(t,e)},t.SortedSet.prototype.forEach=function(t,e){return this.elements.forEach(t,e)},t.SortedSet.prototype.indexOf=function(t,e,n){var e=e||0,n=n||this.elements.length,i=n-e,o=e+Math.floor(i/2),r=this.elements[o];return 1>=i?r===t?o:-1:t>r?this.indexOf(t,o,n):r>t?this.indexOf(t,e,o):r===t?o:void 0},t.SortedSet.prototype.locationFor=function(t,e,n){var e=e||0,n=n||this.elements.length,i=n-e,o=e+Math.floor(i/2),r=this.elements[o];if(1>=i){if(r>t)return o;if(t>r)return o+1}return t>r?this.locationFor(t,o,n):r>t?this.locationFor(t,e,o):void 0},t.SortedSet.prototype.intersect=function(e){for(var n=new t.SortedSet,i=0,o=0,r=this.length,s=e.length,a=this.elements,h=e.elements;;){if(i>r-1||o>s-1)break;a[i]!==h[o]?a[i]<h[o]?i++:a[i]>h[o]&&o++:(n.add(a[i]),i++,o++)}return n},t.SortedSet.prototype.clone=function(){var e=new t.SortedSet;return e.elements=this.toArray(),e.length=e.elements.length,e},t.SortedSet.prototype.union=function(t){var e,n,i;return this.length>=t.length?(e=this,n=t):(e=t,n=this),i=e.clone(),i.add.apply(i,n.toArray()),i},t.SortedSet.prototype.toJSON=function(){return this.toArray()},t.Index=function(){this._fields=[],this._ref="id",this.pipeline=new t.Pipeline,this.documentStore=new t.Store,this.tokenStore=new t.TokenStore,this.corpusTokens=new t.SortedSet,this.eventEmitter=new t.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},t.Index.prototype.on=function(){var t=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,t)},t.Index.prototype.off=function(t,e){return this.eventEmitter.removeListener(t,e)},t.Index.load=function(e){e.version!==t.version&&t.utils.warn("version mismatch: current "+t.version+" importing "+e.version);var n=new this;return n._fields=e.fields,n._ref=e.ref,n.documentStore=t.Store.load(e.documentStore),n.tokenStore=t.TokenStore.load(e.tokenStore),n.corpusTokens=t.SortedSet.load(e.corpusTokens),n.pipeline=t.Pipeline.load(e.pipeline),n},t.Index.prototype.field=function(t,e){var e=e||{},n={name:t,boost:e.boost||1};return this._fields.push(n),this},t.Index.prototype.ref=function(t){return this._ref=t,this},t.Index.prototype.add=function(e,n){var i={},o=new t.SortedSet,r=e[this._ref],n=void 0===n?!0:n;this._fields.forEach(function(n){var r=this.pipeline.run(t.tokenizer(e[n.name]));i[n.name]=r,t.SortedSet.prototype.add.apply(o,r)},this),this.documentStore.set(r,o),t.SortedSet.prototype.add.apply(this.corpusTokens,o.toArray());for(var s=0;s<o.length;s++){var a=o.elements[s],h=this._fields.reduce(function(t,e){var n=i[e.name].length;if(!n)return t;var o=i[e.name].filter(function(t){return t===a}).length;return t+o/n*e.boost},0);this.tokenStore.add(a,{ref:r,tf:h})}n&&this.eventEmitter.emit("add",e,this)},t.Index.prototype.remove=function(t,e){var n=t[this._ref],e=void 0===e?!0:e;if(this.documentStore.has(n)){var i=this.documentStore.get(n);this.documentStore.remove(n),i.forEach(function(t){this.tokenStore.remove(t,n)},this),e&&this.eventEmitter.emit("remove",t,this)}},t.Index.prototype.update=function(t,e){var e=void 0===e?!0:e;this.remove(t,!1),this.add(t,!1),e&&this.eventEmitter.emit("update",t,this)},t.Index.prototype.idf=function(t){var e="@"+t;if(Object.prototype.hasOwnProperty.call(this._idfCache,e))return this._idfCache[e];var n=this.tokenStore.count(t),i=1;return n>0&&(i=1+Math.log(this.tokenStore.length/n)),this._idfCache[e]=i},t.Index.prototype.search=function(e){var n=this.pipeline.run(t.tokenizer(e)),i=new t.Vector,o=[],r=this._fields.reduce(function(t,e){return t+e.boost},0),s=n.some(function(t){return this.tokenStore.has(t)},this);if(!s)return[];n.forEach(function(e,n,s){var a=1/s.length*this._fields.length*r,h=this,u=this.tokenStore.expand(e).reduce(function(n,o){var r=h.corpusTokens.indexOf(o),s=h.idf(o),u=1,l=new t.SortedSet;if(o!==e){var c=Math.max(3,o.length-e.length);u=1/Math.log(c)}return r>-1&&i.insert(r,a*s*u),Object.keys(h.tokenStore.get(o)).forEach(function(t){l.add(t)}),n.union(l)},new t.SortedSet);o.push(u)},this);var a=o.reduce(function(t,e){return t.intersect(e)});return a.map(function(t){return{ref:t,score:i.similarity(this.documentVector(t))}},this).sort(function(t,e){return e.score-t.score})},t.Index.prototype.documentVector=function(e){for(var n=this.documentStore.get(e),i=n.length,o=new t.Vector,r=0;i>r;r++){var s=n.elements[r],a=this.tokenStore.get(s)[e].tf,h=this.idf(s);o.insert(this.corpusTokens.indexOf(s),a*h)}return o},t.Index.prototype.toJSON=function(){return{version:t.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},t.Index.prototype.use=function(t){var e=Array.prototype.slice.call(arguments,1);e.unshift(this),t.apply(this,e)},t.Store=function(){this.store={},this.length=0},t.Store.load=function(e){var n=new this;return n.length=e.length,n.store=Object.keys(e.store).reduce(function(n,i){return n[i]=t.SortedSet.load(e.store[i]),n},{}),n},t.Store.prototype.set=function(t,e){this.has(t)||this.length++,this.store[t]=e},t.Store.prototype.get=function(t){return this.store[t]},t.Store.prototype.has=function(t){return t in this.store},t.Store.prototype.remove=function(t){this.has(t)&&(delete this.store[t],this.length--)},t.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},t.stemmer=function(){var t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",o=n+"[^aeiouy]*",r=i+"[aeiou]*",s="^("+o+")?"+r+o,a="^("+o+")?"+r+o+"("+r+")?$",h="^("+o+")?"+r+o+r+o,u="^("+o+")?"+i;return function(n){var r,l,c,p,f,d,v;if(n.length<3)return n;if(c=n.substr(0,1),"y"==c&&(n=c.toUpperCase()+n.substr(1)),p=/^(.+?)(ss|i)es$/,f=/^(.+?)([^s])s$/,p.test(n)?n=n.replace(p,"$1$2"):f.test(n)&&(n=n.replace(f,"$1$2")),p=/^(.+?)eed$/,f=/^(.+?)(ed|ing)$/,p.test(n)){var m=p.exec(n);p=new RegExp(s),p.test(m[1])&&(p=/.$/,n=n.replace(p,""))}else if(f.test(n)){var m=f.exec(n);r=m[1],f=new RegExp(u),f.test(r)&&(n=r,f=/(at|bl|iz)$/,d=new RegExp("([^aeiouylsz])\\1$"),v=new RegExp("^"+o+i+"[^aeiouwxy]$"),f.test(n)?n+="e":d.test(n)?(p=/.$/,n=n.replace(p,"")):v.test(n)&&(n+="e"))}if(p=/^(.+?[^aeiou])y$/,p.test(n)){var m=p.exec(n);r=m[1],n=r+"i"}if(p=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,p.test(n)){var m=p.exec(n);r=m[1],l=m[2],p=new RegExp(s),p.test(r)&&(n=r+t[l])}if(p=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,p.test(n)){var m=p.exec(n);r=m[1],l=m[2],p=new RegExp(s),p.test(r)&&(n=r+e[l])}if(p=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,f=/^(.+?)(s|t)(ion)$/,p.test(n)){var m=p.exec(n);r=m[1],p=new RegExp(h),p.test(r)&&(n=r)}else if(f.test(n)){var m=f.exec(n);r=m[1]+m[2],f=new RegExp(h),f.test(r)&&(n=r)}if(p=/^(.+?)e$/,p.test(n)){var m=p.exec(n);r=m[1],p=new RegExp(h),f=new RegExp(a),d=new RegExp("^"+o+i+"[^aeiouwxy]$"),(p.test(r)||f.test(r)&&!d.test(r))&&(n=r)}return p=/ll$/,f=new RegExp(h),p.test(n)&&f.test(n)&&(p=/.$/,n=n.replace(p,"")),"y"==c&&(n=c.toLowerCase()+n.substr(1)),n}}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),t.stopWordFilter=function(e){return-1===t.stopWordFilter.stopWords.indexOf(e)?e:void 0},t.stopWordFilter.stopWords=new t.SortedSet,t.stopWordFilter.stopWords.length=119,t.stopWordFilter.stopWords.elements=["","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"],t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),t.trimmer=function(t){return t.replace(/^\W+/,"").replace(/\W+$/,"")},t.Pipeline.registerFunction(t.trimmer,"trimmer"),t.TokenStore=function(){this.root={docs:{}},this.length=0},t.TokenStore.load=function(t){var e=new this;return e.root=t.root,e.length=t.length,e},t.TokenStore.prototype.add=function(t,e,n){var n=n||this.root,i=t[0],o=t.slice(1);return i in n||(n[i]={docs:{}}),0===o.length?(n[i].docs[e.ref]=e,void(this.length+=1)):this.add(o,e,n[i])},t.TokenStore.prototype.has=function(t){if(!t)return!1;for(var e=this.root,n=0;n<t.length;n++){if(!e[t[n]])return!1;e=e[t[n]]}return!0},t.TokenStore.prototype.getNode=function(t){if(!t)return{};for(var e=this.root,n=0;n<t.length;n++){if(!e[t[n]])return{};e=e[t[n]]}return e},t.TokenStore.prototype.get=function(t,e){return this.getNode(t,e).docs||{}},t.TokenStore.prototype.count=function(t,e){return Object.keys(this.get(t,e)).length},t.TokenStore.prototype.remove=function(t,e){if(t){for(var n=this.root,i=0;i<t.length;i++){if(!(t[i]in n))return;n=n[t[i]]}delete n.docs[e]}},t.TokenStore.prototype.expand=function(t,e){var n=this.getNode(t),i=n.docs||{},e=e||[];return Object.keys(i).length&&e.push(t),Object.keys(n).forEach(function(n){"docs"!==n&&e.concat(this.expand(t+n,e))},this),e},t.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.lunr=e()}(this,function(){return t})}();


/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */


jQuery.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'highlight';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function (options) {
    var settings = { className: 'highlight', element: 'span' };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function (words, options) {
    var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
    jQuery.extend(settings, options);
    
    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i){
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);
    
    return this.each(function () {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};

/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */

// Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) that calls another IIFE that contains all of the plugin logic.  I used this pattern so that anyone viewing this code would not have to scroll to the bottom of the page to view the local parameters that were passed to the main IIFE.
(function(tocify) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
    tocify(window.jQuery, window, document);

}

// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.
(function($, window, document, undefined) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    var tocClassName = "tocify",
        tocClass = "." + tocClassName,
        tocFocusClassName = "tocify-focus",
        tocHoverClassName = "tocify-hover",
        hideTocClassName = "tocify-hide",
        hideTocClass = "." + hideTocClassName,
        headerClassName = "tocify-header",
        headerClass = "." + headerClassName,
        subheaderClassName = "tocify-subheader",
        subheaderClass = "." + subheaderClassName,
        itemClassName = "tocify-item",
        itemClass = "." + itemClassName,
        extendPageClassName = "tocify-extend-page",
        extendPageClass = "." + extendPageClassName;

    // Calling the jQueryUI Widget Factory Method
    $.widget("toc.tocify", {

        //Plugin version
        version: "1.8.0",

        // These options will be used as defaults
        options: {

            // **context**: Accepts String: Any jQuery selector
            // The container element that holds all of the elements used to generate the table of contents
            context: "body",

            // **ignoreSelector**: Accepts String: Any jQuery selector
            // A selector to any element that would be matched by selectors that you wish to be ignored
            ignoreSelector: null,

            // **selectors**: Accepts an Array of Strings: Any jQuery selectors
            // The element's used to generate the table of contents.  The order is very important since it will determine the table of content's nesting structure
            selectors: "h1, h2, h3",

            // **showAndHide**: Accepts a boolean: true or false
            // Used to determine if elements should be shown and hidden
            showAndHide: true,

            // **showEffect**: Accepts String: "none", "fadeIn", "show", or "slideDown"
            // Used to display any of the table of contents nested items
            showEffect: "slideDown",

            // **showEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the show animation
            showEffectSpeed: "medium",

            // **hideEffect**: Accepts String: "none", "fadeOut", "hide", or "slideUp"
            // Used to hide any of the table of contents nested items
            hideEffect: "slideUp",

            // **hideEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the hide animation
            hideEffectSpeed: "medium",

            // **smoothScroll**: Accepts a boolean: true or false
            // Determines if a jQuery animation should be used to scroll to specific table of contents items on the page
            smoothScroll: true,

            // **smoothScrollSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the smoothScroll animation
            smoothScrollSpeed: "medium",

            // **scrollTo**: Accepts Number (pixels)
            // The amount of space between the top of page and the selected table of contents item after the page has been scrolled
            scrollTo: 0,

            // **showAndHideOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be shown and hidden while scrolling
            showAndHideOnScroll: true,

            // **highlightOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be highlighted (set to a different color) while scrolling
            highlightOnScroll: true,

            // **highlightOffset**: Accepts a number
            // The offset distance in pixels to trigger the next active table of contents item
            highlightOffset: 40,

            // **theme**: Accepts a string: "bootstrap", "jqueryui", or "none"
            // Determines if Twitter Bootstrap, jQueryUI, or Tocify classes should be added to the table of contents
            theme: "bootstrap",

            // **extendPage**: Accepts a boolean: true or false
            // If a user scrolls to the bottom of the page and the page is not tall enough to scroll to the last table of contents item, then the page height is increased
            extendPage: true,

            // **extendPageOffset**: Accepts a number: pixels
            // How close to the bottom of the page a user must scroll before the page is extended
            extendPageOffset: 100,

            // **history**: Accepts a boolean: true or false
            // Adds a hash to the page url to maintain history
            history: true,

            // **scrollHistory**: Accepts a boolean: true or false
            // Adds a hash to the page url, to maintain history, when scrolling to a TOC item
            scrollHistory: false,

            // **hashGenerator**: How the hash value (the anchor segment of the URL, following the
            // # character) will be generated.
            //
            // "compact" (default) - #CompressesEverythingTogether
            // "pretty" - #looks-like-a-nice-url-and-is-easily-readable
            // function(text, element){} - Your own hash generation function that accepts the text as an
            // argument, and returns the hash value.
            hashGenerator: "compact",

            // **highlightDefault**: Accepts a boolean: true or false
            // Set's the first TOC item as active if no other TOC item is active.
            highlightDefault: true

        },

        // _Create
        // -------
        //      Constructs the plugin.  Only called once.
        _create: function() {

            var self = this;

            self.tocifyWrapper = $('.tocify-wrapper');
            self.extendPageScroll = true;

            // Internal array that keeps track of all TOC items (Helps to recognize if there are duplicate TOC item strings)
            self.items = [];

            // Generates the HTML for the dynamic table of contents
            self._generateToc();

            // Caches heights and anchors
            self.cachedHeights = [],
            self.cachedAnchors = [];

            // Adds CSS classes to the newly generated table of contents HTML
            self._addCSSClasses();

            self.webkit = (function() {

                for(var prop in window) {

                    if(prop) {

                        if(prop.toLowerCase().indexOf("webkit") !== -1) {

                            return true;

                        }

                    }

                }

                return false;

            }());

            // Adds jQuery event handlers to the newly generated table of contents
            self._setEventHandlers();

            // Binding to the Window load event to make sure the correct scrollTop is calculated
            $(window).load(function() {

                // Sets the active TOC item
                self._setActiveElement(true);

                // Once all animations on the page are complete, this callback function will be called
                $("html, body").promise().done(function() {

                    setTimeout(function() {

                        self.extendPageScroll = false;

                    },0);

                });

            });

        },

        // _generateToc
        // ------------
        //      Generates the HTML for the dynamic table of contents
        _generateToc: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // All of the HTML tags found within the context provided (i.e. body) that match the top level jQuery selector above
                firstElem,

                // Instantiated variable that will store the top level newly created unordered list DOM element
                ul,
                ignoreSelector = self.options.ignoreSelector;

             // If the selectors option has a comma within the string
             if(this.options.selectors.indexOf(",") !== -1) {

                 // Grabs the first selector from the string
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0, this.options.selectors.indexOf(",")));

             }

             // If the selectors option does not have a comman within the string
             else {

                 // Grabs the first selector from the string and makes sure there are no spaces
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,""));

             }

            if(!firstElem.length) {

                self.element.addClass(hideTocClassName);

                return;

            }

            self.element.addClass(tocClassName);

            // Loops through each top level selector
            firstElem.each(function(index) {

                //If the element matches the ignoreSelector then we skip it
                if($(this).is(ignoreSelector)) {
                    return;
                }

                // Creates an unordered list HTML element and adds a dynamic ID and standard class name
                ul = $("<ul/>", {
                    "id": headerClassName + index,
                    "class": headerClassName
                }).

                // Appends a top level list item HTML element to the previously created HTML header
                append(self._nestElements($(this), index));

                // Add the created unordered list element to the HTML element calling the plugin
                self.element.append(ul);

                // Finds all of the HTML tags between the header and subheader elements
                $(this).nextUntil(this.nodeName.toLowerCase()).each(function() {

                    // If there are no nested subheader elemements
                    if($(this).find(self.options.selectors).length === 0) {

                        // Loops through all of the subheader elements
                        $(this).filter(self.options.selectors).each(function() {

                            //If the element matches the ignoreSelector then we skip it
                            if($(this).is(ignoreSelector)) {
                                return;
                            }

                            self._appendSubheaders.call(this, self, ul);

                        });

                    }

                    // If there are nested subheader elements
                    else {

                        // Loops through all of the subheader elements
                        $(this).find(self.options.selectors).each(function() {

                            //If the element matches the ignoreSelector then we skip it
                            if($(this).is(ignoreSelector)) {
                                return;
                            }

                            self._appendSubheaders.call(this, self, ul);

                        });

                    }

                });

            });

        },

        _setActiveElement: function(pageload) {

            var self = this,

                hash = window.location.hash.substring(1),

                elem = self.element.find("li[data-unique='" + hash + "']");

            if(hash.length) {

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                elem.addClass(self.focusClass);

                // If the showAndHide option is true
                if(self.options.showAndHide) {

                    // Triggers the click event on the currently focused TOC item
                    elem.click();

                }

            }

            else {

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                if(!hash.length && pageload && self.options.highlightDefault) {

                    // Highlights the first TOC item if no other items are highlighted
                    self.element.find(itemClass).first().addClass(self.focusClass);

                }

            }

            return self;

        },

        // _nestElements
        // -------------
        //      Helps create the table of contents list by appending nested list items
        _nestElements: function(self, index) {

            var arr, item, hashValue;

            arr = $.grep(this.items, function (item) {

                return item === self.text();

            });

            // If there is already a duplicate TOC item
            if(arr.length) {

                // Adds the current TOC item text and index (for slight randomization) to the internal array
                this.items.push(self.text() + index);

            }

            // If there not a duplicate TOC item
            else {

                // Adds the current TOC item text to the internal array
                this.items.push(self.text());

            }

            hashValue = this._generateHashValue(arr, self, index);

            // ADDED BY ROBERT
            // actually add the hash value to the element's id
            // self.attr("id", "link-" + hashValue);

            // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
            item = $("<li/>", {

                // Sets a common class name to the list item
                "class": itemClassName,

                "data-unique": hashValue

            }).append($("<a/>", {

                "text": self.text()

            }));

            // Adds an HTML anchor tag before the currently traversed HTML element
            self.before($("<div/>", {

                // Sets a name attribute on the anchor tag to the text of the currently traversed HTML element (also making sure that all whitespace is replaced with an underscore)
                "name": hashValue,

                "data-unique": hashValue

            }));

            return item;

        },

        // _generateHashValue
        // ------------------
        //      Generates the hash value that will be used to refer to each item.
        _generateHashValue: function(arr, self, index) {

            var hashValue = "",
                hashGeneratorOption = this.options.hashGenerator;

            if (hashGeneratorOption === "pretty") {
                // remove weird characters


                // prettify the text
                hashValue = self.text().toLowerCase().replace(/\s/g, "-");

                // ADDED BY ROBERT
                // remove weird characters
                hashValue = hashValue.replace(/[^\x00-\x7F]/g, "");

                // fix double hyphens
                while (hashValue.indexOf("--") > -1) {
                    hashValue = hashValue.replace(/--/g, "-");
                }

                // fix colon-space instances
                while (hashValue.indexOf(":-") > -1) {
                    hashValue = hashValue.replace(/:-/g, "-");
                }

            } else if (typeof hashGeneratorOption === "function") {

                // call the function
                hashValue = hashGeneratorOption(self.text(), self);

            } else {

                // compact - the default
                hashValue = self.text().replace(/\s/g, "");

            }

            // add the index if we need to
            if (arr.length) { hashValue += ""+index; }

            // return the value
            return hashValue;

        },

        // _appendElements
        // ---------------
        //      Helps create the table of contents list by appending subheader elements

        _appendSubheaders: function(self, ul) {

            // The current element index
            var index = $(this).index(self.options.selectors),

                // Finds the previous header DOM element
                previousHeader = $(self.options.selectors).eq(index - 1),

                currentTagName = +$(this).prop("tagName").charAt(1),

                previousTagName = +previousHeader.prop("tagName").charAt(1),

                lastSubheader;

            // If the current header DOM element is smaller than the previous header DOM element or the first subheader
            if(currentTagName < previousTagName) {

                // Selects the last unordered list HTML found within the HTML element calling the plugin
                self.element.find(subheaderClass + "[data-tag=" + currentTagName + "]").last().append(self._nestElements($(this), index));

            }

            // If the current header DOM element is the same type of header(eg. h4) as the previous header DOM element
            else if(currentTagName === previousTagName) {

                ul.find(itemClass).last().after(self._nestElements($(this), index));

            }

            else {

                // Selects the last unordered list HTML found within the HTML element calling the plugin
                ul.find(itemClass).last().

                // Appends an unorderedList HTML element to the dynamic `unorderedList` variable and sets a common class name
                after($("<ul/>", {

                    "class": subheaderClassName,

                    "data-tag": currentTagName

                })).next(subheaderClass).

                // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
                append(self._nestElements($(this), index));
            }

        },

       // _setEventHandlers
        // ----------------
        //      Adds jQuery event handlers to the newly generated table of contents
        _setEventHandlers: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // Instantiates a new variable that will be used to hold a specific element's context
                $self,

                // Instantiates a new variable that will be used to determine the smoothScroll animation time duration
                duration;

            // Event delegation that looks for any clicks on list item elements inside of the HTML element calling the plugin
            this.element.on("click.tocify", "li", function(event) {

                if(self.options.history) {

                    window.location.hash = $(this).attr("data-unique");

                }

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                $(this).addClass(self.focusClass);

                // If the showAndHide option is true
                if(self.options.showAndHide) {

                    var elem = $('li[data-unique="' + $(this).attr("data-unique") + '"]');

                    self._triggerShow(elem);

                }

                self._scrollTo($(this));

            });

            // Mouseenter and Mouseleave event handlers for the list item's within the HTML element calling the plugin
            this.element.find("li").on({

                // Mouseenter event handler
                "mouseenter.tocify": function() {

                    // Adds a hover CSS class to the current list item
                    $(this).addClass(self.hoverClass);

                    // Makes sure the cursor is set to the pointer icon
                    $(this).css("cursor", "pointer");

                },

                // Mouseleave event handler
                "mouseleave.tocify": function() {

                    if(self.options.theme !== "bootstrap") {

                        // Removes the hover CSS class from the current list item
                        $(this).removeClass(self.hoverClass);

                    }

                }
            });

            // Reset height cache on scroll

            $(window).on('resize', function() {
                self.calculateHeights();
            });

            // Window scroll event handler
            $(window).on("scroll.tocify", function() {

                // Once all animations on the page are complete, this callback function will be called
                $("html, body").promise().done(function() {

                    // Local variables

                    // Stores how far the user has scrolled
                    var winScrollTop = $(window).scrollTop(),

                        // Stores the height of the window
                        winHeight = $(window).height(),

                        // Stores the height of the document
                        docHeight = $(document).height(),

                        scrollHeight = $("body")[0].scrollHeight,

                        // Instantiates a variable that will be used to hold a selected HTML element
                        elem,

                        lastElem,

                        lastElemOffset,

                        currentElem;

                    if(self.options.extendPage) {

                        // If the user has scrolled to the bottom of the page and the last toc item is not focused
                        if((self.webkit && winScrollTop >= scrollHeight - winHeight - self.options.extendPageOffset) || (!self.webkit && winHeight + winScrollTop > docHeight - self.options.extendPageOffset)) {

                            if(!$(extendPageClass).length) {

                                lastElem = $('div[data-unique="' + $(itemClass).last().attr("data-unique") + '"]');

                                if(!lastElem.length) return;

                                // Gets the top offset of the page header that is linked to the last toc item
                                lastElemOffset = lastElem.offset().top;

                                // Appends a div to the bottom of the page and sets the height to the difference of the window scrollTop and the last element's position top offset
                                $(self.options.context).append($("<div />", {

                                    "class": extendPageClassName,

                                    "height": Math.abs(lastElemOffset - winScrollTop) + "px",

                                    "data-unique": extendPageClassName

                                }));

                                if(self.extendPageScroll) {

                                    currentElem = self.element.find('li.active');

                                    self._scrollTo($("div[data-unique=" + currentElem.attr("data-unique") + "]"));

                                }

                            }

                        }

                    }

                    // The zero timeout ensures the following code is run after the scroll events
                    setTimeout(function() {

                        // _Local variables_

                        // Stores the distance to the closest anchor
                        var // Stores the index of the closest anchor
                            closestAnchorIdx = null,
                            anchorText;

                        // if never calculated before, calculate and cache the heights
                        if (self.cachedHeights.length == 0) {
                            self.calculateHeights();
                        }

                        var scrollTop = $(window).scrollTop();

                        // Determines the index of the closest anchor
                        self.cachedAnchors.each(function(idx) {
                            if (self.cachedHeights[idx] - scrollTop < 0) {
                                closestAnchorIdx = idx;
                            } else {
                                return false;
                            }
                        });

                        anchorText = $(self.cachedAnchors[closestAnchorIdx]).attr("data-unique");

                        // Stores the list item HTML element that corresponds to the currently traversed anchor tag
                        elem = $('li[data-unique="' + anchorText + '"]');

                        // If the `highlightOnScroll` option is true and a next element is found
                        if(self.options.highlightOnScroll && elem.length && !elem.hasClass(self.focusClass)) {

                            // Removes highlighting from all of the list item's
                            self.element.find("." + self.focusClass).removeClass(self.focusClass);

                            // Highlights the corresponding list item
                            elem.addClass(self.focusClass);

                            // Scroll to highlighted element's header
                            var tocifyWrapper = self.tocifyWrapper;
                            var scrollToElem = $(elem).closest('.tocify-header');

                            var elementOffset = scrollToElem.offset().top,
                                wrapperOffset = tocifyWrapper.offset().top;
                            var offset = elementOffset - wrapperOffset;

                            if (offset >= $(window).height()) {
                              var scrollPosition = offset + tocifyWrapper.scrollTop();
                              tocifyWrapper.scrollTop(scrollPosition);
                            } else if (offset < 0) {
                              tocifyWrapper.scrollTop(0);
                            }
                        }

                        if(self.options.scrollHistory) {

                            // IF STATEMENT ADDED BY ROBERT

                            if(window.location.hash !== "#" + anchorText && anchorText !== undefined) {

                                if(history.replaceState) {
                                    history.replaceState({}, "", "#" + anchorText);
                                // provide a fallback
                                } else {
                                    scrollV = document.body.scrollTop;
                                    scrollH = document.body.scrollLeft;
                                    location.hash = "#" + anchorText;
                                    document.body.scrollTop = scrollV;
                                    document.body.scrollLeft = scrollH;
                                }

                            }

                        }

                        // If the `showAndHideOnScroll` option is true
                        if(self.options.showAndHideOnScroll && self.options.showAndHide) {

                            self._triggerShow(elem, true);

                        }

                    }, 0);

                });

            });

        },

        // calculateHeights
        // ----
        //      ADDED BY ROBERT
        calculateHeights: function() {
            var self = this;
            self.cachedHeights = [];
            self.cachedAnchors = [];
            var anchors = $(self.options.context).find("div[data-unique]");
            anchors.each(function(idx) {
                var distance = (($(this).next().length ? $(this).next() : $(this)).offset().top - self.options.highlightOffset);
                self.cachedHeights[idx] = distance;
            });
            self.cachedAnchors = anchors;
        },

        // Show
        // ----
        //      Opens the current sub-header
        show: function(elem, scroll) {

            // Stores the plugin context in the `self` variable
            var self = this,
                element = elem;

            // If the sub-header is not already visible
            if (!elem.is(":visible")) {

                // If the current element does not have any nested subheaders, is not a header, and its parent is not visible
                if(!elem.find(subheaderClass).length && !elem.parent().is(headerClass) && !elem.parent().is(":visible")) {

                    // Sets the current element to all of the subheaders within the current header
                    elem = elem.parents(subheaderClass).add(elem);

                }

                // If the current element does not have any nested subheaders and is not a header
                else if(!elem.children(subheaderClass).length && !elem.parent().is(headerClass)) {

                    // Sets the current element to the closest subheader
                    elem = elem.closest(subheaderClass);

                }

                //Determines what jQuery effect to use
                switch (self.options.showEffect) {

                    //Uses `no effect`
                    case "none":

                        elem.show();

                    break;

                    //Uses the jQuery `show` special effect
                    case "show":

                        elem.show(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `slideDown` special effect
                    case "slideDown":

                        elem.slideDown(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `fadeIn` special effect
                    case "fadeIn":

                        elem.fadeIn(self.options.showEffectSpeed);

                    break;

                    //If none of the above options were passed, then a `jQueryUI show effect` is expected
                    default:

                        elem.show();

                    break;

                }

            }

            // If the current subheader parent element is a header
            if(elem.parent().is(headerClass)) {

                // Hides all non-active sub-headers
                self.hide($(subheaderClass).not(elem));

            }

            // If the current subheader parent element is not a header
            else {

                // Hides all non-active sub-headers
                self.hide($(subheaderClass).not(elem.closest(headerClass).find(subheaderClass).not(elem.siblings())));

            }

            // Maintains chainablity
            return self;

        },

        // Hide
        // ----
        //      Closes the current sub-header
        hide: function(elem) {

            // Stores the plugin context in the `self` variable
            var self = this;

            //Determines what jQuery effect to use
            switch (self.options.hideEffect) {

                // Uses `no effect`
                case "none":

                    elem.hide();

                break;

                // Uses the jQuery `hide` special effect
                case "hide":

                    elem.hide(self.options.hideEffectSpeed);

                break;

                // Uses the jQuery `slideUp` special effect
                case "slideUp":

                    elem.slideUp(self.options.hideEffectSpeed);

                break;

                // Uses the jQuery `fadeOut` special effect
                case "fadeOut":

                    elem.fadeOut(self.options.hideEffectSpeed);

                break;

                // If none of the above options were passed, then a `jqueryUI hide effect` is expected
                default:

                    elem.hide();

                break;

            }

            // Maintains chainablity
            return self;
        },

        // _triggerShow
        // ------------
        //      Determines what elements get shown on scroll and click
        _triggerShow: function(elem, scroll) {

            var self = this;

            // If the current element's parent is a header element or the next element is a nested subheader element
            if(elem.parent().is(headerClass) || elem.next().is(subheaderClass)) {

                // Shows the next sub-header element
                self.show(elem.next(subheaderClass), scroll);

            }

            // If the current element's parent is a subheader element
            else if(elem.parent().is(subheaderClass)) {

                // Shows the parent sub-header element
                self.show(elem.parent(), scroll);

            }

            // Maintains chainability
            return self;

        },

        // _addCSSClasses
        // --------------
        //      Adds CSS classes to the newly generated table of contents HTML
        _addCSSClasses: function() {

            // If the user wants a jqueryUI theme
            if(this.options.theme === "jqueryui") {

                this.focusClass = "ui-state-default";

                this.hoverClass = "ui-state-hover";

                //Adds the default styling to the dropdown list
                this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content");

            }

            // If the user wants a twitterBootstrap theme
            else if(this.options.theme === "bootstrap") {

                this.element.find(headerClass + "," + subheaderClass).addClass("nav nav-list");

                this.focusClass = "active";

            }

            // If a user does not want a prebuilt theme
            else {

                // Adds more neutral classes (instead of jqueryui)

                this.focusClass = tocFocusClassName;

                this.hoverClass = tocHoverClassName;

            }

            //Maintains chainability
            return this;

        },

        // setOption
        // ---------
        //      Sets a single Tocify option after the plugin is invoked
        setOption: function() {

            // Calls the jQueryUI Widget Factory setOption method
            $.Widget.prototype._setOption.apply(this, arguments);

        },

        // setOptions
        // ----------
        //      Sets a single or multiple Tocify options after the plugin is invoked
        setOptions: function() {

            // Calls the jQueryUI Widget Factory setOptions method
            $.Widget.prototype._setOptions.apply(this, arguments);

        },

        // _scrollTo
        // ---------
        //      Scrolls to a specific element
        _scrollTo: function(elem) {

            var self = this,
                duration = self.options.smoothScroll || 0,
                scrollTo = self.options.scrollTo;

            // Once all animations on the page are complete, this callback function will be called
            $("html, body").promise().done(function() {

                // Animates the html and body element scrolltops
                $("html, body").animate({

                    // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-unique` tag
                    "scrollTop": $('div[data-unique="' + elem.attr("data-unique") + '"]').next().offset().top - ($.isFunction(scrollTo) ? scrollTo.call() : scrollTo) + "px"

                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

            });

            // Maintains chainability
            return self;

        }

    });

})); //end of plugin
;
/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/

(function (global) {
  var languages = [];

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-name='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".highlight." + languages[i]).parent().hide();
    }
    $(".highlight." + language).parent().show();

    // scroll to the new location of the position
    $(window.location.hash).get(0).scrollIntoView(true);
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + language + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }

  function setupLanguages(l) {
    var currentLanguage = l[0];
    var defaultLanguage = localStorage.getItem("language");

    languages = l;

    if ((location.search.substr(1) !== "") && (jQuery.inArray(location.search.substr(1), languages)) != -1) {
      // the language is in the URL, so use that language!
      activateLanguage(location.search.substr(1));

      localStorage.setItem("language", location.search.substr(1));
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".lang-selector a").on("click", function() {
      var language = $(this).data("language-name");
      pushURL(language);
      activateLanguage(language);
      return false;
    });
    window.onpopstate = function(event) {
      activateLanguage(window.location.search.substr(1));
    };
  });
})(window);
(function (global) {

  var $global = $(global);
  var content, darkBox, searchResults;
  var highlightOpts = { element: 'span', className: 'search-highlight' };

  var index = new lunr.Index();

  index.ref('id');
  index.field('title', { boost: 10 });
  index.field('body');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
    $('h1, h2').each(function() {
      var title = $(this);
      var body = title.nextUntil('h1, h2');
      index.add({
        id: title.prop('id'),
        title: title.text(),
        body: body.text()
      });
    });
  }

  function bind() {
    content = $('.content');
    darkBox = $('.dark-box');
    searchResults = $('.search-results');

    $('#input-search').on('keyup', search);
  }

  function search(event) {
    unhighlight();
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        searchResults.empty();
        $.each(results, function (index, result) {
          searchResults.append("<li><a href='#" + result.ref + "'>" + $('#'+result.ref).text() + "</a></li>");
        });
        highlight.call(this);
      } else {
        searchResults.html('<li></li>');
	$('.search-results li').text('No Results Found for "' + this.value + '"');
      }
    } else {
      unhighlight();
      searchResults.removeClass('visible');
    }
  }

  function highlight() {
    if (this.value) content.highlight(this.value, highlightOpts);
  }

  function unhighlight() {
    content.unhighlight(highlightOpts);
  }

})(window);

(function (global) {
  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
});

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn) + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0) break
    };

    if (token !== void 0) out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magniture) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  Array.prototype.slice.call(arguments).forEach(function (element) {
    if (~this.indexOf(element)) return
    this.elements.splice(this.locationFor(element), 0, element)
  }, this)

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem === elem) {
      return pivot
    } else {
      return -1
    }
  }

  if (pivotElem < elem) return this.indexOf(elem, pivot, end)
  if (pivotElem > elem) return this.indexOf(elem, start, pivot)
  if (pivotElem === elem) return pivot
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem > elem) return pivot
    if (pivotElem < elem) return pivot + 1
  }

  if (pivotElem < elem) return this.locationFor(elem, pivot, end)
  if (pivotElem > elem) return this.locationFor(elem, start, pivot)
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  unionSet.add.apply(unionSet, shortSet.toArray())

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(lunr.tokenizer(doc[field.name]))

    docTokens[field.name] = fieldTokens
    lunr.SortedSet.prototype.add.apply(allDocumentTokens, fieldTokens)
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)
  lunr.SortedSet.prototype.add.apply(this.corpusTokens, allDocumentTokens.toArray())

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = this._fields.reduce(function (memo, field) {
      var fieldLength = docTokens[field.name].length

      if (!fieldLength) return memo

      var tokenCount = docTokens[field.name].filter(function (t) { return t === token }).length

      return memo + (tokenCount / fieldLength * field.boost)
    }, 0)

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.tokenStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(lunr.tokenizer(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        Object.keys(self.tokenStore.get(key)).forEach(function (ref) { set.add(ref) })

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  this.store[id] = tokens
  this.length = Object.keys(this.store).length
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartaurs.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  return function (w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(s_v);
      if (re.test(stem)) { w = stem + "i"; }
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = function (token) {
  if (lunr.stopWordFilter.stopWords.indexOf(token) === -1) return token
}

lunr.stopWordFilter.stopWords = new lunr.SortedSet
lunr.stopWordFilter.stopWords.length = 119
lunr.stopWordFilter.stopWords.elements = [
  "",
  "a",
  "able",
  "about",
  "across",
  "after",
  "all",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dear",
  "did",
  "do",
  "does",
  "either",
  "else",
  "ever",
  "every",
  "for",
  "from",
  "get",
  "got",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "however",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "least",
  "let",
  "like",
  "likely",
  "may",
  "me",
  "might",
  "most",
  "must",
  "my",
  "neither",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "often",
  "on",
  "only",
  "or",
  "other",
  "our",
  "own",
  "rather",
  "said",
  "say",
  "says",
  "she",
  "should",
  "since",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "tis",
  "to",
  "too",
  "twas",
  "us",
  "wants",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "yet",
  "you",
  "your"
]

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token
    .replace(/^\W+/, '')
    .replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token[0],
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return false

    node = node[token[i]]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return {}

    node = node[token[i]]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token[i] in node)) return
    node = node[token[i]]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}


  /**
   * export the module via AMD, CommonnJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
// })()
;
/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/

(function (global) {
  var languages = [];

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-name='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".highlight." + languages[i]).parent().hide();
    }
    $(".highlight." + language).parent().show();

    try {
      // scroll to the new location of the position
      $(window.location.hash).get(0).scrollIntoView(true);
    } catch (_) {}
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + language + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }

  function setupLanguages(l) {
    var currentLanguage = l[0];
    var defaultLanguage = localStorage.getItem("language");

    languages = l;

    if ((location.search.substr(1) !== "") && (jQuery.inArray(location.search.substr(1), languages)) != -1) {
      // the language is in the URL, so use that language!
      activateLanguage(location.search.substr(1));

      localStorage.setItem("language", location.search.substr(1));
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".lang-selector a").on("click", function() {
      var language = $(this).data("language-name");
      pushURL(language);
      activateLanguage(language);
      return false;
    });
    window.onpopstate = function(event) {
      activateLanguage(window.location.search.substr(1));
    };
  });
})(window);
(function (global) {

  var $global = $(global);
  var content, darkBox, searchResults;
  var highlightOpts = { element: 'span', className: 'search-highlight' };

  var index = new lunr.Index();

  index.ref('id');
  index.field('title', { boost: 10 });
  index.field('body');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
    $('h1, h2').each(function() {
      var title = $(this);
      var body = title.nextUntil('h1, h2');
      index.add({
        id: title.prop('id'),
        title: title.text(),
        body: body.text()
      });
    });
  }

  function bind() {
    content = $('.content');
    darkBox = $('.dark-box');
    searchResults = $('.search-results');

    $('#input-search').on('keyup', search);
  }

  function search(event) {
    unhighlight();
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        searchResults.empty();
        $.each(results, function (index, result) {
          searchResults.append("<li><a href='#" + result.ref + "'>" + $('#'+result.ref).text() + "</a></li>");
        });
        highlight.call(this);
      } else {
        searchResults.html('<li></li>');
	$('.search-results li').text('No Results Found for "' + this.value + '"');
      }
    } else {
      unhighlight();
      searchResults.removeClass('visible');
    }
  }

  function highlight() {
    if (this.value) content.highlight(this.value, highlightOpts);
  }

  function unhighlight() {
    content.unhighlight(highlightOpts);
  }

})(window);
(function (global) {

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: 'h1, h2',
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate () {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  $(makeToc);
  $(animate);

})(window);


/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});


/*! jQuery Timepicker Addon - v1.5.0 - 2014-09-01
* http://trentrichardson.com/examples/timepicker
* Copyright (c) 2014 Trent Richardson; Licensed MIT */
(function($){if($.ui.timepicker=$.ui.timepicker||{},!$.ui.timepicker.version){$.extend($.ui,{timepicker:{version:"1.5.0"}});var Timepicker=function(){this.regional=[],this.regional[""]={currentText:"Now",closeText:"Done",amNames:["AM","A"],pmNames:["PM","P"],timeFormat:"HH:mm",timeSuffix:"",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",secondText:"Second",millisecText:"Millisecond",microsecText:"Microsecond",timezoneText:"Time Zone",isRTL:!1},this._defaults={showButtonPanel:!0,timeOnly:!1,timeOnlyShowDate:!1,showHour:null,showMinute:null,showSecond:null,showMillisec:null,showMicrosec:null,showTimezone:null,showTime:!0,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,stepMicrosec:1,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,microsecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,microsecMax:999,minDateTime:null,maxDateTime:null,maxTime:null,minTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,microsecGrid:0,alwaysSetTime:!0,separator:" ",altFieldTimeOnly:!0,altTimeFormat:null,altSeparator:null,altTimeSuffix:null,altRedirectFocus:!0,pickerTimeFormat:null,pickerTimeSuffix:null,showTimepicker:!0,timezoneList:null,addSliderAccess:!1,sliderAccessArgs:null,controlType:"slider",defaultValue:null,parse:"strict"},$.extend(this._defaults,this.regional[""])};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,microsec_slider:null,timezone_select:null,maxTime:null,minTime:null,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,microsecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,microsecMaxOriginal:null,ampm:"",formattedDate:"",formattedTime:"",formattedDateTime:"",timezoneList:null,units:["hour","minute","second","millisec","microsec"],support:{},control:null,setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_newInst:function($input,opts){var tp_inst=new Timepicker,inlineSettings={},fns={},overrides,i;for(var attrName in this._defaults)if(this._defaults.hasOwnProperty(attrName)){var attrValue=$input.attr("time:"+attrName);if(attrValue)try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}overrides={beforeShow:function(e,t){return $.isFunction(tp_inst._defaults.evnts.beforeShow)?tp_inst._defaults.evnts.beforeShow.call($input[0],e,t,tp_inst):void 0},onChangeMonthYear:function(e,t,i){tp_inst._updateDateTime(i),$.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)&&tp_inst._defaults.evnts.onChangeMonthYear.call($input[0],e,t,i,tp_inst)},onClose:function(e,t){tp_inst.timeDefined===!0&&""!==$input.val()&&tp_inst._updateDateTime(t),$.isFunction(tp_inst._defaults.evnts.onClose)&&tp_inst._defaults.evnts.onClose.call($input[0],e,t,tp_inst)}};for(i in overrides)overrides.hasOwnProperty(i)&&(fns[i]=opts[i]||null);tp_inst._defaults=$.extend({},this._defaults,inlineSettings,opts,overrides,{evnts:fns,timepicker:tp_inst}),tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(e){return e.toUpperCase()}),tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(e){return e.toUpperCase()}),tp_inst.support=detectSupport(tp_inst._defaults.timeFormat+(tp_inst._defaults.pickerTimeFormat?tp_inst._defaults.pickerTimeFormat:"")+(tp_inst._defaults.altTimeFormat?tp_inst._defaults.altTimeFormat:"")),"string"==typeof tp_inst._defaults.controlType?("slider"===tp_inst._defaults.controlType&&$.ui.slider===void 0&&(tp_inst._defaults.controlType="select"),tp_inst.control=tp_inst._controls[tp_inst._defaults.controlType]):tp_inst.control=tp_inst._defaults.controlType;var timezoneList=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,525,540,570,600,630,660,690,720,765,780,840];null!==tp_inst._defaults.timezoneList&&(timezoneList=tp_inst._defaults.timezoneList);var tzl=timezoneList.length,tzi=0,tzv=null;if(tzl>0&&"object"!=typeof timezoneList[0])for(;tzl>tzi;tzi++)tzv=timezoneList[tzi],timezoneList[tzi]={value:tzv,label:$.timepicker.timezoneOffsetString(tzv,tp_inst.support.iso8601)};return tp_inst._defaults.timezoneList=timezoneList,tp_inst.timezone=null!==tp_inst._defaults.timezone?$.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone):-1*(new Date).getTimezoneOffset(),tp_inst.hour=tp_inst._defaults.hour<tp_inst._defaults.hourMin?tp_inst._defaults.hourMin:tp_inst._defaults.hour>tp_inst._defaults.hourMax?tp_inst._defaults.hourMax:tp_inst._defaults.hour,tp_inst.minute=tp_inst._defaults.minute<tp_inst._defaults.minuteMin?tp_inst._defaults.minuteMin:tp_inst._defaults.minute>tp_inst._defaults.minuteMax?tp_inst._defaults.minuteMax:tp_inst._defaults.minute,tp_inst.second=tp_inst._defaults.second<tp_inst._defaults.secondMin?tp_inst._defaults.secondMin:tp_inst._defaults.second>tp_inst._defaults.secondMax?tp_inst._defaults.secondMax:tp_inst._defaults.second,tp_inst.millisec=tp_inst._defaults.millisec<tp_inst._defaults.millisecMin?tp_inst._defaults.millisecMin:tp_inst._defaults.millisec>tp_inst._defaults.millisecMax?tp_inst._defaults.millisecMax:tp_inst._defaults.millisec,tp_inst.microsec=tp_inst._defaults.microsec<tp_inst._defaults.microsecMin?tp_inst._defaults.microsecMin:tp_inst._defaults.microsec>tp_inst._defaults.microsecMax?tp_inst._defaults.microsecMax:tp_inst._defaults.microsec,tp_inst.ampm="",tp_inst.$input=$input,tp_inst._defaults.altField&&(tp_inst.$altInput=$(tp_inst._defaults.altField),tp_inst._defaults.altRedirectFocus===!0&&tp_inst.$altInput.css({cursor:"pointer"}).focus(function(){$input.trigger("focus")})),(0===tp_inst._defaults.minDate||0===tp_inst._defaults.minDateTime)&&(tp_inst._defaults.minDate=new Date),(0===tp_inst._defaults.maxDate||0===tp_inst._defaults.maxDateTime)&&(tp_inst._defaults.maxDate=new Date),void 0!==tp_inst._defaults.minDate&&tp_inst._defaults.minDate instanceof Date&&(tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime())),void 0!==tp_inst._defaults.minDateTime&&tp_inst._defaults.minDateTime instanceof Date&&(tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime())),void 0!==tp_inst._defaults.maxDate&&tp_inst._defaults.maxDate instanceof Date&&(tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime())),void 0!==tp_inst._defaults.maxDateTime&&tp_inst._defaults.maxDateTime instanceof Date&&(tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime())),tp_inst.$input.bind("focus",function(){tp_inst._onFocus()}),tp_inst},_addTimePicker:function(e){var t=this.$altInput&&this._defaults.altFieldTimeOnly?this.$input.val()+" "+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(t),this._limitMinMaxDateTime(e,!1),this._injectTimePicker()},_parseTime:function(e,t){if(this.inst||(this.inst=$.datepicker._getInst(this.$input[0])),t||!this._defaults.timeOnly){var i=$.datepicker._get(this.inst,"dateFormat");try{var s=parseDateTimeInternal(i,this._defaults.timeFormat,e,$.datepicker._getFormatConfig(this.inst),this._defaults);if(!s.timeObj)return!1;$.extend(this,s.timeObj)}catch(a){return $.timepicker.log("Error parsing the date/time string: "+a+"\ndate/time string = "+e+"\ntimeFormat = "+this._defaults.timeFormat+"\ndateFormat = "+i),!1}return!0}var n=$.datepicker.parseTime(this._defaults.timeFormat,e,this._defaults);return n?($.extend(this,n),!0):!1},_injectTimePicker:function(){var e=this.inst.dpDiv,t=this.inst.settings,i=this,s="",a="",n=null,r={},l={},o=null,c=0,u=0;if(0===e.find("div.ui-timepicker-div").length&&t.showTimepicker){var m=' style="display:none;"',d='<div class="ui-timepicker-div'+(t.isRTL?" ui-timepicker-rtl":"")+'"><dl>'+'<dt class="ui_tpicker_time_label"'+(t.showTime?"":m)+">"+t.timeText+"</dt>"+'<dd class="ui_tpicker_time"'+(t.showTime?"":m)+"></dd>";for(c=0,u=this.units.length;u>c;c++){if(s=this.units[c],a=s.substr(0,1).toUpperCase()+s.substr(1),n=null!==t["show"+a]?t["show"+a]:this.support[s],r[s]=parseInt(t[s+"Max"]-(t[s+"Max"]-t[s+"Min"])%t["step"+a],10),l[s]=0,d+='<dt class="ui_tpicker_'+s+'_label"'+(n?"":m)+">"+t[s+"Text"]+"</dt>"+'<dd class="ui_tpicker_'+s+'"><div class="ui_tpicker_'+s+'_slider"'+(n?"":m)+"></div>",n&&t[s+"Grid"]>0){if(d+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>',"hour"===s)for(var h=t[s+"Min"];r[s]>=h;h+=parseInt(t[s+"Grid"],10)){l[s]++;var p=$.datepicker.formatTime(this.support.ampm?"hht":"HH",{hour:h},t);d+='<td data-for="'+s+'">'+p+"</td>"}else for(var _=t[s+"Min"];r[s]>=_;_+=parseInt(t[s+"Grid"],10))l[s]++,d+='<td data-for="'+s+'">'+(10>_?"0":"")+_+"</td>";d+="</tr></table></div>"}d+="</dd>"}var f=null!==t.showTimezone?t.showTimezone:this.support.timezone;d+='<dt class="ui_tpicker_timezone_label"'+(f?"":m)+">"+t.timezoneText+"</dt>",d+='<dd class="ui_tpicker_timezone" '+(f?"":m)+"></dd>",d+="</dl></div>";var g=$(d);for(t.timeOnly===!0&&(g.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">'+t.timeOnlyTitle+"</div>"+"</div>"),e.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()),c=0,u=i.units.length;u>c;c++)s=i.units[c],a=s.substr(0,1).toUpperCase()+s.substr(1),n=null!==t["show"+a]?t["show"+a]:this.support[s],i[s+"_slider"]=i.control.create(i,g.find(".ui_tpicker_"+s+"_slider"),s,i[s],t[s+"Min"],r[s],t["step"+a]),n&&t[s+"Grid"]>0&&(o=100*l[s]*t[s+"Grid"]/(r[s]-t[s+"Min"]),g.find(".ui_tpicker_"+s+" table").css({width:o+"%",marginLeft:t.isRTL?"0":o/(-2*l[s])+"%",marginRight:t.isRTL?o/(-2*l[s])+"%":"0",borderCollapse:"collapse"}).find("td").click(function(){var e=$(this),t=e.html(),a=parseInt(t.replace(/[^0-9]/g),10),n=t.replace(/[^apm]/gi),r=e.data("for");"hour"===r&&(-1!==n.indexOf("p")&&12>a?a+=12:-1!==n.indexOf("a")&&12===a&&(a=0)),i.control.value(i,i[r+"_slider"],s,a),i._onTimeChange(),i._onSelectHandler()}).css({cursor:"pointer",width:100/l[s]+"%",textAlign:"center",overflow:"hidden"}));if(this.timezone_select=g.find(".ui_tpicker_timezone").append("<select></select>").find("select"),$.fn.append.apply(this.timezone_select,$.map(t.timezoneList,function(e){return $("<option />").val("object"==typeof e?e.value:e).text("object"==typeof e?e.label:e)})),this.timezone!==void 0&&null!==this.timezone&&""!==this.timezone){var M=-1*new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12).getTimezoneOffset();M===this.timezone?selectLocalTimezone(i):this.timezone_select.val(this.timezone)}else this.hour!==void 0&&null!==this.hour&&""!==this.hour?this.timezone_select.val(t.timezone):selectLocalTimezone(i);this.timezone_select.change(function(){i._onTimeChange(),i._onSelectHandler()});var v=e.find(".ui-datepicker-buttonpane");if(v.length?v.before(g):e.append(g),this.$timeObj=g.find(".ui_tpicker_time"),null!==this.inst){var k=this.timeDefined;this._onTimeChange(),this.timeDefined=k}if(this._defaults.addSliderAccess){var T=this._defaults.sliderAccessArgs,D=this._defaults.isRTL;T.isRTL=D,setTimeout(function(){if(0===g.find(".ui-slider-access").length){g.find(".ui-slider:visible").sliderAccess(T);var e=g.find(".ui-slider-access:eq(0)").outerWidth(!0);e&&g.find("table:visible").each(function(){var t=$(this),i=t.outerWidth(),s=(""+t.css(D?"marginRight":"marginLeft")).replace("%",""),a=i-e,n=s*a/i+"%",r={width:a,marginRight:0,marginLeft:0};r[D?"marginRight":"marginLeft"]=n,t.css(r)})}},10)}i._limitMinMaxDateTime(this.inst,!0)}},_limitMinMaxDateTime:function(e,t){var i=this._defaults,s=new Date(e.selectedYear,e.selectedMonth,e.selectedDay);if(this._defaults.showTimepicker){if(null!==$.datepicker._get(e,"minDateTime")&&void 0!==$.datepicker._get(e,"minDateTime")&&s){var a=$.datepicker._get(e,"minDateTime"),n=new Date(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0,0);(null===this.hourMinOriginal||null===this.minuteMinOriginal||null===this.secondMinOriginal||null===this.millisecMinOriginal||null===this.microsecMinOriginal)&&(this.hourMinOriginal=i.hourMin,this.minuteMinOriginal=i.minuteMin,this.secondMinOriginal=i.secondMin,this.millisecMinOriginal=i.millisecMin,this.microsecMinOriginal=i.microsecMin),e.settings.timeOnly||n.getTime()===s.getTime()?(this._defaults.hourMin=a.getHours(),this.hour<=this._defaults.hourMin?(this.hour=this._defaults.hourMin,this._defaults.minuteMin=a.getMinutes(),this.minute<=this._defaults.minuteMin?(this.minute=this._defaults.minuteMin,this._defaults.secondMin=a.getSeconds(),this.second<=this._defaults.secondMin?(this.second=this._defaults.secondMin,this._defaults.millisecMin=a.getMilliseconds(),this.millisec<=this._defaults.millisecMin?(this.millisec=this._defaults.millisecMin,this._defaults.microsecMin=a.getMicroseconds()):(this.microsec<this._defaults.microsecMin&&(this.microsec=this._defaults.microsecMin),this._defaults.microsecMin=this.microsecMinOriginal)):(this._defaults.millisecMin=this.millisecMinOriginal,this._defaults.microsecMin=this.microsecMinOriginal)):(this._defaults.secondMin=this.secondMinOriginal,this._defaults.millisecMin=this.millisecMinOriginal,this._defaults.microsecMin=this.microsecMinOriginal)):(this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal,this._defaults.millisecMin=this.millisecMinOriginal,this._defaults.microsecMin=this.microsecMinOriginal)):(this._defaults.hourMin=this.hourMinOriginal,this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal,this._defaults.millisecMin=this.millisecMinOriginal,this._defaults.microsecMin=this.microsecMinOriginal)}if(null!==$.datepicker._get(e,"maxDateTime")&&void 0!==$.datepicker._get(e,"maxDateTime")&&s){var r=$.datepicker._get(e,"maxDateTime"),l=new Date(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0,0);(null===this.hourMaxOriginal||null===this.minuteMaxOriginal||null===this.secondMaxOriginal||null===this.millisecMaxOriginal)&&(this.hourMaxOriginal=i.hourMax,this.minuteMaxOriginal=i.minuteMax,this.secondMaxOriginal=i.secondMax,this.millisecMaxOriginal=i.millisecMax,this.microsecMaxOriginal=i.microsecMax),e.settings.timeOnly||l.getTime()===s.getTime()?(this._defaults.hourMax=r.getHours(),this.hour>=this._defaults.hourMax?(this.hour=this._defaults.hourMax,this._defaults.minuteMax=r.getMinutes(),this.minute>=this._defaults.minuteMax?(this.minute=this._defaults.minuteMax,this._defaults.secondMax=r.getSeconds(),this.second>=this._defaults.secondMax?(this.second=this._defaults.secondMax,this._defaults.millisecMax=r.getMilliseconds(),this.millisec>=this._defaults.millisecMax?(this.millisec=this._defaults.millisecMax,this._defaults.microsecMax=r.getMicroseconds()):(this.microsec>this._defaults.microsecMax&&(this.microsec=this._defaults.microsecMax),this._defaults.microsecMax=this.microsecMaxOriginal)):(this._defaults.millisecMax=this.millisecMaxOriginal,this._defaults.microsecMax=this.microsecMaxOriginal)):(this._defaults.secondMax=this.secondMaxOriginal,this._defaults.millisecMax=this.millisecMaxOriginal,this._defaults.microsecMax=this.microsecMaxOriginal)):(this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal,this._defaults.millisecMax=this.millisecMaxOriginal,this._defaults.microsecMax=this.microsecMaxOriginal)):(this._defaults.hourMax=this.hourMaxOriginal,this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal,this._defaults.millisecMax=this.millisecMaxOriginal,this._defaults.microsecMax=this.microsecMaxOriginal)}if(null!==e.settings.minTime){var o=new Date("01/01/1970 "+e.settings.minTime);this.hour<o.getHours()?(this.hour=this._defaults.hourMin=o.getHours(),this.minute=this._defaults.minuteMin=o.getMinutes()):this.hour===o.getHours()&&this.minute<o.getMinutes()?this.minute=this._defaults.minuteMin=o.getMinutes():this._defaults.hourMin<o.getHours()?(this._defaults.hourMin=o.getHours(),this._defaults.minuteMin=o.getMinutes()):this._defaults.minuteMin=this._defaults.hourMin===o.getHours()===this.hour&&this._defaults.minuteMin<o.getMinutes()?o.getMinutes():0}if(null!==e.settings.maxTime){var c=new Date("01/01/1970 "+e.settings.maxTime);this.hour>c.getHours()?(this.hour=this._defaults.hourMax=c.getHours(),this.minute=this._defaults.minuteMax=c.getMinutes()):this.hour===c.getHours()&&this.minute>c.getMinutes()?this.minute=this._defaults.minuteMax=c.getMinutes():this._defaults.hourMax>c.getHours()?(this._defaults.hourMax=c.getHours(),this._defaults.minuteMax=c.getMinutes()):this._defaults.minuteMax=this._defaults.hourMax===c.getHours()===this.hour&&this._defaults.minuteMax>c.getMinutes()?c.getMinutes():59}if(void 0!==t&&t===!0){var u=parseInt(this._defaults.hourMax-(this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour,10),m=parseInt(this._defaults.minuteMax-(this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute,10),d=parseInt(this._defaults.secondMax-(this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond,10),h=parseInt(this._defaults.millisecMax-(this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec,10),p=parseInt(this._defaults.microsecMax-(this._defaults.microsecMax-this._defaults.microsecMin)%this._defaults.stepMicrosec,10);this.hour_slider&&(this.control.options(this,this.hour_slider,"hour",{min:this._defaults.hourMin,max:u,step:this._defaults.stepHour}),this.control.value(this,this.hour_slider,"hour",this.hour-this.hour%this._defaults.stepHour)),this.minute_slider&&(this.control.options(this,this.minute_slider,"minute",{min:this._defaults.minuteMin,max:m,step:this._defaults.stepMinute}),this.control.value(this,this.minute_slider,"minute",this.minute-this.minute%this._defaults.stepMinute)),this.second_slider&&(this.control.options(this,this.second_slider,"second",{min:this._defaults.secondMin,max:d,step:this._defaults.stepSecond}),this.control.value(this,this.second_slider,"second",this.second-this.second%this._defaults.stepSecond)),this.millisec_slider&&(this.control.options(this,this.millisec_slider,"millisec",{min:this._defaults.millisecMin,max:h,step:this._defaults.stepMillisec}),this.control.value(this,this.millisec_slider,"millisec",this.millisec-this.millisec%this._defaults.stepMillisec)),this.microsec_slider&&(this.control.options(this,this.microsec_slider,"microsec",{min:this._defaults.microsecMin,max:p,step:this._defaults.stepMicrosec}),this.control.value(this,this.microsec_slider,"microsec",this.microsec-this.microsec%this._defaults.stepMicrosec))}}},_onTimeChange:function(){if(this._defaults.showTimepicker){var e=this.hour_slider?this.control.value(this,this.hour_slider,"hour"):!1,t=this.minute_slider?this.control.value(this,this.minute_slider,"minute"):!1,i=this.second_slider?this.control.value(this,this.second_slider,"second"):!1,s=this.millisec_slider?this.control.value(this,this.millisec_slider,"millisec"):!1,a=this.microsec_slider?this.control.value(this,this.microsec_slider,"microsec"):!1,n=this.timezone_select?this.timezone_select.val():!1,r=this._defaults,l=r.pickerTimeFormat||r.timeFormat,o=r.pickerTimeSuffix||r.timeSuffix;"object"==typeof e&&(e=!1),"object"==typeof t&&(t=!1),"object"==typeof i&&(i=!1),"object"==typeof s&&(s=!1),"object"==typeof a&&(a=!1),"object"==typeof n&&(n=!1),e!==!1&&(e=parseInt(e,10)),t!==!1&&(t=parseInt(t,10)),i!==!1&&(i=parseInt(i,10)),s!==!1&&(s=parseInt(s,10)),a!==!1&&(a=parseInt(a,10)),n!==!1&&(n=""+n);var c=r[12>e?"amNames":"pmNames"][0],u=e!==parseInt(this.hour,10)||t!==parseInt(this.minute,10)||i!==parseInt(this.second,10)||s!==parseInt(this.millisec,10)||a!==parseInt(this.microsec,10)||this.ampm.length>0&&12>e!=(-1!==$.inArray(this.ampm.toUpperCase(),this.amNames))||null!==this.timezone&&n!==""+this.timezone;u&&(e!==!1&&(this.hour=e),t!==!1&&(this.minute=t),i!==!1&&(this.second=i),s!==!1&&(this.millisec=s),a!==!1&&(this.microsec=a),n!==!1&&(this.timezone=n),this.inst||(this.inst=$.datepicker._getInst(this.$input[0])),this._limitMinMaxDateTime(this.inst,!0)),this.support.ampm&&(this.ampm=c),this.formattedTime=$.datepicker.formatTime(r.timeFormat,this,r),this.$timeObj&&(l===r.timeFormat?this.$timeObj.text(this.formattedTime+o):this.$timeObj.text($.datepicker.formatTime(l,this,r)+o)),this.timeDefined=!0,u&&this._updateDateTime()}},_onSelectHandler:function(){var e=this._defaults.onSelect||this.inst.settings.onSelect,t=this.$input?this.$input[0]:null;e&&t&&e.apply(t,[this.formattedDateTime,this])},_updateDateTime:function(e){e=this.inst||e;var t=e.currentYear>0?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(e.selectedYear,e.selectedMonth,e.selectedDay),i=$.datepicker._daylightSavingAdjust(t),s=$.datepicker._get(e,"dateFormat"),a=$.datepicker._getFormatConfig(e),n=null!==i&&this.timeDefined;this.formattedDate=$.datepicker.formatDate(s,null===i?new Date:i,a);var r=this.formattedDate;if(""===e.lastVal&&(e.currentYear=e.selectedYear,e.currentMonth=e.selectedMonth,e.currentDay=e.selectedDay),this._defaults.timeOnly===!0&&this._defaults.timeOnlyShowDate===!1?r=this.formattedTime:(this._defaults.timeOnly!==!0&&(this._defaults.alwaysSetTime||n)||this._defaults.timeOnly===!0&&this._defaults.timeOnlyShowDate===!0)&&(r+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix),this.formattedDateTime=r,this._defaults.showTimepicker)if(this.$altInput&&this._defaults.timeOnly===!1&&this._defaults.altFieldTimeOnly===!0)this.$altInput.val(this.formattedTime),this.$input.val(this.formattedDate);else if(this.$altInput){this.$input.val(r);var l="",o=null!==this._defaults.altSeparator?this._defaults.altSeparator:this._defaults.separator,c=null!==this._defaults.altTimeSuffix?this._defaults.altTimeSuffix:this._defaults.timeSuffix;this._defaults.timeOnly||(l=this._defaults.altFormat?$.datepicker.formatDate(this._defaults.altFormat,null===i?new Date:i,a):this.formattedDate,l&&(l+=o)),l+=null!==this._defaults.altTimeFormat?$.datepicker.formatTime(this._defaults.altTimeFormat,this,this._defaults)+c:this.formattedTime+c,this.$altInput.val(l)}else this.$input.val(r);else this.$input.val(this.formattedDate);this.$input.trigger("change")},_onFocus:function(){if(!this.$input.val()&&this._defaults.defaultValue){this.$input.val(this._defaults.defaultValue);var e=$.datepicker._getInst(this.$input.get(0)),t=$.datepicker._get(e,"timepicker");if(t&&t._defaults.timeOnly&&e.input.val()!==e.lastVal)try{$.datepicker._updateDatepicker(e)}catch(i){$.timepicker.log(i)}}},_controls:{slider:{create:function(e,t,i,s,a,n,r){var l=e._defaults.isRTL;return t.prop("slide",null).slider({orientation:"horizontal",value:l?-1*s:s,min:l?-1*n:a,max:l?-1*a:n,step:r,slide:function(t,s){e.control.value(e,$(this),i,l?-1*s.value:s.value),e._onTimeChange()},stop:function(){e._onSelectHandler()}})},options:function(e,t,i,s,a){if(e._defaults.isRTL){if("string"==typeof s)return"min"===s||"max"===s?void 0!==a?t.slider(s,-1*a):Math.abs(t.slider(s)):t.slider(s);var n=s.min,r=s.max;return s.min=s.max=null,void 0!==n&&(s.max=-1*n),void 0!==r&&(s.min=-1*r),t.slider(s)}return"string"==typeof s&&void 0!==a?t.slider(s,a):t.slider(s)},value:function(e,t,i,s){return e._defaults.isRTL?void 0!==s?t.slider("value",-1*s):Math.abs(t.slider("value")):void 0!==s?t.slider("value",s):t.slider("value")}},select:{create:function(e,t,i,s,a,n,r){for(var l='<select class="ui-timepicker-select ui-state-default ui-corner-all" data-unit="'+i+'" data-min="'+a+'" data-max="'+n+'" data-step="'+r+'">',o=e._defaults.pickerTimeFormat||e._defaults.timeFormat,c=a;n>=c;c+=r)l+='<option value="'+c+'"'+(c===s?" selected":"")+">",l+="hour"===i?$.datepicker.formatTime($.trim(o.replace(/[^ht ]/gi,"")),{hour:c},e._defaults):"millisec"===i||"microsec"===i||c>=10?c:"0"+(""+c),l+="</option>";return l+="</select>",t.children("select").remove(),$(l).appendTo(t).change(function(){e._onTimeChange(),e._onSelectHandler()}),t},options:function(e,t,i,s,a){var n={},r=t.children("select");if("string"==typeof s){if(void 0===a)return r.data(s);n[s]=a}else n=s;return e.control.create(e,t,r.data("unit"),r.val(),n.min||r.data("min"),n.max||r.data("max"),n.step||r.data("step"))},value:function(e,t,i,s){var a=t.children("select");return void 0!==s?a.val(s):a.val()}}}}),$.fn.extend({timepicker:function(e){e=e||{};var t=Array.prototype.slice.call(arguments);return"object"==typeof e&&(t[0]=$.extend(e,{timeOnly:!0})),$(this).each(function(){$.fn.datetimepicker.apply($(this),t)})},datetimepicker:function(e){e=e||{};var t=arguments;return"string"==typeof e?"getDate"===e||"option"===e&&2===t.length&&"string"==typeof t[1]?$.fn.datepicker.apply($(this[0]),t):this.each(function(){var e=$(this);e.datepicker.apply(e,t)}):this.each(function(){var t=$(this);t.datepicker($.timepicker._newInst(t,e)._defaults)})}}),$.datepicker.parseDateTime=function(e,t,i,s,a){var n=parseDateTimeInternal(e,t,i,s,a);if(n.timeObj){var r=n.timeObj;n.date.setHours(r.hour,r.minute,r.second,r.millisec),n.date.setMicroseconds(r.microsec)}return n.date},$.datepicker.parseTime=function(e,t,i){var s=extendRemove(extendRemove({},$.timepicker._defaults),i||{});-1!==e.replace(/\'.*?\'/g,"").indexOf("Z");var a=function(e,t,i){var s,a=function(e,t){var i=[];return e&&$.merge(i,e),t&&$.merge(i,t),i=$.map(i,function(e){return e.replace(/[.*+?|()\[\]{}\\]/g,"\\$&")}),"("+i.join("|")+")?"},n=function(e){var t=e.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),i={h:-1,m:-1,s:-1,l:-1,c:-1,t:-1,z:-1};if(t)for(var s=0;t.length>s;s++)-1===i[(""+t[s]).charAt(0)]&&(i[(""+t[s]).charAt(0)]=s+1);return i},r="^"+(""+e).replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(e){var t=e.length;switch(e.charAt(0).toLowerCase()){case"h":return 1===t?"(\\d?\\d)":"(\\d{"+t+"})";case"m":return 1===t?"(\\d?\\d)":"(\\d{"+t+"})";case"s":return 1===t?"(\\d?\\d)":"(\\d{"+t+"})";case"l":return"(\\d?\\d?\\d)";case"c":return"(\\d?\\d?\\d)";case"z":return"(z|[-+]\\d\\d:?\\d\\d|\\S+)?";case"t":return a(i.amNames,i.pmNames);default:return"("+e.replace(/\'/g,"").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,function(e){return"\\"+e})+")?"}}).replace(/\s/g,"\\s?")+i.timeSuffix+"$",l=n(e),o="";s=t.match(RegExp(r,"i"));var c={hour:0,minute:0,second:0,millisec:0,microsec:0};return s?(-1!==l.t&&(void 0===s[l.t]||0===s[l.t].length?(o="",c.ampm=""):(o=-1!==$.inArray(s[l.t].toUpperCase(),i.amNames)?"AM":"PM",c.ampm=i["AM"===o?"amNames":"pmNames"][0])),-1!==l.h&&(c.hour="AM"===o&&"12"===s[l.h]?0:"PM"===o&&"12"!==s[l.h]?parseInt(s[l.h],10)+12:Number(s[l.h])),-1!==l.m&&(c.minute=Number(s[l.m])),-1!==l.s&&(c.second=Number(s[l.s])),-1!==l.l&&(c.millisec=Number(s[l.l])),-1!==l.c&&(c.microsec=Number(s[l.c])),-1!==l.z&&void 0!==s[l.z]&&(c.timezone=$.timepicker.timezoneOffsetNumber(s[l.z])),c):!1},n=function(e,t,i){try{var s=new Date("2012-01-01 "+t);if(isNaN(s.getTime())&&(s=new Date("2012-01-01T"+t),isNaN(s.getTime())&&(s=new Date("01/01/2012 "+t),isNaN(s.getTime()))))throw"Unable to parse time with native Date: "+t;return{hour:s.getHours(),minute:s.getMinutes(),second:s.getSeconds(),millisec:s.getMilliseconds(),microsec:s.getMicroseconds(),timezone:-1*s.getTimezoneOffset()}}catch(n){try{return a(e,t,i)}catch(r){$.timepicker.log("Unable to parse \ntimeString: "+t+"\ntimeFormat: "+e)}}return!1};return"function"==typeof s.parse?s.parse(e,t,s):"loose"===s.parse?n(e,t,s):a(e,t,s)},$.datepicker.formatTime=function(e,t,i){i=i||{},i=$.extend({},$.timepicker._defaults,i),t=$.extend({hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null},t);var s=e,a=i.amNames[0],n=parseInt(t.hour,10);return n>11&&(a=i.pmNames[0]),s=s.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(e){switch(e){case"HH":return("0"+n).slice(-2);case"H":return n;case"hh":return("0"+convert24to12(n)).slice(-2);case"h":return convert24to12(n);case"mm":return("0"+t.minute).slice(-2);case"m":return t.minute;case"ss":return("0"+t.second).slice(-2);case"s":return t.second;case"l":return("00"+t.millisec).slice(-3);case"c":return("00"+t.microsec).slice(-3);case"z":return $.timepicker.timezoneOffsetString(null===t.timezone?i.timezone:t.timezone,!1);case"Z":return $.timepicker.timezoneOffsetString(null===t.timezone?i.timezone:t.timezone,!0);case"T":return a.charAt(0).toUpperCase();case"TT":return a.toUpperCase();case"t":return a.charAt(0).toLowerCase();case"tt":return a.toLowerCase();default:return e.replace(/'/g,"")}})},$.datepicker._base_selectDate=$.datepicker._selectDate,$.datepicker._selectDate=function(e,t){var i,s=this._getInst($(e)[0]),a=this._get(s,"timepicker");a&&s.settings.showTimepicker?(a._limitMinMaxDateTime(s,!0),i=s.inline,s.inline=s.stay_open=!0,this._base_selectDate(e,t),s.inline=i,s.stay_open=!1,this._notifyChange(s),this._updateDatepicker(s)):this._base_selectDate(e,t)},$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker,$.datepicker._updateDatepicker=function(e){var t=e.input[0];if(!($.datepicker._curInst&&$.datepicker._curInst!==e&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!==t||"boolean"==typeof e.stay_open&&e.stay_open!==!1)){this._base_updateDatepicker(e);var i=this._get(e,"timepicker");i&&i._addTimePicker(e)}},$.datepicker._base_doKeyPress=$.datepicker._doKeyPress,$.datepicker._doKeyPress=function(e){var t=$.datepicker._getInst(e.target),i=$.datepicker._get(t,"timepicker");if(i&&$.datepicker._get(t,"constrainInput")){var s=i.support.ampm,a=null!==i._defaults.showTimezone?i._defaults.showTimezone:i.support.timezone,n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=(""+i._defaults.timeFormat).replace(/[hms]/g,"").replace(/TT/g,s?"APM":"").replace(/Tt/g,s?"AaPpMm":"").replace(/tT/g,s?"AaPpMm":"").replace(/T/g,s?"AP":"").replace(/tt/g,s?"apm":"").replace(/t/g,s?"ap":"")+" "+i._defaults.separator+i._defaults.timeSuffix+(a?i._defaults.timezoneList.join(""):"")+i._defaults.amNames.join("")+i._defaults.pmNames.join("")+n,l=String.fromCharCode(void 0===e.charCode?e.keyCode:e.charCode);return e.ctrlKey||" ">l||!n||r.indexOf(l)>-1}return $.datepicker._base_doKeyPress(e)},$.datepicker._base_updateAlternate=$.datepicker._updateAlternate,$.datepicker._updateAlternate=function(e){var t=this._get(e,"timepicker");if(t){var i=t._defaults.altField;if(i){var s=(t._defaults.altFormat||t._defaults.dateFormat,this._getDate(e)),a=$.datepicker._getFormatConfig(e),n="",r=t._defaults.altSeparator?t._defaults.altSeparator:t._defaults.separator,l=t._defaults.altTimeSuffix?t._defaults.altTimeSuffix:t._defaults.timeSuffix,o=null!==t._defaults.altTimeFormat?t._defaults.altTimeFormat:t._defaults.timeFormat;n+=$.datepicker.formatTime(o,t,t._defaults)+l,t._defaults.timeOnly||t._defaults.altFieldTimeOnly||null===s||(n=t._defaults.altFormat?$.datepicker.formatDate(t._defaults.altFormat,s,a)+r+n:t.formattedDate+r+n),$(i).val(e.input.val()?n:"")}}else $.datepicker._base_updateAlternate(e)},$.datepicker._base_doKeyUp=$.datepicker._doKeyUp,$.datepicker._doKeyUp=function(e){var t=$.datepicker._getInst(e.target),i=$.datepicker._get(t,"timepicker");if(i&&i._defaults.timeOnly&&t.input.val()!==t.lastVal)try{$.datepicker._updateDatepicker(t)}catch(s){$.timepicker.log(s)}return $.datepicker._base_doKeyUp(e)},$.datepicker._base_gotoToday=$.datepicker._gotoToday,$.datepicker._gotoToday=function(e){var t=this._getInst($(e)[0]);t.dpDiv,this._base_gotoToday(e);var i=this._get(t,"timepicker");selectLocalTimezone(i);var s=new Date;this._setTime(t,s),this._setDate(t,s)},$.datepicker._disableTimepickerDatepicker=function(e){var t=this._getInst(e);if(t){var i=this._get(t,"timepicker");$(e).datepicker("getDate"),i&&(t.settings.showTimepicker=!1,i._defaults.showTimepicker=!1,i._updateDateTime(t))}},$.datepicker._enableTimepickerDatepicker=function(e){var t=this._getInst(e);if(t){var i=this._get(t,"timepicker");$(e).datepicker("getDate"),i&&(t.settings.showTimepicker=!0,i._defaults.showTimepicker=!0,i._addTimePicker(t),i._updateDateTime(t))}},$.datepicker._setTime=function(e,t){var i=this._get(e,"timepicker");if(i){var s=i._defaults;
i.hour=t?t.getHours():s.hour,i.minute=t?t.getMinutes():s.minute,i.second=t?t.getSeconds():s.second,i.millisec=t?t.getMilliseconds():s.millisec,i.microsec=t?t.getMicroseconds():s.microsec,i._limitMinMaxDateTime(e,!0),i._onTimeChange(),i._updateDateTime(e)}},$.datepicker._setTimeDatepicker=function(e,t,i){var s=this._getInst(e);if(s){var a=this._get(s,"timepicker");if(a){this._setDateFromField(s);var n;t&&("string"==typeof t?(a._parseTime(t,i),n=new Date,n.setHours(a.hour,a.minute,a.second,a.millisec),n.setMicroseconds(a.microsec)):(n=new Date(t.getTime()),n.setMicroseconds(t.getMicroseconds())),"Invalid Date"==""+n&&(n=void 0),this._setTime(s,n))}}},$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker,$.datepicker._setDateDatepicker=function(e,t){var i=this._getInst(e),s=t;if(i){"string"==typeof t&&(s=new Date(t),s.getTime()||(this._base_setDateDatepicker.apply(this,arguments),s=$(e).datepicker("getDate")));var a,n=this._get(i,"timepicker");s instanceof Date?(a=new Date(s.getTime()),a.setMicroseconds(s.getMicroseconds())):a=s,n&&a&&(n.support.timezone||null!==n._defaults.timezone||(n.timezone=-1*a.getTimezoneOffset()),s=$.timepicker.timezoneAdjust(s,n.timezone),a=$.timepicker.timezoneAdjust(a,n.timezone)),this._updateDatepicker(i),this._base_setDateDatepicker.apply(this,arguments),this._setTimeDatepicker(e,a,!0)}},$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker,$.datepicker._getDateDatepicker=function(e,t){var i=this._getInst(e);if(i){var s=this._get(i,"timepicker");if(s){void 0===i.lastVal&&this._setDateFromField(i,t);var a=this._getDate(i);return a&&s._parseTime($(e).val(),s.timeOnly)&&(a.setHours(s.hour,s.minute,s.second,s.millisec),a.setMicroseconds(s.microsec),null!=s.timezone&&(s.support.timezone||null!==s._defaults.timezone||(s.timezone=-1*a.getTimezoneOffset()),a=$.timepicker.timezoneAdjust(a,s.timezone))),a}return this._base_getDateDatepicker(e,t)}},$.datepicker._base_parseDate=$.datepicker.parseDate,$.datepicker.parseDate=function(e,t,i){var s;try{s=this._base_parseDate(e,t,i)}catch(a){if(!(a.indexOf(":")>=0))throw a;s=this._base_parseDate(e,t.substring(0,t.length-(a.length-a.indexOf(":")-2)),i),$.timepicker.log("Error parsing the date string: "+a+"\ndate string = "+t+"\ndate format = "+e)}return s},$.datepicker._base_formatDate=$.datepicker._formatDate,$.datepicker._formatDate=function(e){var t=this._get(e,"timepicker");return t?(t._updateDateTime(e),t.$input.val()):this._base_formatDate(e)},$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker,$.datepicker._optionDatepicker=function(e,t,i){var s,a=this._getInst(e);if(!a)return null;var n=this._get(a,"timepicker");if(n){var r,l,o,c,u=null,m=null,d=null,h=n._defaults.evnts,p={};if("string"==typeof t){if("minDate"===t||"minDateTime"===t)u=i;else if("maxDate"===t||"maxDateTime"===t)m=i;else if("onSelect"===t)d=i;else if(h.hasOwnProperty(t)){if(i===void 0)return h[t];p[t]=i,s={}}}else if("object"==typeof t){t.minDate?u=t.minDate:t.minDateTime?u=t.minDateTime:t.maxDate?m=t.maxDate:t.maxDateTime&&(m=t.maxDateTime);for(r in h)h.hasOwnProperty(r)&&t[r]&&(p[r]=t[r])}for(r in p)p.hasOwnProperty(r)&&(h[r]=p[r],s||(s=$.extend({},t)),delete s[r]);if(s&&isEmptyObject(s))return;if(u?(u=0===u?new Date:new Date(u),n._defaults.minDate=u,n._defaults.minDateTime=u):m?(m=0===m?new Date:new Date(m),n._defaults.maxDate=m,n._defaults.maxDateTime=m):d&&(n._defaults.onSelect=d),u||m)return c=$(e),o=c.datetimepicker("getDate"),l=this._base_optionDatepicker.call($.datepicker,e,s||t,i),c.datetimepicker("setDate",o),l}return void 0===i?this._base_optionDatepicker.call($.datepicker,e,t):this._base_optionDatepicker.call($.datepicker,e,s||t,i)};var isEmptyObject=function(e){var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0},extendRemove=function(e,t){$.extend(e,t);for(var i in t)(null===t[i]||void 0===t[i])&&(e[i]=t[i]);return e},detectSupport=function(e){var t=e.replace(/'.*?'/g,"").toLowerCase(),i=function(e,t){return-1!==e.indexOf(t)?!0:!1};return{hour:i(t,"h"),minute:i(t,"m"),second:i(t,"s"),millisec:i(t,"l"),microsec:i(t,"c"),timezone:i(t,"z"),ampm:i(t,"t")&&i(e,"h"),iso8601:i(e,"Z")}},convert24to12=function(e){return e%=12,0===e&&(e=12),e+""},computeEffectiveSetting=function(e,t){return e&&e[t]?e[t]:$.timepicker._defaults[t]},splitDateTime=function(e,t){var i=computeEffectiveSetting(t,"separator"),s=computeEffectiveSetting(t,"timeFormat"),a=s.split(i),n=a.length,r=e.split(i),l=r.length;return l>1?{dateString:r.splice(0,l-n).join(i),timeString:r.splice(0,n).join(i)}:{dateString:e,timeString:""}},parseDateTimeInternal=function(e,t,i,s,a){var n,r,l;if(r=splitDateTime(i,a),n=$.datepicker._base_parseDate(e,r.dateString,s),""===r.timeString)return{date:n};if(l=$.datepicker.parseTime(t,r.timeString,a),!l)throw"Wrong time format";return{date:n,timeObj:l}},selectLocalTimezone=function(e,t){if(e&&e.timezone_select){var i=t||new Date;e.timezone_select.val(-i.getTimezoneOffset())}};$.timepicker=new Timepicker,$.timepicker.timezoneOffsetString=function(e,t){if(isNaN(e)||e>840||-720>e)return e;var i=e,s=i%60,a=(i-s)/60,n=t?":":"",r=(i>=0?"+":"-")+("0"+Math.abs(a)).slice(-2)+n+("0"+Math.abs(s)).slice(-2);return"+00:00"===r?"Z":r},$.timepicker.timezoneOffsetNumber=function(e){var t=(""+e).replace(":","");return"Z"===t.toUpperCase()?0:/^(\-|\+)\d{4}$/.test(t)?("-"===t.substr(0,1)?-1:1)*(60*parseInt(t.substr(1,2),10)+parseInt(t.substr(3,2),10)):e},$.timepicker.timezoneAdjust=function(e,t){var i=$.timepicker.timezoneOffsetNumber(t);return isNaN(i)||e.setMinutes(e.getMinutes()+-e.getTimezoneOffset()-i),e},$.timepicker.timeRange=function(e,t,i){return $.timepicker.handleRange("timepicker",e,t,i)},$.timepicker.datetimeRange=function(e,t,i){$.timepicker.handleRange("datetimepicker",e,t,i)},$.timepicker.dateRange=function(e,t,i){$.timepicker.handleRange("datepicker",e,t,i)},$.timepicker.handleRange=function(e,t,i,s){function a(a,n){var r=t[e]("getDate"),l=i[e]("getDate"),o=a[e]("getDate");if(null!==r){var c=new Date(r.getTime()),u=new Date(r.getTime());c.setMilliseconds(c.getMilliseconds()+s.minInterval),u.setMilliseconds(u.getMilliseconds()+s.maxInterval),s.minInterval>0&&c>l?i[e]("setDate",c):s.maxInterval>0&&l>u?i[e]("setDate",u):r>l&&n[e]("setDate",o)}}function n(t,i,a){if(t.val()){var n=t[e].call(t,"getDate");null!==n&&s.minInterval>0&&("minDate"===a&&n.setMilliseconds(n.getMilliseconds()+s.minInterval),"maxDate"===a&&n.setMilliseconds(n.getMilliseconds()-s.minInterval)),n.getTime&&i[e].call(i,"option",a,n)}}s=$.extend({},{minInterval:0,maxInterval:0,start:{},end:{}},s);var r=!1;return"timepicker"===e&&(r=!0,e="datetimepicker"),$.fn[e].call(t,$.extend({timeOnly:r,onClose:function(){a($(this),i)},onSelect:function(){n($(this),i,"minDate")}},s,s.start)),$.fn[e].call(i,$.extend({timeOnly:r,onClose:function(){a($(this),t)},onSelect:function(){n($(this),t,"maxDate")}},s,s.end)),a(t,i),n(t,i,"minDate"),n(i,t,"maxDate"),$([t.get(0),i.get(0)])},$.timepicker.log=function(){window.console&&window.console.log.apply(window.console,Array.prototype.slice.call(arguments))},$.timepicker._util={_extendRemove:extendRemove,_isEmptyObject:isEmptyObject,_convert24to12:convert24to12,_detectSupport:detectSupport,_selectLocalTimezone:selectLocalTimezone,_computeEffectiveSetting:computeEffectiveSetting,_splitDateTime:splitDateTime,_parseDateTimeInternal:parseDateTimeInternal},Date.prototype.getMicroseconds||(Date.prototype.microseconds=0,Date.prototype.getMicroseconds=function(){return this.microseconds},Date.prototype.setMicroseconds=function(e){return this.setMilliseconds(this.getMilliseconds()+Math.floor(e/1e3)),this.microseconds=e%1e3,this}),$.timepicker.version="1.5.0"}})(jQuery);

