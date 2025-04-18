// Global variables
let selectedElement = null;
let clipboard = null;
let isPreviewMode = false;
let isDragging = false;
let draggedElement = null;
let elementIdCounter = 0;
let undoStack = [];
let redoStack = [];

// Initialize the application
$(document).ready(function() {
  // Initialize sidebar navigation
  initSidebarNav();
  
  // Initialize drag and drop functionality
  initDragAndDrop();
  
  // Initialize style editor
  initStyleEditor();
  
  // Initialize context menu
  initContextMenu();
  
  // Initialize toolbar actions
  initToolbarActions();
  
  // Save canvas state for undo
  saveCanvasState();
});

// Initialize sidebar navigation
function initSidebarNav() {
  $('.sidebar-nav-item').on('click', function() {
    $('.sidebar-nav-item').removeClass('active');
    $(this).addClass('active');
    
    let section = $(this).data('section');
    $('.sidebar-section').removeClass('active');
    $(`#${section}-section`).addClass('active');
  });
  
  // Toggle property groups
  $('.property-group-title').on('click', function() {
    $(this).next('.property-content').slideToggle(200);
    $(this).find('i').toggleClass('collapsed');
  });
}

// Initialize drag and drop functionality
function initDragAndDrop() {
  // Make elements draggable
  $('.element-item').on('dragstart', function(e) {
    draggedElement = $(this).data('element');
    e.originalEvent.dataTransfer.setData('text/plain', draggedElement);
  });
  
  // Canvas drop target
  $('#design-canvas').on('dragover', function(e) {
    e.preventDefault();
    if (!isPreviewMode) {
      $(this).addClass('drop-highlight');
    }
  });
  
  $('#design-canvas').on('dragleave', function(e) {
    $(this).removeClass('drop-highlight');
  });
  
  // Handle drop
  $('#design-canvas').on('drop', function(e) {
    e.preventDefault();
    $(this).removeClass('drop-highlight');
    
    if (isPreviewMode) return;
    
    let elementType = e.originalEvent.dataTransfer.getData('text/plain');
    
    // If canvas is empty, remove placeholder
    if ($('#design-canvas').find('.dropped-element').length === 0) {
      $('.canvas-placeholder').hide();
    }
    
    // Create element based on type
    let newElement = createElementByType(elementType);
    
    // Append to canvas
    $('#design-canvas').append(newElement);
    
    // Select the newly created element
    selectElement(newElement);
    
    // Save canvas state for undo
    saveCanvasState();
    
    // Show success toast
    showToast('Element added successfully', 'success');
  });
  
  // Element selection
  $(document).on('click', '.dropped-element', function(e) {
    e.stopPropagation();
    if (isPreviewMode) return;
    
    selectElement($(this));
  });
  
  // Canvas click (deselect)
  $('#design-canvas').on('click', function(e) {
    if ($(e.target).is('#design-canvas')) {
      deselectElement();
    }
  });
  
  // Handle element actions
  $(document).on('click', '.element-action-btn', function(e) {
    e.stopPropagation();
    
    let action = $(this).data('action');
    let element = $(this).closest('.dropped-element');
    
    switch(action) {
      case 'delete':
        element.remove();
        deselectElement();
        saveCanvasState();
        showToast('Element deleted', 'success');
        break;
      case 'duplicate':
        let clone = element.clone(true);
        clone.attr('id', 'element-' + (++elementIdCounter));
        element.after(clone);
        selectElement(clone);
        saveCanvasState();
        showToast('Element duplicated', 'success');
        break;
      case 'edit':
        makeElementEditable(element);
        break;
    }
  });
}

