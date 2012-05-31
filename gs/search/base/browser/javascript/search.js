// GroupServer JavaScript module for providing the Search mechanism
jQuery.noConflict();
GSSearch = function () {
    // Private variables
    // Widgets
    var widget = null;
    var searchInput = null;
    var searchButton = null;
    var loadingMessage = null;
    var results = null;
    var toolbar = null;
    var prevButton = null;
    var nextButton = null;

    var advancedSearch = null;

    // Search Info
    var ajaxPage = null;
    var offset = null;
    var limit = null;
    var additionalQuery = null;

    var searchText = '';
    var toolbarShown = true;
    var searchShown = true;

    // Constants
    var MAX_ITEMS = 48;
    var FADE_SPEED = 'slow';
    var FADE_METHOD = 'swing';
    
    // Private methods
    
    // Previous Button
    var init_prev_button = function() {
        prevButton.button({
            text: true,
            icons: { primary: 'ui-icon-carat-1-w', },
            disabled: true,
        });
        prevButton.click(handle_prev);
    };// init_prev_button
    var handle_prev = function(eventObject) {
        offset = offset - limit;
        if (offset < 0) {
            offset = 0
        }
        results.fadeOut(FADE_SPEED, FADE_METHOD, do_results_load);
    };//handle_prev
    
    // Next button
    var init_next_button = function() {
        nextButton.button({
            text: true,
            icons: { secondary: 'ui-icon-carat-1-e', },
            disabled: true,
        });
        nextButton.click(handle_next);
    };// init_next_button
    var handle_next = function(eventObject) {
        var nSticky = null;
        if (searchInput.val()) {
            offset = offset + limit;
        } else {
            nSticky = results.find('.sticky').length;
            offset = offset + limit - nSticky;
        }
        results.fadeOut(FADE_SPEED, FADE_METHOD, do_resultss_load);
    };//handle_next
    
    // Search Input
    var init_search_input = function () {
        searchInput.keypress(handle_search_input);
    };// init_search_input
    var handle_search_input = function(eventObject) {
        if (eventObject.which == 13) {
            searchButton.click();
        }
    };// handle_search_input
    // Search Button
    var init_search_button = function() {
        searchButton.button({
            text: false,
            icons: { primary: 'ui-icon-search', },
            disabled: false,
        });
        searchButton.click(handle_search)
    };//init_search_button
    var handle_search = function (eventObject) {
        searchText = searchInput.val();
        offset = 0;
        results.fadeOut(FADE_SPEED, FADE_METHOD, do_results_load);
    };//handle_search

    // Code to load the results in a pleasing way.
    var do_results_load = function () {
        // Function used by the buttons.
        loadingMessage.fadeIn(FADE_SPEED, FADE_METHOD, load_results);
    };//do_results_load
    var load_results = function() {
        // Actually load the results, making am AJAX request
        var data = {
            'i': offset,
            'l': limit,
            's': searchText,
        };
        var href = null;
        var query = null;
        var newHref = null;
        
        href = advancedSearch.attr('href');
        query = '&i='+offset+'&s='+searchText.replace(/ /, '+');
        newHref = href.replace(/&i.*$/, query);
        advancedSearch.attr('href', newHref);
        
        jQuery.post(ajaxPage, data, load_complete);
    };// load_results
    var load_complete = function(responseText, textStatus, request) {
        // Set the contents of the results-list to the respose.
        latestResults.html(responseText);
        // Hide the Loading message and show the results.
        loadingMessage.fadeOut(FADE_SPEED, FADE_METHOD, show_results);
    };// load_complete
    var show_results = function () {
        // Show the results list, and enable the buttons as required.
        var nResults = null;
        latestResultss.fadeIn(FADE_SPEED, FADE_METHOD);
        prevButton.button('option', 'disabled', offset <= 0);
        
        nResults = results.find('.result').length;
        nextButton.button('option', 'disabled', nResultss < limit);

        // Hmmmm
        init_keywords();
        
        if ((offset <= 0) && (nResults < limit) && toolbarShown) {
            toolbar.fadeOut('fast', FADE_METHOD);
            toolbarShown = false;
        } else if (((offset > 0) || (nResults >= limit)) && !toolbarShown) {
            toolbar.fadeIn('fast', FADE_METHOD);
            toolbarShown = true;
        }
	
	if ((nResults == 0) && searchShown) {
	    searchInput.fadeOut('fast', FADE_METHOD);
	    searchButton.fadeOut('fast', FADE_METHOD);
	    searchShown = false;
	} else if ((nResults > 0) && !searchShown) {
	    searchInput.fadeIn('fast', FADE_METHOD);
	    searchButton.fadeIn('fast', FADE_METHOD);
	    searchShown = true;
	}
    };//show_results

    var init_keywords = function () {
        var result = null;
        var keywords = null;
        keywords = results.find('.keyword');
        keywords.removeAttr('href').css("cursor","pointer");
        keywords.click(handle_keyword_click);
    };//init_keywords
    var handle_keyword_click = function(eventObject) {
        var searchText = jQuery(this).text();
        searchInput.val(searchText);
        searchButton.click();
    };//handle_keyword_click

    // Public methods and properties.
    return {
        init: function (widgetId, ajaxPage, offset, limit, additionalQuery) {
	    ajaxPage = ajaxPage;
            offset = offset;
            limit = limit;
	    additionalQuery = additionalQuery;
            
	    widget = jQuery(widgetId);

	    searchInput = widget.find('.gs-search-entry input[type="text"]');
            init_search_input();
	    searchButton = widget.find('.gs-search-entry button');
            init_search_button();

	    loadingMessage = widget.find('.gs-search-loading');
	    results = widget.find('.gs-search-results');

	    toolbar = widget.find('.gs-search-toolbar');
	    prevButton = widget.find('.gs-search-toolbar-previous');
            init_prev_button();
	    nextButton = widget.find('.gs-search-toolbar-next');
            init_next_button();

            load_results();
        },//init
    };
}(); // GSSearch
