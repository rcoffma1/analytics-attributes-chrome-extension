// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var allLinks = [];
var visibleLinks = [];

// Display all visible links.
function showLinks() {
  var linksTable = document.getElementById('links');
  for (var i = 0; i < visibleLinks.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');
    col1.innerText = visibleLinks[i];
    col1.style.whiteSpace = 'nowrap';
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

// Add links to allLinks and visibleLinks, sort and show them.  send_attributes.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  showLinks();
  console.log('addListener');
});

// Set up event handlers and inject send_attributes.js into all frames in the active
// tab.
window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
      function(activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {file: 'send_attributes.js', allFrames: true});
      }
    );
  });
};
