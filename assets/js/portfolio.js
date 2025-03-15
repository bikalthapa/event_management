(function($, ElementQueries) {
    document.addEventListener("arlojscontrolsloaded", function() {
        var platformID = "websitetestdata.arlo.co"; // Change platformID to point at your own account

        var filter = {
            moduleType: "Filters",
            targetElement: "#filters",
            template: "#filter-template",
            filterControlId: 1
        };

        var eventList = {
            moduleType: "UpcomingEvents",
            targetElement: "#upcoming-events",
            template: "#upcoming-events-template",
            maxCount: 12,
            filterControlId: 1,
            includeLoadMoreButton: true,
            loadMoreButtonText: "Show More",
            includeArloLink: false,
            smartDateFormats: {
                startDay: "DD"
            },
            customUrls: {
                eventtemplate: "/workshop/",
                venue: "/venue/",
                presenter: "/presenter/"
            },
            callbacks: {
                onShow: eventListOnShowCallback
            }
        };

        var app = new window.ArloWebControls();

        app.start({
            platformID: platformID,
            showDevErrors: false,
            modules: [eventList, filter]
        });

        /* ----- Callback function ----- */

        // "OnShow" callback
        function eventListOnShowCallback(getEventListItemsFunction) {
            var listItems = getEventListItemsFunction();

            var cardSummary = $('.arlo-summary');
            var strMaxLength = 350;
            
            $.each(cardSummary, function (index, ele) {
                var str = $(ele).text()
                $(ele).text(strChopper(str));
            });

            function strChopper(str) {
                if (str.length > strMaxLength) {
                    str = str.substring(0, strMaxLength) + '...';
                }
                return str;
            }
            
            ElementQueries.init();

            // Hide timezone selector if there are no online events
            if ($(".arlo-online").length < 1) {
                $(".arlo-timezone-select").hide();
            } else {
                $(".arlo-timezone-select").show();
                $(".arlo-timezone-select").parent().css("float", "right");
            }

            // Set up tooltips
            $.each(listItems, function(index, listItem) {
                var tooltipElement = $(listItem).find('[data-toggle="tooltip"]')[0];
                if (tooltipElement) {
                    var toolTipContent = $(listItem).find(".tooltipcontent")[0];
                    if (toolTipContent) {
                        $(tooltipElement).attr(
                            "data-original-title",
                            $(toolTipContent).html()
                        );
                        $(tooltipElement).tooltip();
                    }
                }
            });
        }

        $("#arlo-filter-toggle").click(function() {
            $(this).parent().toggleClass("arlo-show-filter");
        });
    });
})(jQuery, window.ElementQueries);