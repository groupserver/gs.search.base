HTML
====

The various subsystems that wish to support the *search widget*
must product HTML that conforms to the following structure:

* Search widget: ``.gs-search``

  + Text-entry: ``.gs-search-entry``

    - Search entry: ``input``
    - Button: ``button``

  + Loading: ``.gs-search-loading``

  + Results: ``.gs-search-results``

  + No results found: ``.gs-search-failed``

  + Nothing to search: ``.gs-search-empty``

  + Toolbar: ``.gs-search-toolbar``

    - Next: ``.gs-search-toolbar-next``
    - Previous: ``.gs-search-toolbar-previous``

Below is a typical layout for a search widget. In addition to the classes
above, some classes used by Bootstrap_ are shown, as well as WAI-ARIA
roles. Neither is necessary, but both work with the search widget:

.. code-block:: xml

  <div class="gs-search">
    <div class="gs-search-entry search input-append">
      <input type="search" name="s" placeholder="Search&#8230;"
             autocomplete="on" value="" title="Search"/>
      <button id="gs-group-messages-topics-search-button"
              class="btn">Search</button>
    </div><!--gs-search-entry-->
    <p class="gs-search-loading" role="status">
      <span data-icon="&#xe619;" aria-hidden="true" class="loading"> </span>
      Loading&#8230;
    </p><!--gs-search-loading-->
    <div class="gs-search-results">
      &#160;
    </div><!--gs-search-results-->
    <p class="gs-search-failed">
      No topics were found.
    </p><!--gs-search-failed-->
    <p class="gs-search-empty muted">
      There are no topics in this group.
    </p><!--gs-search-empty-->
    <div role="toolbar" class="btn-toolbar gs-search-toolbar">
      <button class="btn gs-search-toolbar-previous">Newer</button>
      <button class="btn gs-search-toolbar-next">Older</button>
    </div><!--gs-search-toolbar-->
  </div><!--gs-search-->

During the :ref:`creation <api>` of the search widget jQuery_ is
used to add some functionality to the items.

.. _results:

Search Results
--------------

The :doc:`javascript` calls the :doc:`ajax`. The results
returned by the page will be displayed in the
``.gs-search-results`` element. To be processed properly the
results have to conform to the following HTML:

* Result: ``.gs-search-result``

  + Keywords [#keywords]_: ``.gs-search-keyword``

The result may also be marked with the optional
``.gs-search-sticky`` class [#sticky]_.

.. [#keywords] The keywords are optional.

.. [#sticky] The sticky results are shown first. They need to be
             known for the calculation for the *Next* button.

.. _jQuery: http://jquery.com/
.. _Bootstrap: http://twitter.github.com/bootstrap
