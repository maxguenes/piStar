/*! This is open-source. Feel free to use, modify, redistribute, and so on.
 */

var ui = {
    STATE_ADD_ACTOR: 'addActor',
    STATE_ADD_LINK: 'addLink',
    STATE_ADD_NODE: 'addNode',
    STATE_VIEW: 'view',

    currentButton: null, //the button that is currently selected
    currentState: 'view',
    currentAddingElement: 'none',
    linkSource: 'none',
    linkTarget: 'none',
    dependencyType: 'GoalDependencyLink',
    currentElement: null,

    currentStateIsAddKindOfActor: function(){return this.currentState === this.STATE_ADD_ACTOR;},
    currentStateIsAddLink: function(){return this.currentState === this.STATE_ADD_LINK;},
    currentStateIsAddNode: function(){return this.currentState === this.STATE_ADD_NODE;},
    currentStateIsView: function(){return this.currentState === this.STATE_VIEW;},

    isCurrentlyAddingElement: function(){return this.currentAddingElement != 'none';},
    isLinkSourceUndefined: function(){return this.linkSource === 'none';},
    isLinkTargetUndefined: function(){return this.linkTarget === 'none';},

    resetAddingElement: function(){this.currentAddingElement = 'none'; return this;},
    resetLinkSource: function(){this.linkSource = 'none'; return this;},
    resetLinkTarget: function(){this.linkTarget = 'none'; return this;},
};