// Create element by type
function createElementByType(type) {
  let newElement = $('<div class="dropped-element" draggable="true"></div>');
  let elementContent = $('<div class="element-content"></div>');
  let elementId = 'element-' + (++elementIdCounter);
  
  newElement.attr('id', elementId);
  newElement.attr('data-element-type', type);
  
  // Add element actions
  let elementActions = `
    <div class="element-actions">
      <button class="element-action-btn" data-action="edit"><i class="fas fa-edit"></i></button>
      <button class="element-action-btn" data-action="duplicate"><i class="fas fa-copy"></i></button>
      <button class="element-action-btn" data-action="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  `;
  
  newElement.append(elementActions);
  
  // Set content based on element type
  switch(type) {
    case 'div':
      elementContent.text('Division Container');
      elementContent.css({
        padding: '20px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd'
      });
      break;
    case 'section':
      elementContent.text('Section Container');
      elementContent.css({
        padding: '30px',
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd'
      });
      break;
    case 'container':
      elementContent.text('Bootstrap Container');
      elementContent.addClass('container');
      elementContent.css({
        padding: '20px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd'
      });
      break;
    case 'grid':
      elementContent.html(`
        <div class="row">
          <div class="col-md-6" style="padding: 15px; background-color: #f8f8f8; border: 1px solid #ddd;">Column 1</div>
          <div class="col-md-6" style="padding: 15px; background-color: #f8f8f8; border: 1px solid #ddd;">Column 2</div>
        </div>
      `);
      break;
    case 'form':
      elementContent.html(`
        <form>
          <div class="mb-3">
            <label for="exampleInput" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInput" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="exampleTextarea" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      `);
      break;
    case 'fieldset':
      elementContent.html(`
        <fieldset>
          <legend>Form Legend</legend>
          <div class="mb-3">
            <label class="form-label">Field Label</label>
            <input type="text" class="form-control">
          </div>
        </fieldset>
      `);
      break;
    case 'table':
      elementContent.html(`
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
      `);
      break;
    case 'heading':
      elementContent.html('<h2>Heading Text</h2>');
      break;
    case 'paragraph':
      elementContent.html('<p>This is a paragraph of text. You can edit this content.</p>');
      break;
    case 'span':
      elementContent.html('<span>Inline text element</span>');
      break;
    case 'blockquote':
      elementContent.html('<blockquote class="blockquote">This is a blockquote element for showcasing quoted content.</blockquote>');
      break;
    case 'input':
      elementContent.html('<input type="text" class="form-control" placeholder="Text input">');
      break;
    case 'textarea':
      elementContent.html('<textarea class="form-control" rows="3" placeholder="Textarea"></textarea>');
      break;
    case 'select':
      elementContent.html(`
        <select class="form-select">
          <option selected>Select option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      `);
      break;
    case 'button':
      elementContent.html('<button class="btn btn-primary">Button</button>');
      break;
    case 'checkbox':
      elementContent.html(`
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="checkboxElement">
          <label class="form-check-label" for="checkboxElement">Checkbox Label</label>
        </div>
      `);
      break;
    case 'radio':
      elementContent.html(`
        <div class="form-check">
          <input class="form-check-input" type="radio" name="radioElement" id="radioElement">
          <label class="form-check-label" for="radioElement">Radio Label</label>
        </div>
      `);
      break;
    case 'image':
      elementContent.html('<img src="https://via.placeholder.com/300x200" class="img-fluid" alt="Placeholder Image">');
      break;
    case 'video':
      elementContent.html('<video controls class="img-fluid"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support the video tag.</video>');
      break;
    case 'link':
      elementContent.html('<a href="#" class="link-primary">Link Text</a>');
      break;
    case 'list':
      elementContent.html(`
        <ul class="list-group">
          <li class="list-group-item">Item 1</li>
          <li class="list-group-item">Item 2</li>
          <li class="list-group-item">Item 3</li>
        </ul>
      `);
      break;
    case 'icon':
      elementContent.html('<i class="fas fa-star fa-2x"></i>');
      break;
    case 'divider':
      elementContent.html('<hr>');
      break;
    default:
      elementContent.text('New Element');
  }
  
  newElement.append(elementContent);
  return newElement;
}

// Make element editable
function makeElementEditable(element) {
  let content = element.find('.element-content');
  content.attr('contenteditable', 'true');
  content.focus();
  
  content.on('blur', function() {
    $(this).removeAttr('contenteditable');
    saveCanvasState();
  });
}

