require('utility/setting');

function uiPageSidebar() {
    return {
        link: function (scope, element/*, attrs*/) {
        }
    };
}

function uiPageSidebarMenu(setting) {
    return {
        link: function (scope, element, attrs) {
            element.on('click', 'li > a', function (e) {
                if (setting.layout.pageSidebarClosed) {
                    return;
                }

                var sub = $(this).next();

                if (!sub.hasClass('sub-menu')) {
                    return;
                }

                var slideSpeed = parseInt(attrs.slideSpeed);

                if (sub.is(":visible")) {
                    $('.arrow', $(this)).removeClass("open");
                    $(this).parent().removeClass("open");
                    sub.slideUp();
                } else {
                    $('.arrow', $(this)).addClass("open");
                    $(this).parent().addClass("open");
                    sub.slideDown(slideSpeed);
                }

                e.preventDefault();
            });
        }
    };
}

app.directive('uiPageSidebar', [uiPageSidebar]);
app.directive('uiPageSidebarMenu', ['setting', uiPageSidebarMenu]);