

    function loadScripts(scripts) {    
        if (typeof scripts !== 'object') {
            alert('loadScripts(scripts) without array argument');
        }

        if (scripts.length === 0) {
            return;
        }

        // pull off 1st script in array
        var scriptDefinition = scripts.shift();

        // build script tag
        var headElement = document.getElementsByTagName("head")[0];
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = scriptDefinition.url;

        var scriptLoadCompletedFunction = function() {

            // execute callback function
            if (typeof scriptDefinition.callback === 'function') {
                scriptDefinition.callback.call(this, scriptDefinition);
            }

            // load the rest (tail of array) of the scripts
            setTimeout( function() {
                loadScripts(scripts);
            }, 500)
            
        };

        scriptElement.onload = scriptLoadCompletedFunction;

        // for ie
        scriptElement.onreadystatechange = function () {
            if (scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete') {
                scriptLoadCompletedFunction();
            }
        }

        // add script tag
        headElement.appendChild(scriptElement);
    }

    function loadHandler() {
        loadScripts([
            {
                name:'jQuery',
                url: 'libs/jquery/1.3/jquery.min.js'
            },
            {
                name:'app',
                url: 'libs/app.js'
            }
        ]);
    }
    window.addEventListener('load', loadHandler);
    