//create the ADD buttons
new uiC.DropdownItemView({attributes: {parent:'#addActorDropdown'}, model: new uiC.ButtonModel({label: 'Role', action: ui.STATE_ADD_ACTOR, tooltip:'Add Role', statusText:'Now click on an empty space in the diagram to add a Role'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addActorDropdown'}, model: new uiC.ButtonModel({label: 'Agent', action: ui.STATE_ADD_ACTOR, tooltip:'Add Agent', statusText:'Now click on an empty space in the diagram to add an Agent'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addActorDropdown'}, model: new uiC.ButtonModel({label: 'Actor', action: ui.STATE_ADD_ACTOR, tooltip:'Add Actor', statusText:'Now click on an empty space in the diagram to add an Actor'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addActorLinkDropdown'}, model: new uiC.ButtonModel({label: 'Is A link', action: ui.STATE_ADD_LINK, name: 'IsALink', tooltip:'Add an Is-A link between an Actor and another Actor, or between a Role and another Role', statusText:'Adding Is-A link: click on the sub-element and then on the super-element.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addActorLinkDropdown'}, model: new uiC.ButtonModel({label: 'Participates-In link', action: ui.STATE_ADD_LINK, name: 'ParticipatesInLink', tooltip:'Add a Participates-In link between any Actors, Roles, or Agents', statusText:'Adding Participates-In link: click on the source, and then on the target.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addDependencyDropdown'}, model: new uiC.ButtonModel({label: 'Goal dependency', action: ui.STATE_ADD_LINK, name: 'GoalDependencyLink', tooltip:'Add Goal Dependency link (including its dependum)', statusText:'Goal Dependency link: click first on the depender, and then on the dependee.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addDependencyDropdown'}, model: new uiC.ButtonModel({label: 'Quality dependency', action: ui.STATE_ADD_LINK, name: 'QualityDependencyLink', tooltip:'Add Quality Dependency link (including its dependum)', statusText:'Quality Dependency link: click first on the depender, and then on the dependee.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addDependencyDropdown'}, model: new uiC.ButtonModel({label: 'Task dependency', action: ui.STATE_ADD_LINK, name: 'TaskDependencyLink', tooltip:'Add Task Dependency link (including its dependum)', statusText:'Task Dependency link: click first on the depender, and then on the dependee.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addDependencyDropdown'}, model: new uiC.ButtonModel({label: 'Resource dependency', action: ui.STATE_ADD_LINK, name: 'ResourceDependencyLink', tooltip:'Add Resource Dependency link (including its dependum)', statusText:'Resource Dependency link: click first on the depender, and then on the dependee.'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Goal', action: ui.STATE_ADD_NODE, name: 'Goal', tooltip:'Add Goal', statusText:'Click on an actor/role/agent to add a Goal', precondition:function() {
    var valid = true;
    if (istar.isEmpty()) {
        alert('Sorry, you can only add goals on an actor/role/agent.');
        valid = false;
    }
    return valid;
}
})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Task', action: ui.STATE_ADD_NODE, tooltip:'Add Task', statusText:'Click on an actor/role/agent to add a Task'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Resource', action: ui.STATE_ADD_NODE, tooltip:'Add Resource', statusText:'Click on an actor/role/agent to add a Resource'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Quality', action: ui.STATE_ADD_NODE, name: 'Quality', tooltip:'Add Quality', statusText:'Click on an actor/role/agent to add a Quality'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'And-Refinement', action: ui.STATE_ADD_LINK, name: 'AndRefinementLink', tooltip:'Add And-Refinement link', statusText:'And-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Or-Refinement', action: ui.STATE_ADD_LINK, name: 'OrRefinementLink', tooltip:'Add Or-Refinement link', statusText:'Or-Refinement link: click first on the child, and then on the parent. It can only be applied to goals or tasks.'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Qualification', action: ui.STATE_ADD_LINK, name: 'QualificationLink', tooltip:'Add Qualification link', statusText:'Qualification link: click first on the Quality and then on the element it qualifies (Goal, Task or Resource).'})}).render();
new uiC.ButtonView({model: new uiC.ButtonModel({label: 'Needed-By', action: ui.STATE_ADD_LINK, name: 'NeededByLink', tooltip:'Add Needed-By link', statusText:'Needed-By link: click first on the Resource and then on the Task that needs it.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addContributionDropdown'}, model: new uiC.ButtonModel({label: 'Make (++)', action: ui.STATE_ADD_LINK, name: 'make', tooltip:'Add Make (++) Contribution link', statusText:'Make (++) Contribution link: click first on an element and then on the Quality it contributes to.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addContributionDropdown'}, model: new uiC.ButtonModel({label: 'Help (+)', action: ui.STATE_ADD_LINK, name: 'help', tooltip:'Add Help (+) Contribution link', statusText:'Help (+) Contribution link: click first on an element and then on the Quality it contributes to.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addContributionDropdown'}, model: new uiC.ButtonModel({label: 'Hurt (-)', action: ui.STATE_ADD_LINK, name: 'hurt', tooltip:'Add Hurt (-) Contribution link', statusText:'Hurt (-) Contribution link: click first on an element and then on the Quality it contributes to.'})}).render();
new uiC.DropdownItemView({attributes: {parent:'#addContributionDropdown'}, model: new uiC.ButtonModel({label: 'Break (--)', action: ui.STATE_ADD_LINK, name: 'break', tooltip:'Add Break (--) Contribution link', statusText:'Break (--) Contribution link: click first on an element and then on the Quality it contributes to.'})}).render();


ui.defineInteractions = function() {
    istar.paper.on('blank:pointerdown', function(evt, x, y) {
        if (ui.currentStateIsAddKindOfActor()) {
            ui.addElementOnPaper(x, y);
        }
    });

    istar.paper.on('cell:mouseover', function(cellView, evt, x, y) {
        color = 'rgb(63,72,204)';
        if (cellView.model.isKindOfActor()) {
            if (cellView.model.prop('collapsed')) {
                cellView.model.attr('circle', {stroke: color, 'stroke-width': '2'});
            }
            else {
                cellView.model.attr('rect', {stroke: color, 'stroke-width': '4'});
                cellView.model.attr('circle', {stroke: 'black', 'stroke-width': '3'});
            }
        }
        else {
            if (cellView.model.get('parent')) {
                istar.graph.getCell(cellView.model.get('parent')).attr('rect', {stroke: color, 'stroke-width': '4'});
                istar.graph.getCell(cellView.model.get('parent')).attr('circle', {stroke: 'black', 'stroke-width': '3'});
            }
        }
    });
    istar.paper.on('cell:mouseout', function(cellView, evt, x, y) {
        if (cellView.model.isKindOfActor()) {
            cellView.model.attr('rect', {stroke: 'black', 'stroke-width': '2'});
            cellView.model.attr('circle', {stroke: 'black', 'stroke-width': '2'});
        }
        else {
            if (cellView.model.get('parent')) {
                istar.graph.getCell(cellView.model.get('parent')).attr('rect', {stroke: 'black', 'stroke-width': '2'});
                istar.graph.getCell(cellView.model.get('parent')).attr('circle', {stroke: 'black', 'stroke-width': '2'});
            }
        }
    });
    istar.paper.on('cell:pointerup', function(cellView, evt, x, y) {
        if (evt.ctrlKey) {
            cellView.model.toggleCollapse();  //collapse/uncollapse actors when ctrl-clicked
        }
        if (ui.currentStateIsAddNode()) {
            ui.addElementOnActor(cellView, x-50, y-18);
        }
        else if (ui.currentStateIsAddLink()) {
            if (cellView.model.isKindOfActor()) {
                if ( ui.currentAddingElement.match(/IsALink|ParticipatesInLink/) ) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.addLinkBetweenActors(ui.currentAddingElement, cellView);
                    }
                }
                else if ( ui.dependencyType.match(/DependencyLink/)  ) {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight();
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;
                        addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
                        ui.linkSource.unhighlight();
                        ui.currentButton.end();
                    }
                }
            }
            else {
                if ( ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|DependencyLink|make|help|hurt|break/) )  {
                    if (ui.isLinkSourceUndefined()) {
                        cellView.highlight({blur:10, color:'blue'});
                        ui.linkSource = cellView;
                    } else {
                        ui.linkTarget = cellView;

                        if ( ui.currentAddingElement.match(/AndRefinementLink|OrRefinementLink|NeededByLink|QualificationLink|ContributionLink|make|help|hurt|break/) ) {
                                if (ui.currentAddingElement === 'AndRefinementLink') istar.addAndRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                else if (ui.currentAddingElement === 'OrRefinementLink') istar.addOrRefinementLink(ui.linkSource.model, ui.linkTarget.model);
                                else if (ui.currentAddingElement === 'NeededByLink') istar.addNeededByLink(ui.linkSource.model, ui.linkTarget.model);
                                else if (ui.currentAddingElement === 'QualificationLink') istar.addQualificationLink(ui.linkSource.model, ui.linkTarget.model);
                                else if (ui.currentAddingElement.match(/make|help|hurt|break/i)) {
                                    var newLink = istar.addContributionLink(ui.linkSource.model, ui.linkTarget.model, ui.currentAddingElement);
                                    if (newLink) {
                                        newLink.on('change:vertices', ui._toggleSmoothness);//do some magic in order to prevent ugly links when there are no vertices
                                    }
                                }
                        }
                        else if (ui.dependencyType.match(/DependencyLink/)) {
                            addDependency(ui.linkSource.model, ui.dependencyType, ui.linkTarget.model);
                        }

                        ui.linkSource.unhighlight();
                        ui.currentButton.end();
                    }
                }
            }
        }
        else if (ui.currentStateIsView()) {
            if (! cellView.model.isLink()) {
                ui.currentElement = cellView.model;
                var removeButton = createRemoveButton(cellView.model.prop('position'));
                removeButton.node.elementToDelete = cellView.model.id;
                $(removeButton.node).click( function(){
                    istar.graph.getCell(this.elementToDelete).remove();
                    deleteRemoveElementButton();
                });
                new uiC.CellTableView({model: cellView.model}).render();
            }
        }
    });

    istar.paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {
        var newText;
        if (cellView.model.isLink()) {
            if ( cellView.model.isContributionLink() ) {
                newText = window.prompt('make, help, hurt, or break', cellView.model.getContributionType());
                if (newText !== null) {
                    cellView.model.setContributionType(newText);
                }
            }
        }
        else {
            oldText = cellView.model.attr('text/text').replace(/(\r\n|\n|\r)/gm,' ');
            newText = window.prompt('Edit text:', oldText);
            if (newText !== null) {
                cellView.model.changeNodeContent(newText);
            }
        }
    });

    istar.paper.on('cell:contextmenu', function(cellView, evt, x, y) {
    });
};