// Select element
function selectElement(element) {
  deselectElement();
  selectedElement = element;
  element.addClass('selected');
  
  updateStyleEditor();
  
  // Update selected element info
  let elementType = element.data('element-type');
  $('#selected-element-info').text(`Selected: ${elementType}`);
}

// Deselect element
function deselectElement() {
  if (selectedElement) {
    selectedElement.removeClass('selected');
    selectedElement = null;
  }
  
  $('#selected-element-info').text('No element selected');
}

// Initialize style editor
function initStyleEditor() {
  // Width & Height
  $('#width-value, #width-unit').on('change', function() {
    if (!selectedElement) return;
    
    let widthValue = $('#width-value').val();
    let widthUnit = $('#width-unit').val();
    
    if (widthValue && widthUnit) {
      if (widthUnit === 'auto') {
        selectedElement.css('width', 'auto');
      } else {
        selectedElement.css('width', widthValue + widthUnit);
      }
      saveCanvasState();
    }
  });
  
  $('#height-value, #height-unit').on('change', function() {
    if (!selectedElement) return;
    
    let heightValue = $('#height-value').val();
    let heightUnit = $('#height-unit').val();
    
    if (heightValue && heightUnit) {
      if (heightUnit === 'auto') {
        selectedElement.css('height', 'auto');
      } else {
        selectedElement.css('height', heightValue + heightUnit);
      }
      saveCanvasState();
    }
  });
  
  // Typography
  $('#font-family').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('font-family', $(this).val());
    saveCanvasState();
  });
  
  $('#font-size-value, #font-size-unit').on('change', function() {
    if (!selectedElement) return;
    
    let fontSizeValue = $('#font-size-value').val();
    let fontSizeUnit = $('#font-size-unit').val();
    
    if (fontSizeValue && fontSizeUnit) {
      selectedElement.css('font-size', fontSizeValue + fontSizeUnit);
      saveCanvasState();
    }
  });
  
  $('#font-weight').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('font-weight', $(this).val());
    saveCanvasState();
  });
  
  $('#text-color-picker, #text-color-value').on('change', function() {
    if (!selectedElement) return;
    let color = $(this).val();
    selectedElement.css('color', color);
    $('#text-color-picker, #text-color-value').val(color);
    saveCanvasState();
  });
  
  $('#text-align').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('text-align', $(this).val());
    saveCanvasState();
  });
  
  // Background
  $('#bg-color-picker, #bg-color-value').on('change', function() {
    if (!selectedElement) return;
    let color = $(this).val();
    selectedElement.css('background-color', color);
    $('#bg-color-picker, #bg-color-value').val(color);
    saveCanvasState();
  });
  
  // Border
  $('#border-width-value, #border-width-unit, #border-style, #border-color-picker, #border-color-value').on('change', function() {
    if (!selectedElement) return;
    
    let borderWidth = $('#border-width-value').val();
    let borderWidthUnit = $('#border-width-unit').val();
    let borderStyle = $('#border-style').val();
    let borderColor = $('#border-color-value').val();
    
    if (borderWidth && borderWidthUnit && borderStyle && borderColor) {
      selectedElement.css('border', `${borderWidth}${borderWidthUnit} ${borderStyle} ${borderColor}`);
      saveCanvasState();
    }
  });
  
  $('#border-radius-value, #border-radius-unit').on('change', function() {
    if (!selectedElement) return;
    
    let borderRadiusValue = $('#border-radius-value').val();
    let borderRadiusUnit = $('#border-radius-unit').val();
    
    if (borderRadiusValue && borderRadiusUnit) {
      selectedElement.css('border-radius', borderRadiusValue + borderRadiusUnit);
      saveCanvasState();
    }
  });
  
  // Margin & Padding
  $('#margin-value, #margin-unit').on('change', function() {
    if (!selectedElement) return;
    
    let marginValue = $('#margin-value').val();
    let marginUnit = $('#margin-unit').val();
    
    if (marginValue && marginUnit) {
      selectedElement.css('margin', marginValue + marginUnit);
      saveCanvasState();
    }
  });
  
  $('#padding-value, #padding-unit').on('change', function() {
    if (!selectedElement) return;
    
    let paddingValue = $('#padding-value').val();
    let paddingUnit = $('#padding-unit').val();
    
    if (paddingValue && paddingUnit) {
      selectedElement.css('padding', paddingValue + paddingUnit);
      saveCanvasState();
    }
  });
  
  // Position
  $('#position-type').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('position', $(this).val());
    saveCanvasState();
  });
  
  $('#top-value, #top-unit').on('change', function() {
    if (!selectedElement) return;
    
    let topValue = $('#top-value').val();
    let topUnit = $('#top-unit').val();
    
    if (topValue && topUnit) {
      if (topUnit === 'auto') {
        selectedElement.css('top', 'auto');
      } else {
        selectedElement.css('top', topValue + topUnit);
      }
      saveCanvasState();
    }
  });
  
  $('#left-value, #left-unit').on('change', function() {
    if (!selectedElement) return;
    
    let leftValue = $('#left-value').val();
    let leftUnit = $('#left-unit').val();
    
    if (leftValue && leftUnit) {
      if (leftUnit === 'auto') {
        selectedElement.css('left', 'auto');
      } else {
        selectedElement.css('left', leftValue + leftUnit);
      }
      saveCanvasState();
    }
  });
  
  // Display
  $('#display-type').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('display', $(this).val());
    
    // Show/hide flex properties
    if ($(this).val() === 'flex') {
      $('#flex-properties, #flex-properties-justify, #flex-properties-align').show();
    } else {
      $('#flex-properties, #flex-properties-justify, #flex-properties-align').hide();
    }
    
    saveCanvasState();
  });
  
  $('#flex-direction').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('flex-direction', $(this).val());
    saveCanvasState();
  });
  
  $('#justify-content').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('justify-content', $(this).val());
    saveCanvasState();
  });
  
  $('#align-items').on('change', function() {
    if (!selectedElement) return;
    selectedElement.css('align-items', $(this).val());
    saveCanvasState();
  });
  
  // Text Content
  $('#text-content').on('change', function() {
    if (!selectedElement) return;
    selectedElement.find('.element-content').text($(this).val());
    saveCanvasState();
  });
  
  // Src for images and videos
  $('#src-value').on('change', function() {
    if (!selectedElement) return;
    
    let elementType = selectedElement.data('element-type');
    if (elementType === 'image') {
      selectedElement.find('img').attr('src', $(this).val());
    } else if (elementType === 'video') {
      selectedElement.find('video source').attr('src', $(this).val());
      selectedElement.find('video')[0].load();
    }
    
    saveCanvasState();
  });
  
  // Href for links
  $('#href-value').on('change', function() {
    if (!selectedElement) return;
    
    let elementType = selectedElement.data('element-type');
    if (elementType === 'link') {
      selectedElement.find('a').attr('href', $(this).val());
    }
    
    saveCanvasState();
  });
  
  // Custom CSS
  $('#custom-css').on('change', function() {
    if (!selectedElement) return;
    try {
      selectedElement.attr('style', $(this).val());
      saveCanvasState();
    } catch (e) {
      showToast('Invalid CSS syntax', 'error');
    }
  });
}

