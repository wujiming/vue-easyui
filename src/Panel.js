export default {
    deep: true,
    params:['onOpen'],
    bind: function () {

        var options = this.getOptions();
        options['onOpen']=this[this.params.onOpen];
        $(this.el).panel(options);
        },
    update: function (val, oldVal) {
        $(this.el).panel(val);
    },
    unbind: function () {
        $(this.el).panel('destroy');
    },
    getOptions: function () {

        var modifiers = this.modifiers;

        var trueOptions = ["cache", "border", "doSize"];

        var defaultOptions = {
            extractor: function (data) {
                var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                var matches = pattern.exec(data);
                if (matches) {
                    return matches[1];	// only extract body content
                } else {
                    return data;
                }
            }
        };

        $.each(trueOptions, function (index, prop) {
            if (modifiers["n" + prop]) {
                defaultOptions[prop] = false;
            }
        });

        $.extend(defaultOptions,modifiers, this.vm[this.expression]);

        return defaultOptions;
    },
}
