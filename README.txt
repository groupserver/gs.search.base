==================
``gs.search.base``
==================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The core search interface for GroupServer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:Author: `Michael JasonSmith`_
:Contact: Michael JasonSmith <mpj17@onlinegroups.net>
:Date: 2013-01-15
:Organization: `GroupServer.org`_
:Copyright: This document is licensed under a
  `Creative Commons Attribution-Share Alike 3.0 New Zealand License`_
  by `OnlineGroups.Net`_.


Introduction
============

GroupServer_ uses a standard widget to provide search. By standardising the
widget the interface is more consistent for the users, the pages are faster
because fewer requests have to be made for the JavaScript code, and coding
errors are reduced. The search code is split in to three main components.

#. This product supplies a JavaScript_ class that is used to provide some
   standard behaviour for the different search interfaces.

#. Each subsystem that provides search results produces a skeleton of HTML_
   that works with this module to display the standard search-widget.

#. The same subsystems produce an `AJAX Page`_ that conforms to the API
   outlined here.

JavaScript
==========

The JavaScript resource_ defined by this product is loaded by other modules
during the creation_ of the individual search-widgets. This system then
controls the behaviour_ of the search-widget. Two public methods_ are
provided to allow control the search widget by external products.

Resource
--------

This product provides a JavaScript module as a Zope_ `browser
resource`_. Any Zope or Plone_ project should be able to use this product
by placing the following line in a page template::

  <script type="text/javascript"
          src="/++resource++gs-search-base-js-20121217.js"
          defer="true"> </script>

Users of other systems are invited to copy the file
``gs/search/base/browser/javascript/search.js`` out of this product.

A minified version of the script is available, too::

  <script type="text/javascript"
          src="/++resource++gs-search-base-js-min-20121217.js"
          defer="true"> </script>

Creation
--------

To create a search widget call the following::

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

Behaviour
---------

The JavaScript binds event handlers to the three buttons in the interface:
*Search*, *Next*, and *Previous* (see HTML_). Whenever these three buttons
are pressed, or the load_ method is called, the following occurs:

#. The current results are hidden,
#. The loading message is shown, and
#. A ``POST`` request is made to the `AJAX Page`_.

Once the request returns the loading message is hidden, the results are
shown, and an event_ is raised.

Both the *Next* and *Previous* buttons modify an internal counter, that
keeps track of the current *index* into the search-results, which is passed
to the `AJAX page`_. It is always a positive number; if it is 0 the
*Previous* button is disabled, while the *Next* button is disabled when the
number of search-results is less than the ``limit`` that is set during
creation_.

Methods
-------

There are two public methods: load_ and `results_shown`_.

``load``
~~~~~~~~

The ``load`` method makes a query and load the results. The results are not
loaded during the creation_ of the widget because in many circumstances
(such as with the Posts [#posts]_ tab with GroupServer_ groups) the results
do not need to be loaded when the widget is created.

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

HTML
====

The various subsystems that wish to support the *search widget* must
product HTML that conforms to the following structure:

* Search widget: ``.gs-search``

  + Text-entry: ``.gs-search-entry``

    - Search entry: ``input``
    - Button: ``button``

  + Loading: ``.gs-search-loading``

  + Results: ``.gs-search-results``

  + Toolbar: ``.gs-search-toolbar``

    - Next: ``.gs-search-toolbar-next``
    - Previous: ``.gs-search-toolbar-previous``

Below is a typical layout for a search widget. In addition to the classes
above, some classes used by Bootstrap_ are shown, as well as WAI-ARIA
roles. Neither is necessary, but both work with the search widget::

  <div class="gs-search">
    <div class="gs-search-entry search input-append">
      <input type="search" name="s" placeholder="Search&#8230;"
             autocomplete="on" value="" title="Search"/>
      <button id="gs-group-messages-topics-search-button"
              class="btn">Search</button>
    </div><!--gs-search-entry-->
    <p class="gs-search-loading" role="status">
      <img src="/++resource++anim/wait.gif"/> Loading&#8230;
    </p><!--gs-search-loading-->
    <div class="gs-search-results">
      &#160;
    </div><!--gs-search-results-->
    <div role="toolbar" class="btn-toolbar gs-search-toolbar">
      <button class="btn gs-search-toolbar-previous">Newer</button>
      <button class="btn gs-search-toolbar-next">Older</button>
    </div><!--gs-search-toolbar-->
  </div><!--gs-search-->



During the creation_ of the search widget jQuery_ is used to add some
functionality to the items.

Search Results
--------------

The JavaScript_ calls the `AJAX page`_. The results returned by the page
will be displayed in the ``.gs-search-results`` element. To be processed
properly the results have to conform to the following HTML:

* Result: ``.gs-search-result``

  + Keywords [#keywords]_: ``.gs-search-keyword``

The result may also be marked with the optional ``.gs-search-sticky`` class
[#sticky]_.

AJAX Page
=========

The AJAX page is provided by products **other** than this one. When the
user interacts with the HTML_ the JavaScript_ makes a ``POST`` query
passing the following values:

``i``:
  The *index* (or *offset*) into the search-results.

``l``:
  The number of results to return (the *length*).

``s``:
  The text to *search* for [#search]_.

:Note: The AJAX pages **must** conform to this API. Other arguments to the
       AJAX page can be passed in as the ``additionalQuery`` argument
       during the creation_ of the search-widget.

The HTML returned by the page *must* contain `search results`_ that conform
to the standard markup.

Resources
=========

- Code repository: https://source.iopen.net/groupserver/gs.search.base/
- Questions and comments to http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. [#posts] See ``gs.group.messages.posts``
            <https://source.iopen.net/groupserver/gs.group.messages.posts/>
.. [#convenience] Convenience, and the fact that I prefer constants to strings.
.. [#keywords] The keywords are optional.
.. [#sticky] The sticky results are shown first. They need to be known for the
             calculation for the *Next* button.
.. [#search] If the `AJAX page`_ does not support searching then the HTML_
             should be modified so the search-button is within a ``div``
             element with the ``display:none;`` style set.

.. _GroupServer.org: http://groupserver.org/
.. _Michael JasonSmith: http://groupserver.org/p/mpj17
.. _Creative Commons Attribution-Share Alike 3.0 New Zealand License:
   http://creativecommons.org/licenses/by-sa/3.0/nz/
.. _GroupServer: http://groupserver.org/
.. _browser resource: http://docs.zope.org/zope.browserresource/
.. _Plone: http://plone.org
.. _Zope: http://zope.org/
.. _OnlineGroups.Net: http://onlinegroups.net/
.. _jQuery: http://jquery.com/
.. _Bootstrap: http://twitter.github.com/bootstrap

..  LocalWords:  API additionalQuery jQuery advancedSearchId groupserver
..  LocalWords:  http jquery