// Update style editor based on selected element
function updateStyleEditor() {
  if (!selectedElement) return;
  
  // Get element styles
  let styles = window.getComputedStyle(selectedElement[0]);
  
  // Update width & height inputs
  $('#width-value').val(parseFloat(styles.width) || '');
  $('#width-unit').val('px');
  
  $('#height-value').val(parseFloat(styles.height) || '');
  $('#height-unit').val('px');
  
  // Update typography inputs
  $('#font-family').val(styles.fontFamily);
  $('#font-size-value').val(parseFloat(styles.fontSize) || '');
  $('#font-size-unit').val('px');
  $('#font-weight').val(styles.fontWeight);
  $('#text-color-value').val(rgbToHex(styles.color));
  $('#text-color-picker').val(rgbToHex(styles.color));
  $('#text-align').val(styles.textAlign);
  
  // Update background inputs
  $('#bg-color-value').val(rgbToHex(styles.backgroundColor));
  $('#bg-color-picker').val(rgbToHex(styles.backgroundColor));
  
  // Update border inputs
  let borderWidth = parseFloat(styles.borderWidth) || '';
  $('#border-width-value').val(borderWidth);
  $('#border-width-unit').val('px');
  $('#border-style').val(styles.borderStyle);
  $('#border-color-value').val(rgbToHex(styles.borderColor));
  $('#border-color-picker').val(rgbToHex(styles.borderColor));
  
    // Update style editor based on selected element (continued)
  let borderRadius = parseFloat(styles.borderRadius) || '';
  $('#border-radius-value').val(borderRadius);
  $('#border-radius-unit').val('px');
  
  // Update margin & padding inputs
  let margin = parseFloat(styles.margin) || '';
  $('#margin-value').val(margin);
  $('#margin-unit').val('px');
  
  let padding = parseFloat(styles.padding) || '';
  $('#padding-value').val(padding);
  $('#padding-unit').val('px');
  
  // Update position inputs
  $('#position-type').val(styles.position);
  
  let top = parseFloat(styles.top) || '';
  $('#top-value').val(top);
  $('#top-unit').val(isNaN(top) ? 'auto' : 'px');
  
  let left = parseFloat(styles.left) || '';
  $('#left-value').val(left);
  $('#left-unit').val(isNaN(left) ? 'auto' : 'px');
  
  // Update display inputs
  $('#display-type').val(styles.display);
  
  if (styles.display === 'flex') {
    $('#flex-properties, #flex-properties-justify, #flex-properties-align').show();
    $('#flex-direction').val(styles.flexDirection);
    $('#justify-content').val(styles.justifyContent);
    $('#align-items').val(styles.alignItems);
  } else {
    $('#flex-properties, #flex-properties-justify, #flex-properties-align').hide();
  }
  
  // Update content inputs
  $('#text-content').val(selectedElement.find('.element-content').text());
  
  // Update element-specific inputs
  $('.element-specific').hide();
  
  let elementType = selectedElement.data('element-type');
  if (elementType === 'image' || elementType === 'video') {
    $('#src-input').show();
    if (elementType === 'image') {
      $('#src-value').val(selectedElement.find('img').attr('src'));
    } else {
      $('#src-value').val(selectedElement.find('video source').attr('src'));
    }
  } else if (elementType === 'link') {
    $('#href-input').show();
    $('#href-value').val(selectedElement.find('a').attr('href'));
  }
  
  // Update custom CSS
  $('#custom-css').val(selectedElement.attr('style'));
}

