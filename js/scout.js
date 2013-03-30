

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
