Introduction
============

The core `GroupServer`_  search code is split in to three main components. 

#. Each subsystem provides an `AJAX Page`_ that conforms to the API
   outlined here.

#. The same subsystems provide a skeleton of `HTML`_ that is used to
   display the standard search-widget.

#. Finally, this product supplies a `JavaScript`_ class that is used to
   provide some standard behaviour for the different search interfaces.

By having one JavaScript resource fewer requests have to be made by the
browser, and the errors in the code are reduced.

AJAX Page
=========

The AJAX page is provided by products **other** than this one. When the
user interacts with the `HTML`_ the `JavaScript`_ makes a ``POST`` query
passing the following values:

``i``:
  The *index* (or *offset*) into the search-results.

``l``:
  The number of results to return (the *length*).

``s``:
  The text to *search* for [#search]_.

The AJAX pages **must** conform to this API. Other arguments to the AJAX
page can be passed in as the ``additionalQuery`` argument during the
`creation`_ of the search-widget.

The HTML returned by the page *must* contain `search results`_ that conform
to the standard markup.

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

During the `creation`_ of the search widget `jQuery.UI`_ is used to add
some functionality to the items.

Search Results
--------------

The `JavaScript`_ calls the `AJAX page`_. The results returned by the page
will be displayed in the ``.gs-search-results`` element. To be processed
properly the results have to conform to the following HTML:

* Result: ``.gs-search-result``

  + Keywords [#keywords]_: ``.gs-search-keyword``

The result may also be marked with the optional ``.gs-search-sticky`` class [#sticky]_.

JavaScript
==========

The `behaviour`_ of the search-widget is defined by the JavaScript provided
by this product. Other products are responsible for the `creation`_ of the
individual search-widgets.

Behaviour
---------

The JavaScript binds event handlers to the three buttons in the interface:
*Search*, *Next*, and *Previous* (see `HTML`_). Whenever these three
buttons are pressed, or the `load`_ method is called, the following occurs:

#. The current results are hidden,
#. The loading message is shown, and
#. A ``POST`` request is made to the `AJAX Page`_.

Once the request returns the loading message is hidden, the results are
shown, and an `event`_ is raised.

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
  
  GSSearch(widget, ajaxPage, offset, limit, additionalQuery, advancedSearchId)

``widget``:
   The selector for the `HTML`_ widget (normally an ID-selector).

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

Methods
-------

There are two public methods: `load`_ and `results_shown`_.

``load``
~~~~~~~~

The ``load`` method makes a query and load the results. The results are not
loaded during the `creation`_ of the widget because in most circumstances
(such as with the Posts [#posts]_ and Files [#files]_ tabs on the Group
page) the results do not need to be loaded when the widget is created.

``results_shown``
~~~~~~~~~~~~~~~~~

The ``results_shown`` method returns ``true`` if the results have been
loaded, and ``false`` otherwise.

Event
-----

After the search-results have been loaded the search-widget will trigger a
``resultsloaded`` event. External systems may ``bind`` to this event to add
functionality. For convenience [#convenience]_ a constant for this string,
``RESULTS_LOADED_EVENT``, is exported by the class.

.. [#search] If the `AJAX page`_ does not support searching then the
             `HTML`_ should be modified so the search-button is within a
             ``div`` element with the ``display:none;`` style set.
.. [#keywords] The keywords are optional.
.. [#sticky] The sticky results are shown first. They need to be known for the
	     calculation for the *Next* button.
.. [#posts] See ``gs.group.messages.posts``.
.. [#files] See ``gs.group.messages.files``.
.. [#convenience] Convenience, and the fact that I prefer constants to strings.
.. _GroupServer: http://groupserver.org/
.. _OnlineGroups.Net: http://onlinegroups.net/
.. _jQuery.UI: http://jqueryui.com/