// Initialize context menu
function initContextMenu() {
  // Show context menu on right click
  $(document).on('contextmenu', '.dropped-element', function(e) {
    e.preventDefault();
    
    if (isPreviewMode) return;
    
    selectElement($(this));
    
    $('#context-menu').css({
      top: e.pageY + 'px',
      left: e.pageX + 'px',
      display: 'block'
    });
  });
  
  // Hide context menu on click elsewhere
  $(document).on('click', function() {
    $('#context-menu').hide();
  });
  
  // Context menu actions
  $('.context-menu-item').on('click', function() {
    let action = $(this).data('action');
    
    switch(action) {
      case 'copy':
        clipboard = selectedElement.clone(true);
        showToast('Element copied to clipboard', 'success');
        break;
      case 'cut':
        clipboard = selectedElement.clone(true);
        selectedElement.remove();
        deselectElement();
        saveCanvasState();
        showToast('Element cut to clipboard', 'success');
        break;
      case 'paste':
        if (!clipboard) {
          showToast('Nothing to paste', 'error');
          return;
        }
        
        let pastedElement = clipboard.clone(true);
        pastedElement.attr('id', 'element-' + (++elementIdCounter));
        $('#design-canvas').append(pastedElement);
        selectElement(pastedElement);
        saveCanvasState();
        showToast('Element pasted from clipboard', 'success');
        break;
      case 'delete':
        selectedElement.remove();
        deselectElement();
        saveCanvasState();
        showToast('Element deleted', 'success');
        break;
      case 'duplicate':
        let clone = selectedElement.clone(true);
        clone.attr('id', 'element-' + (++elementIdCounter));
        selectedElement.after(clone);
        selectElement(clone);
        saveCanvasState();
        showToast('Element duplicated', 'success');
        break;
    }
  });
}