ui.addElementOnPaper = function(x, y) {
    try {
        istar['add' + ui.currentAddingElement](x, y);
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};

ui.addElementOnActor = function(cellView, x, y) {
    try {
        addElementInPlace(cellView.model, istar[istar.PREFIX_ADD + ui.currentAddingElement], x, y);
    } catch (e) {
        console.log(e);
    } finally {
        ui.currentButton.end();
    }
};
ui.addLinkBetweenActors = function(newLink, targetCellView) {
    try {
        ui.linkTarget = targetCellView;
        if (istar.types[newLink].isValid(ui.linkSource.model, ui.linkTarget.model))
        {
            istar[istar.PREFIX_ADD + ui.currentAddingElement](ui.linkSource.model, ui.linkTarget.model);
        }
        else {
            alert('Sorry, it is not possible to add a \'' + newLink +
                '\' link from a ' + ui.linkSource.model.get('type') + ' to a ' +
                ui.linkTarget.model.get('type'));
        }
    } catch (e) {
        console.log(e);
    } finally {
        ui.linkSource.unhighlight();
        ui.currentButton.end();
    }
};

function addDependency(source, dependencyType, target) {
    var sourceParentId;
    var targetParentId;
    if ( source.isKindOfActor() ) {
        sourceParentId = source.id;
    }
    else if ( source.isKindOfInnerElement() ) {
        sourceParentId = source.attributes.parent;
    }

    if ( target.isKindOfActor() ) {
        targetParentId = target.id;
    }
    else if ( target.isKindOfInnerElement() ) {
        targetParentId = target.attributes.parent;
    }

    if ( source === target ) {
        console.log('INVALID: you cannot create a dependency from an element to itself.');
        alert('INVALID: you cannot create a dependency from an element to itself.');
    }
    else if ( source.isLink() || target.isLink() ) {
        console.log('INVALID: you cannot create a dependency from/to another link.');
        alert('INVALID: you cannot create a dependency from/to another link.');
    }
    else if ( source.isDependum() || target.isDependum() ) {
        console.log('INVALID: you cannot create a dependency from/to a dependum.');
        alert('INVALID: you cannot create a dependency from/to a dependum.');
    }
    else if ( sourceParentId === targetParentId ) {
        console.log('INVALID: you cannot create a dependency with a single actor.');
        alert('INVALID: you cannot create a dependency with a single actor.');
    }
    else if ( sourceParentId && targetParentId ) {
        var node = '';
        var x = 10;
        var y = 10;
        var text = 'Dependum';
        if (dependencyType === 'QualityDependencyLink') {
            node = istar.addQuality(x, y, text);
        }
        else if (dependencyType === 'TaskDependencyLink') {
            node = istar.addTask(x, y, text);
        }
        else if (dependencyType === 'ResourceDependencyLink') {
            node = istar.addResource(x, y, text);
        } else {
            node = istar.addGoal(x, y, text);
        }
        links = istar.addDependencyLink(source, node, target);
        istar.rotateLabel(links[0]);
        istar.rotateLabel(links[1]);
        links[0].on('change:vertices', ui._toggleSmoothness);
        links[1].on('change:vertices', ui._toggleSmoothness);
    }
}

function addElementInPlace(clickedNode, callback, x, y) {
    ui.currentState = ui.STATE_VIEW;
    ui.resetAddingElement();
    //assigns the new node to the correct parent
    //if the user clicked on an actor kind, the parent is the clicked element itself (i.e., the actor)
    //otherwise, if the user clicked on another element (e.g., a goal), then the parent of the new element will be the same parent of the clicked element
    var node;
    if ( clickedNode.isKindOfActor() ){
        node = callback(x,y);
        clickedNode.embedNode(node);
    }
    else {
        var parent = istar.graph.getCell(clickedNode.attributes.parent);
        if ( parent && parent.isKindOfActor() ) {
            node = callback(x,y);
            istar.graph.getCell(clickedNode.attributes.parent).embedNode(node);
        }
    }
}



ui.changeColorActorContainer = function(color) {
    _.map(istar.getElements(), function(node) {
        if (node.isKindOfActor()) {
            //istar.paper.findViewByModel(node).highlight();
            node.attr('rect', {fill: color});
        }
    });
};
ui.connectLinksToShape = function() {
    $('#modals *').css('cursor', 'wait');
    //do the processing after a small delay, in order to allow the browser to update the cursor icon
    setTimeout(function() {
        istar.paper.options.linkConnectionPoint = joint.util.shapePerimeterConnectionPoint;
        //this translation is just to force re-rendering of links
        _.each(istar.getElements(), function(e) {
            e.translate(1);
            e.translate(-1);
        });
        istar.paper.options.linkConnectionPoint = undefined;
        $('#modals *').css('cursor', 'auto');
    },100);
};

function showLink(response){

    var shareLink = (location.protocol + '//' + location.host + location.pathname )+ "?hash=" +response;

    console.log(shareLink);

    $("#share-link").html(shareLink)
    $("#dialog-share" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        // create: function(event, ui) {
        //     var widget = $(this).dialog("widget");
        //     $(".ui-dialog-titlebar-close span", widget).removeClass("ui-button-icon ui-icon ui-icon-closethick").addClass("glyphicon glyphicon-remove");
        // },
        icons: {},
        buttons: {
            "Acessar URL": function() {
                location.href = shareLink;
            },
            "Voltar": function() {
                $( this ).dialog( "close" );
            }
        }
    });

    $("#dialog-share" ).dialog('open');
}

