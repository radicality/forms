var ordering = "before"

var wrapWith = function(tag){
    return function(name, field, arrName){
        var label = this.label;
        if(!label){
            label = name[0].toUpperCase() + name.substr(1).replace('_', ' ');
        }
        var html = '<' + tag + ' class="' + field.classes().join(' ') + '">';
        if(field.widget.type == 'multipleCheckbox' ||
           field.widget.type == 'multipleRadio'){
            html += '<fieldset>' +
                '<legend>' + field.labelText(name) + '</legend>' +
                field.errorHTML() +
                field.widget.toHTML(name, field) +
            '</fieldset>';
        }
        else {
            html += field.errorHTML();
            
            if(ordering == "after"){
                html += field.widget.toHTML(name, field, arrName) + 
                field.labelHTML(name, field.id);
            }
            else{
                html += field.labelHTML(name, field.id) + 
                        field.widget.toHTML(name, field)
            }
        }
        
        return html + '</' + tag + '>';
    };
};

var setOrdering = function(o){
    ordering = o;
}

exports.div = wrapWith('div');
exports.p = wrapWith('p');
exports.li = wrapWith('li');

exports.table = function(name, field){
    return '<tr class="' + field.classes().join(' ') + '">' +
        '<th>' + field.labelHTML(name) + '</th>' +
        '<td>' +
            field.errorHTML() +
            field.widget.toHTML(name, field) +
        '</td>' +
    '</tr>';
};

exports.setOrdering = setOrdering;
