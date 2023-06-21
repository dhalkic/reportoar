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
                    eventContainer.append('<p>No events found. Please Create Account to add one.</p>');
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
                    </div>
                </div>
            </div>
        `;
        return eventCard;
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

    function searchEvents() {
        var searchInput = $('#searchInput').val().toLowerCase();
        var filteredEvents = eventData.filter(function (event) {
          var eventName = event.name.toLowerCase();
          return eventName.includes(searchInput);
        });
    
        var searchResults = $('#eventContainer');
        searchResults.empty(); // Clear previous search results
    
        if (filteredEvents.length > 0) {
          filteredEvents.forEach(function (event) {
            var eventCard = createEventCard(event);
            searchResults.append(eventCard);
          });
        } else {
          searchResults.append('<p>No events found.</p>');
        }
      }
    
      // Add event listener to search input for real-time searching
      $('#searchInput').on('input', searchEvents);
    
      // Function to handle displaying event details when Enter key is pressed
  function displayEventDetailsOnEnter(event) {
    if (event.key === 'Enter') {
      var searchInput = $('#searchInput').val().toLowerCase();
      var filteredEvents = eventData.filter(function (event) {
        var eventName = event.name.toLowerCase();
        return eventName === searchInput;
      });

      if (filteredEvents.length > 0) {
        var eventId = filteredEvents[0].id;
        fetchEventDetails(eventId);
      } else {
        $('#eventContainer').html('<p>No events found.</p>');
      }
    }
  }

  // Add event listener to search input for handling Enter key press
  $('#searchInput').on('keypress', displayEventDetailsOnEnter);
    
    // Load events when the page is ready
    loadEvents();
});
