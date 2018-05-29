class breadcrumb {
    constructor(link, name) {
        this.name = name;
        this.link = link;
    }
}
function initNavMain(){
    $("main div#sidebar div.button").on("click", function(){
        var link = $(this).attr("link");
        if(link == undefined)
            return;
        var name = $(this).text();
        var bc = new breadcrumb(link, name);
        addBreadcrumb(bc);
        navigateTo(link);
    });
}
function initNavBreadcrumbs(){
    $("main div#breadcrumbs div.breadcrumb").off("click").on("click", function(){
        var link = $(this).attr("link");
        if(link == undefined)
            return;
        removeBreadcrumbsAfter(this);
        navigateTo(link);
    });
}
function initContentNav(){
    $("main div#content div.button.link").on("click", function(){
        var link = $(this).attr("link");
        if(link == undefined)
            return;
        var name = $(this).text();
        var bc = new breadcrumb(link, name);
        addBreadcrumb(bc);
        navigateTo(link);
    });
}

function navigateTo(page){
    if(page == undefined)
        return;
    var contentWrapper = $("main div#content");
    contentWrapper.children().remove();
    contentWrapper.load("pages/"+page+".html", function(){
        initContentNav();
    });
}

function removeBreadcrumbsAfter(crumb){
    $(crumb).nextAll().remove();
}

function clearBreadcrumbs(){
    $("main div#breadcrumbs").children().remove();
}

function addBreadcrumb(crumb){
    var bcWrapper = $("main div#breadcrumbs");
    if(bcWrapper.children().length > 0){
        bcWrapper.append("<span>></span>");
    }
    bcWrapper.append("<div class='breadcrumb' link='"+crumb.link+"'>"+crumb.name+"</div>");
    initNavBreadcrumbs();
}
$(function(){
    initNavMain();
});