$('#shareModelButton').click(function() {

    var model = saveModel();

    $.ajax({
        type: "POST",
        url: PI_STAR_URL + "/model/save",
        contentType: "application/json",
        data: model,
        success: function(response) {
            $('#shareModelButton').show();
            showLink(response);
        },
        error: function(response){
            console.error("Error while retrieving backend informations. ");
            console.error(response)
        }
    });

});

$('#saveImageButton').click(function() {
    //hide vertex tools before saving
    $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element').hide();

    var svgData = saveSvg('diagram');
    $('#saveImage').html(createDownloadLink('goalModel.svg', '◀ SVG', svgData, 'download SVG (vectorial)'));

    $('#saveImage').append(document.createTextNode(' - '));

    var pngData = savePng('diagram', addPngLink);
    $('.marker-vertices, .link-tools, .marker-arrowheads, .remove-element').show();
    $('#saveImage').show();
});

function createDownloadLink(fileName, text, data, title) {
    var a = document.createElement('a');
    a.download = fileName;//name that will appear when saving the file
    a.title = title;
    a.href = data;

    var linkText = document.createTextNode(text);
    a.appendChild(linkText);
    return a;
}

function addPngLink(pngData) {
    var a = createDownloadLink('goalModel.png', 'PNG', pngData, 'download PNG');
    $('#saveImage').append(a);
}

