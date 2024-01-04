$(function () {
    // Event handler for save buttons
    $(".saveBtn").on("click", function () {
        var blockId = $(this).closest(".time-block").attr("id");
        var userText = $(this).siblings(".description").val();
        // Store user input in local storage
        localStorage.setItem(blockId, userText);
    });

    // Function to update time block classes based on current time
    function updateBlockClasses() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    // Function to load saved descriptions from local storage
    function loadSavedDescriptions() {
        $(".time-block").each(function () {
            var blockId = $(this).attr("id");
            var savedDescription = localStorage.getItem(blockId);

            if (savedDescription !== null) {
                $(this).find(".description").val(savedDescription);
            }
        });
    }

    // Display current date in the header
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Initial setup
    updateBlockClasses();
    loadSavedDescriptions();
});