// Initialize toolbar actions
function initToolbarActions() {
  // Preview mode toggle
  $('#preview-btn').on('click', function() {
    $('.canvas').toggleClass('preview-mode');
    isPreviewMode = $('.canvas').hasClass('preview-mode');
    
    if (isPreviewMode) {
      $(this).html('<i class="fas fa-edit me-1"></i> Edit');
      deselectElement();
    } else {
      $(this).html('<i class="fas fa-eye me-1"></i> Preview');
    }
  });
  
  // Clear canvas
  $('#clear-btn').on('click', function() {
    if (confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      $('#design-canvas').empty();
      $('#design-canvas').append(`
        <div class="canvas-placeholder">
          <i class="fas fa-arrow-left"></i>
          <p>Drag elements from the left sidebar</p>
        </div>
      `);
      deselectElement();
      saveCanvasState();
      showToast('Canvas cleared', 'success');
    }
  });
  
  // Save design
  $('#save-btn').on('click', function() {
    // Clone canvas to remove editing elements
    let canvasClone = $('#design-canvas').clone();
    canvasClone.find('.element-actions').remove();
    canvasClone.find('.dropped-element').removeClass('selected');
    
    // Get HTML content
    let savedHTML = canvasClone.html();
    
    // In a real application, you would send this to a server
    // For now, we'll just show a success message
    showToast('Design saved successfully', 'success');
    
    // For demo purposes, you could also download the HTML as a file
    downloadFile('web-design.html', '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>My Web Design</title>\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body>\n' + savedHTML + '\n</body>\n</html>');
  });
  
  // Undo action
  $('#undo-btn').on('click', function() {
    if (undoStack.length > 1) {
      redoStack.push(undoStack.pop());
      let previousState = undoStack[undoStack.length - 1];
      $('#design-canvas').html(previousState);
      deselectElement();
      showToast('Undo successful', 'success');
    } else {
      showToast('Nothing to undo', 'error');
    }
  });
  
  // Redo action
  $('#redo-btn').on('click', function() {
    if (redoStack.length > 0) {
      let nextState = redoStack.pop();
      undoStack.push(nextState);
      $('#design-canvas').html(nextState);
      deselectElement();
      showToast('Redo successful', 'success');
    } else {
      showToast('Nothing to redo', 'error');
    }
  });
}

// Save canvas state for undo/redo
function saveCanvasState() {
  let canvasHTML = $('#design-canvas').html();
  undoStack.push(canvasHTML);
  redoStack = [];
  
  // Limit undo stack size
  if (undoStack.length > 50) {
    undoStack.shift();
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  let toastId = 'toast-' + Date.now();
  let icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  
  let toast = `
    <div class="toast ${type}" id="${toastId}">
      <div class="toast-content">
        <i class="fas ${icon} toast-icon"></i>
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close">&times;</button>
    </div>
  `;
  
  $('#toast-container').append(toast);
  
  // Auto remove after 3 seconds
  setTimeout(function() {
    $(`#${toastId}`).remove();
  }, 3000);
  
  // Close button
  $(`#${toastId} .toast-close`).on('click', function() {
    $(`#${toastId}`).remove();
  });
}

// Convert RGB to Hex color
function rgbToHex(rgb) {
  if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') {
    return '#ffffff';
  }
  
  // Extract RGB values
  let rgbArray = rgb.match(/\d+/g);
  if (!rgbArray || rgbArray.length < 3) {
    return '#ffffff';
  }
  
  // Convert to hex
  let hex = '#';
  for (let i = 0; i < 3; i++) {
    let hexComponent = parseInt(rgbArray[i]).toString(16);
    hex += hexComponent.length === 1 ? '0' + hexComponent : hexComponent;
  }
  
  return hex;
}

// Download file helper function
function downloadFile(filename, content) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}