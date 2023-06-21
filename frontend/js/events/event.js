$(document).ready(function () {
    // Load events from the database and populate the event cards
    function loadEvents() {
        $.ajax({
            url: 'http://localhost/events/backend/events',
            method: 'GET',
            success: function (response) {
                var events = response;
                var eventContainer = $('#eventContainer');
                eventContainer.empty();

                if (events.length === 0) {
                    eventContainer.append('<p>No events found.</p>');
                } else {
                    events.forEach(function (event) {
                        var eventCard = createEventCard(event);
                        eventContainer.append(eventCard);
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    // Create an event card HTML template
    function createEventCard(event) {
        var eventCard = `
            <div class="event-card">
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-actions">
                        <a href="#" class="view-more-link" data-toggle="modal" data-target="#eventDetailsModal" data-event-id="${event.id}">View more</a>
                        <button type="button" class="edit-button" data-toggle="modal" data-target="#editEventModal" data-event-id="${event.id}">
                            Edit
                        </button>
                        <button type="button" class="delete-button" data-toggle="modal" data-target="#deleteEventModal" data-event-id="${event.id}">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        return eventCard;
    }

    // Add event form submit handler
    $('#addEventForm').submit(function (event) {
        event.preventDefault();

        var title = $('#title').val();
        var description = $('#description').val();
        var date = $('#date').val();
        var location = $('#location').val();

        $.ajax({
            url: 'http://localhost/events/backend/add_events',
            method: 'POST',
            data: {
                title: title,
                description: description,
                date: date,
                location: location
            },
            success: function (response) {
                $('#addEventModal').modal('hide');
                $('#addEventForm')[0].reset();
                loadEvents();
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });

    // Delete event confirmation modal handler
    $('#confirmDeleteButton').click(function () {
        var eventId = $(this).data('event-id');
        deleteEvent(eventId);
    });

    // Handle click event on delete buttons
    $(document).on('click', '.delete-button', function () {
        var eventId = $(this).data('event-id');
        $('#confirmDeleteButton').data('event-id', eventId);
    });

    // Delete event by ID
    function deleteEvent(eventId) {
        $.ajax({
            url: 'http://localhost/events/backend/events/' + eventId,
            method: 'DELETE',
            success: function (response) {
                $('#deleteEventModal').modal('hide');
                loadEvents();
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    // Handle click event on view more links
    $(document).on('click', '.view-more-link', function () {
        var eventId = $(this).data('event-id');
        fetchEventDetails(eventId);
    });

    // Fetch event details from the server
    function fetchEventDetails(eventId) {
        $.ajax({
            url: 'http://localhost/events/backend/events/' + eventId,
            method: 'GET',
            success: function (response) {
                var event = response;
                displayEventDetails(event);
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    // Display event details in the modal
    function displayEventDetails(event) {
        var modal = $('#eventDetailsModal');
        modal.find('.modal-title').text(event.title);
        modal.find('.event-description').text(event.description);
        modal.find('.event-date').text(event.date);
        modal.find('.event-location').text(event.location);

        modal.modal('show');
    }

    // Handle click event on edit buttons
    $(document).on('click', '.edit-button', function () {
        var eventId = $(this).data('event-id');
        fetchEventDetailsForEdit(eventId);
    });

    // Fetch event details from the server for editing
    function fetchEventDetailsForEdit(eventId) {
        $.ajax({
            url: 'http://localhost/events/backend/events/' + eventId,
            method: 'GET',
            success: function (response) {
                var event = response;
                populateEditEventForm(event);
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    // Populate the edit event form with event details
    function populateEditEventForm(event) {
        var editForm = $('#editEventForm');
        editForm.find('#editTitle').val(event.title);
        editForm.find('#editDescription').val(event.description);
        editForm.find('#editDate').val(event.date);
        editForm.find('#editLocation').val(event.location);
        editForm.find('#editEventId').val(event.id);
    }

    // Edit event form submit handler
    $('#editEventForm').submit(function (event) {
        event.preventDefault();

        var eventId = $('#editEventId').val();
        var title = $('#editTitle').val();
        var description = $('#editDescription').val();
        var date = $('#editDate').val();
        var location = $('#editLocation').val();

        $.ajax({
            url: 'http://localhost/events/backend/edit_events/' + eventId,
            method: 'PUT',
            data: JSON.stringify({
                title: title,
                description: description,
                date: date,
                location: location
            }),
            contentType: 'application/json',
            success: function (response) {
                $('#editEventModal').modal('hide');
                loadEvents();
            },
            error: function (xhr, status, error) {
                console.log('Error:', error);
            }
        });
    });
    // Load events when the page is ready
    loadEvents();
});