$('#saveModelButton').click(function() {
    var model = saveModel();
    csvData = 'data:text/json;charset=utf-8,' + escape(model);
    a = createDownloadLink('goalModel.txt', '◀ File', csvData, 'download goal model');
    $('#saveModel').html(a);
    $('#saveModel').show();
});

$('#saveImage, a').click(function() {
    $('#saveImage').hide(200);
});

$('#saveModel, a').click(function() {
    $('#saveModel').hide(200);
});
$('#loadButton').click(function () {
    $(this).button('loading');
    //load the model with a small delay, giving time to the browser to display the 'loading' message
    setTimeout(function (){
        //call the actual loading
        try {
            if ($('#actualFileInput')[0].files.length === 0) {
                //if there is no file selected, load the model from the textArea
                fileManager.load($('#loadModelContent').val());


                $('#loadModelModal').modal('hide');
                $('#loadButton').button('reset');
            }
            else {
                //else, load model from file
                var file = $('#actualFileInput')[0].files[0];
                if (file.type == 'text/plain') {
                    var fileReader = new FileReader();
                    fileReader.onload = function(e) {
                        fileManager.load(e.target.result);

                        $('#loadModelModal').modal('hide');
                        $('#loadButton').button('reset');
                    };
                    fileReader.readAsText(file);
                }
                else {
                    alert('Sorry, this kind of file is not valid');
                    $('#loadButton').button('reset');
                    $('#loadModelModal').modal('hide');
                }
            }
        }
        catch(error) {
            $('#loadButton').button('reset');
            alert('Sorry, the input model is not valid.');
            console.log(error.stack);
        }
    },20);
});

