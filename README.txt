Introduction
============

The core `GroupServer`_  search code.

HTML
====

The *search widget* conforms to the follow layout, with the items
having the following selectors.

* Search widget: ``.gs-search``

  + Text-entry: ``.gs-search-entry``

    - Search entry: ``input[type="text"]``  
    - Button: ``button``

  + Loading: ``.gs-search-loading``

  + Results: ``.gs-search-results``

  + Toolbar: ``.gs-search-toolbar``

    - Next: ``.gs-search-toolbar-next``
    - Previous: ``.gs-search-toolbar-previous``

JavaScript
==========

The JavaScript initializer looks like the following::
  
  GSSearch.init(widgetId, ajaxPage, offset, limit, additionalQuery)

``widgetId``:
   The `HTML`_ identifier of the search widget.

``ajaxPage``:
  The page to query to get the AJAX results.

``offset``: 
  The offset into the search (passed to the ``ajaxPage`` as the ``i=`` query).

``limit``:
  The number of results to show (passed to the ``ajaxPage`` as the ``l=`` 
  query).

``additionalQuery``:
  Extra items to pass to the ``ajaxPage`` as part of the query.

.. _GroupServer: http://groupserver.org/
.. _OnlineGroups.Net: http://onlinegroups.net/

