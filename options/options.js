// This file provides the JavaScript logic for the AI Blocker Settings to add user-selected blacklist sites to Chrome storage for filtering. 

document.addEventListener("DOMContentLoaded", function() {
    // Find the save button element
    const save = document.getElementById('saveButton');
    const blockTextArea = document.getElementById('block'); // Element for block list input

    if (save && blockTextArea) {
        // Event listener to save the block list
        save.addEventListener('click', function() {
            const blockList = blockTextArea.value.split('\n').map(site => site.trim()).filter(site => site);
            console.log('Event listener runs with blockList:', blockList);
            // Save the list to Chrome Storage
            chrome.storage.sync.set({blockList: blockList}, function() {
                alert('Block List saved!');
            });
        });
    } else {
        console.warn('Save button or block list text area not found in the DOM.');
    }

    // Load saved block list on page load
    chrome.storage.sync.get('blockList', function(data) {
        if (data.blockList) {
            blockTextArea.value = data.blockList.join('\n');
        }
    });
});
