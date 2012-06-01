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

The JavaScript class has the following prototype::
  
  GSSearch(widgetId, ajaxPage, offset, limit, additionalQuery, advancedSearchId)

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

``advancedSearchId``: 
  The *Advanced Search* link. This will be updated to reflect the current
  search.

One public method is provided by the class: ``load`` to make a query and
load the results. An example of a typical call would be as follows (taken
from ``gs.group.messages.posts``)::

  var s = GSSearch('#gs-group-messages-posts-search', 
                   'gs-group-messages-posts-ajax.html', 
                   0, 12, '', null);
  s.load();

.. [#keywords] The keywords are optional.
.. [#sticky] The sticky results are shown first. They need to be known for the
	     calculation for the *Next* button.

.. _GroupServer: http://groupserver.org/
.. _OnlineGroups.Net: http://onlinegroups.net/

