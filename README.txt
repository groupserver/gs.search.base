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

Search Results
--------------

After the `JavaScript`_ makes the AJAX-call the results will be
displayed in the ``.gs-search-results`` element. To be processed
properly the results have to conform to the following HTML:

* Result: ``.result``

  + Keywords [#keywords]_: ``.keyword``

The result may also be marked with the optional ``.sticky`` class [#sticky]_.

JavaScript
==========

The `behaviour`_ of the search-widget is defined by the JavaScript provided
by this product. Other products are responsible for the `creation`_ of the
individual search-widgets.

Behaviour
---------

The JavaScript binds event handlers to the three buttons in the interface:
*Search*, *Next*, and *Previous* (see `HTML`). Whenever these three buttons
are pressed:

#. The current results are hidden,
#. The loading message is shown, and
#. A ``POST`` request is made to the `AJAX Page`_.

Once the request returns the loading message is hidden, and the results are
shown.

Both the *Next* and *Previous* buttons modify an internal counter, that
keeps track of the current *index* into the search-results, which is passed
to the `AJAX page`_. It is always a positive number; if it is 0 the
*Previous* button is disabled, while the *Next* button is disabled when the
number of search-results is less than the ``limit`` that is set during
`creation`_.

Creation
--------

The JavaScript code to power the search-system is provided by the resource
``/++resource++search-20120601.js``. It provides a class that has the
following prototype::
  
  GSSearch(widgetId, ajaxPage, offset, limit, additionalQuery, advancedSearchId)

``widgetId``:
   The `HTML`_ identifier of the search widget.

``ajaxPage``:
  The page to query to get the AJAX results (see `AJAX Page`_ below).

``offset``: 
  The *initial* offset into the search.

``limit``:
  The number of results to show.

``additionalQuery``:
  Extra items to pass to the ``ajaxPage`` as part of the query. Set it to
  ``{}`` if there are none.

``advancedSearchId``: 
  The *Advanced Search* link. This will be updated to reflect the current
  search.

One public method is provided by the class: ``load`` to make a query and
load the results. An example of a typical call would be as follows (taken
from ``gs.group.messages.posts``)::

  var s = GSSearch('#gs-group-messages-posts-search', 
                   'gs-group-messages-posts-ajax.html', 
                   0, 12, {}, null);
  s.load();

AJAX Page
=========

The AJAX page is provided by products **other** than this one. The
`JavaScript`_ makes a ``POST`` query passing the following values:

``i``:
  The *index* (*offset*) into the search-results.

``l``:
  The number of results to return (the *length*).

``s``:
  The *search* text that is set .

The AJAX pages **must** conform to this API. Other arguments to the AJAX
page can be passed in as the ``additionalQuery`` argument during the
`creation`_ of the search-widget.

.. [#keywords] The keywords are optional.
.. [#sticky] The sticky results are shown first. They need to be known for the
	     calculation for the *Next* button.

.. _GroupServer: http://groupserver.org/
.. _OnlineGroups.Net: http://onlinegroups.net/

