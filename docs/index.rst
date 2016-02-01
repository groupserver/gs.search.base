=====================
:mod:`gs.search.base`
=====================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The core search interface for GroupServer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:Author: `Michael JasonSmith`_
:Contact: Michael JasonSmith <mpj17@onlinegroups.net>
:Date: 2016-02-01
:Organization: `GroupServer.org`_
:Copyright: This document is licensed under a
  `Creative Commons Attribution-Share Alike 4.0 International License`_
  by `OnlineGroups.net`_.

..  _Creative Commons Attribution-Share Alike 4.0 International License:
    http://creativecommons.org/licenses/by-sa/4.0/

Contents:

.. toctree::
   :maxdepth: 2

   javascript
   html
   ajax
   HISTORY

GroupServer_ uses a standard widget to provide search. By
standardising the widget the interface is more consistent for the
users, the pages are faster because fewer requests have to be
made for the JavaScript code, and coding errors are reduced. The
search code is split in to three main components.

#. This product supplies a :doc:`javascript` class that is used
   to provide some standard behaviour for the different search
   interfaces.

#. Each subsystem that provides search results produces a
   skeleton of :doc:`html` that works with this module to display
   the standard search-widget.

#. The same subsystems produce an :doc:`ajax` that conforms to
   the API outlined here.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

Resources
=========

- Code repository: https://github.com/groupserver/gs.search.base/
- Questions and comments to
  http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. _GroupServer.org: http://groupserver.org/
.. _Michael JasonSmith: http://groupserver.org/p/mpj17
.. _GroupServer: http://groupserver.org/
.. _OnlineGroups.Net: http://onlinegroups.net/
