AJAX Page
=========

The AJAX page is provided by products **other** than this
one. When the user interacts with the :doc:`html` the
:doc:`javascript` makes a ``POST`` query passing the following
values:

``i``:
  The *index* (or *offset*) into the search-results.

``l``:
  The number of results to return (the *length*).

``s``:
  The text to *search* for [#ajaxSearch]_.

:Note: The AJAX pages **must** conform to this API. Other
       arguments to the AJAX page can be passed in as the
       ``additionalQuery`` argument during the :ref:`creation
       <api>` of the search-widget.

The HTML returned by the page *must* contain :ref:`results` that
conform to the standard markup.

.. [#ajaxSearch] If the `AJAX page`_ does not support searching
             then the :doc:`html` should be modified so the
             search-button is within a ``div`` element with the
             ``display:none;`` style set.
