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


var 
    /** 
     * load required resources i.e, JavaScript, CSS
     * @param   JSON object
     **/
    loadResources = function(){

        if( arguments.length < 1 ){
            throw("Error: loadResources method takes atleast 1 argument given 0");
        }else{
            if(!("object" === typeof(arguments[0]))){
                throw("Error: provide resources in this format { 'js': [ 'js1', 'js2' ], 'css': ['css1', 'css2'] }");
            }
        }

        if( arguments[1] ) {
            if(!("object" === typeof(arguments[1]))){
                throw("Error: provide caching settings in this format { 'js': true, 'css': true }");   
            }else{
                _caching = arguments[1];
            }
        }

        var required_resources = arguments[0];

        for(var resource_type in required_resources){
            for(var resource in required_resources[resource_type]){
                var resource_name = required_resources[resource_type][resource];

                if ( isLocalResource(resource_name) ) {
                    resource_path = resource_type + '/' + resource_name + resourceExt[resource_type];
                }else{
                    resource_path = resource_name;
                }

                if ( resource_type === 'js' ){
                    loadJS(resource_path);
                }
                if( resource_type === 'css' ){
                    loadCSS(resource_path);
                }
            }
        }
    },

    /**
     * load javascript
     * @param   resource
     */ 
    loadJS = function(resource){
        var script  = document.createElement('script');
        script.type = 'text/javascript';
        script.src  =  resource + fromCache(_caching['css']);
        document.body.appendChild(script); 
    },

    /**
     * load css
     * @param   resource
     */
    loadCSS = function(resource){
        var head   = document.head || document.getElementsByTagName('head')[0];
        var style  = document.createElement('link');
        style.type = 'text/css';
        style.rel  = 'stylesheet';
        style.href = resource + fromCache(_caching['js']);
        head.appendChild(style);
    },

    /**
     * check whether browser cache should utilize.
     */
    fromCache = function(cache){
        return !cache ? '?t=' + new Date().getTime() : '';
    },

    /**
     * check whether resource is local.
     */
    isLocalResource = function(resource_name){
        var _scheme = resource_name.split(":")[0];
        return (!( _scheme === 'http' || _scheme === 'https')) 
    },

    /**
     * default cache setting.
     * utilizing browser cache.
     */
    _caching = {
         'js'  : true
        ,'css' : true
    },

    /**
     * helper function
     * return resource extension
     */
    resourceExt = {
        'js'  : '.js',
        'css' : '.css'
    };
