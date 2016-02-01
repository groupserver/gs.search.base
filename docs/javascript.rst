JavaScript
==========

This product provides a JavaScript module as a Zope_ `browser
resource`_. Any Zope or Plone_ project should be able to use this
product by placing the following line in a page template:

.. code-block:: xml

  <script type="text/javascript"
          src="/++resource++gs-search-base-js-20160201.js"
          defer="true"> </script>

Users of other systems are invited to copy the file
``gs/search/base/browser/javascript/search.js`` out of this
product.

A minified version of the script is available, too:

.. code-block:: xml

  <script type="text/javascript"
          src="/++resource++gs-search-base-js-min-20160201.js"
          defer="true"> </script>

.. _api:

JavaScript API
--------------

The API is provided by the :js:class:`GSSearch` class.

.. js:class:: GSSearch(widget, ajaxPage, offset, limit, additionalQuery, advancedSearchId)

  :param string widget: The selector for the :doc:`html` widget
                        (normally an ID-selector).
  :param string ajaxPage: The page to query to get the AJAX
                          results (see :doc:`ajax`).
  :param int offset: The *initial* offset into the search.
  :param int limit: The number of results to show.
  :param object additionalQuery: Extra items to pass to the
                                 ``ajaxPage`` as part of the
                                 query. Set it to ``{}`` if there
                                 are none.
  :param object advancedSearchId: The *Advanced Search*
                                  link. This will be updated to
                                  reflect the current search.

  .. js:function:: load()

     The :js:func:`load` method makes a query and load the
     results. The results are not loaded during the creation of
     the widget because in many circumstances (such as with the
     Posts [#posts]_ tab with GroupServer_ groups) the results do
     not need to be loaded when the widget is created.

  .. js:function:: results_shown()

     The :js:func:`results_shown` method returns ``true`` if the
     results have been loaded, and ``false`` otherwise.

Behaviour
---------

The JavaScript binds event handlers to the three buttons in the
interface: *Search*, *Next*, and *Previous* (see
:doc:`html`). Whenever these three buttons are pressed, or the
load_ method is called, the following occurs:

#. The current results are hidden,
#. The loading message is shown, and
#. A ``POST`` request is made to the :doc:`ajax`.

Once the request returns the loading message is hidden, the
results are shown, and an event_ is raised.

Both the *Next* and *Previous* buttons modify an internal
counter, that keeps track of the current *index* into the
search-results, which is passed to the :doc:`ajax`. It is always
a positive number; if it is 0 the *Previous* button is disabled,
while the *Next* button is disabled when the number of
search-results is less than the ``limit`` that is set during
creation.

There are **two** cases of no results.

#. The user searches for something, but nothing matched the
   search. In this case the :doc:`html` with the
   ``gs-search-failed`` class will be shown.

#. There is nothing to search. In this case the HTML marked with
   the ``gs-search-empty`` class will be shown, and the
   search-entry will be hidden. It is good practice to *mute*
   this HTML, because this is not an error state.

The system determines the difference between the two cases by
looking at the search-entry: if it has text and the :doc:`ajax`
returns nothing then it must be the first case; else it the
second.

Event
-----

After the search-results have been loaded the search-widget will
trigger a ``resultsloaded`` event. External systems may ``bind``
to this event to add functionality. For convenience
[#convenience]_ a constant for this string,
``RESULTS_LOADED_EVENT``, is exported by the class.

.. _browser resource: http://docs.zope.org/zope.browserresource/
.. _Plone: http://plone.org
.. _Zope: http://zope.org/

.. [#posts] See ``gs.group.messages.posts``
            <https://github.com/groupserver/gs.group.messages.posts/>

.. [#convenience] Convenience, and the fact that I prefer
                  constants to strings.
.. _GroupServer: http://groupserver.org/