ui.setupUi = function() {
    $('#shareModel').hide();
    $('#shareModelButton').hide();
    $('#saveImage').hide();
    $('#saveModel').hide();
    $('#diagramWidthInput').val(istar.paper.getArea().width);
    $('#diagramHeightInput').val(istar.paper.getArea().height);
};

$('#diagramSizeButton').click(function() {
    istar.paper.setDimensions($('#diagramWidthInput').val(), $('#diagramHeightInput').val());
});

$('#whiteActorsButton').click(function() {
    ui.changeColorActorContainer('white');
});

$('#analyseModelButton').click(function() {
    var numberOfElements = 'Number of elements: ' + istar.getNumberOfElements();
    var numberOfLinks = 'Number of links: ' + istar.getNumberOfLinks();
    alert(numberOfElements + '\n' + numberOfLinks + '\n\n' + 'OBS: each dependency counts as two links - one from the depender to the dependum, and another from the dependum to the dependee.');
});

$('#preciseLinksButton').click(function() {
    ui.connectLinksToShape();
});

$('#clearButton').click(function() {
    var confirmed = confirm('Are you sure you want to delete every element of this model?');
    if (confirmed) {
        ui.clearDiagram();
    }
});

ui.clearDiagram = function() {
    istar.graph.clear();
    deleteRemoveElementButton();
};


var hoverButtons = [];
function createButtons() {
    hoverButtons = [];

    return this;
}

var removeElementButton;
function deleteRemoveElementButton() {
    if (removeElementButton) removeElementButton.remove();
}
function createRemoveButton(position) {
    deleteRemoveElementButton();

    removeElementButton = V('<g class="remove-element" event="remove"><circle stroke="black" stroke-width="1" r="11" z="1000"/><path z="500" transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/></g>');
    $('.viewport').append(removeElementButton.node);
    removeElementButton.translate(position.x, position.y);
    return removeElementButton;
}

$('#instructionsTitle').click(function() {
    $('#instructionsContent').toggle(300);
});
$('#instructionsContent').toggle(0);

ui.changeStatus = function (text) {
    $('#status').html(text);
};

$('#examplesArea').on('show.bs.collapse', function () {
    $('#examplesButton').addClass('active');
});
$('#examplesArea').on('hide.bs.collapse', function () {
    $('#examplesButton').removeClass('active');
});
$('#helpArea').on('show.bs.collapse', function () {
    $('#helpButton').addClass('active');
});
$('#helpArea').on('hide.bs.collapse', function () {
    $('#helpButton').removeClass('active');
});
$('#feedbackArea').on('show.bs.collapse', function () {
    $('#feedbackButton').addClass('active');
});
$('#feedbackArea').on('hide.bs.collapse', function () {
    $('#feedbackButton').removeClass('active');
});

$(document).keyup(function(e) {
	if (ui.currentElement !== null) {
        if (ui.currentState === 'view') {
            if (e.which==46) {  //delete
                ui.currentElement.remove();
                deleteRemoveElementButton();
            }
        }
	}
});

ui.changeStateToEdit = function () {
    ui.currentState = 'edit';
    ui.resetPointerStyles();
};
ui.changeStateToView = function () {
    ui.currentState = 'view';

};

ui.resetPointerStyles = function() {
    $('#diagram').css('cursor', 'auto');
    $('#diagram g').css('cursor', 'move');
    $('#diagram .actorKindMain').css('cursor', 'move');
    $('.link-tools g').css('cursor', 'pointer');
};

ui._toggleSmoothness = function(link, vertices, something) {
    if (vertices.length === 1) {
        link.set('smooth', true);
    }
    else if (vertices.length === 0) {
        link.set('smooth', false);
    }
};
