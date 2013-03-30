/*

Copyright (c) 2013 Feroz Khan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

/** 
 * load required resources i.e, JavaScript, CSS
 * @param   JSON object
 **/
var loadResources = function(){

    if( arguments.length < 1 ) return;
    var required_resources = arguments[0];

    for(var resource_type in required_resources){
        for(var resource in required_resources[resource_type]){
            resource_path = resource_type + '/' + required_resources[resource_type][resource] + resourceExt[resource_type];
            if ( resource_type == 'js' ){
                loadJS(resource_path);
            }
            if( resource_type == 'css' ){
                loadCSS(resource_path);
            }
        }
    }
}

/**
 * load javascript
 * @param   resource
 */
var loadJS = function(resource){
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  =  resource + noCache();
    document.body.appendChild(script); 
}

/**
 * load css
 * @param   resource
 */
var loadCSS = function(resource){
    var head   = document.head || document.getElementsByTagName('head')[0];
    var style  = document.createElement('link');
    style.type = 'text/css';
    style.rel  = 'stylesheet';
    style.href = resource + noCache();
    head.appendChild(style);
}

var noCache = function(){
    return '?t=' + new Date().getTime();
}

var resourceExt = {
    'js'  : '.js',
    'css' : '.css'
}
