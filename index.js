// src/index.js
document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:3000";

  // Function to fetch movie details and update the UI
  const fetchAndDisplayMovieDetails = async (filmsId) => {
    try {
      const response = await fetch(`${BASE_URL}/films/${filmsId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details.");
      }
      const filmData = await response.json();
      const {
        title,
        runtime,
        showtime,
        capacity,
        tickets_sold,
        description,
        poster,
      } = filmData;

      // Calculate available tickets
      const availableTickets = capacity - tickets_sold;

      // Update the DOM elements with movie details
      document.getElementById("poster").src = poster;
      document.getElementById("title").textContent = title;
      document.getElementById("runtime").textContent = `${runtime} minutes`;

      document.getElementById("showtime").textContent = showtime;
      document.getElementById("ticket-num").textContent = availableTickets;
      document.getElementById("film-info").textContent = description;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Function to update available tickets and handle ticket purchase
  const updateAvailableTickets = (filmsId, availableTickets) => {
    // Update the number of available tickets in the DOM
    document.getElementById("ticket-num").textContent = availableTickets;

    // Disable the "Buy Ticket" button if no tickets are available
    const buyButton = document.getElementById("buy-ticket");
    if (availableTickets === 0) {
      buyButton.disabled = true;
    } else {
      buyButton.disabled = false;
    }
  };

  // Function to simulate a ticket purchase
  const buyTicket = async (filmsId) => {
  try {
    const response = await fetch(`${BASE_URL}/films/${filmsId}`);
      if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
      }
      const filmData = await response.json();
      const { capacity, tickets_sold } = filmData;
      let availableTickets = capacity - tickets_sold;

      if (availableTickets > 0) {
          // Simulate a ticket purchase (no persistence)
          availableTickets -= 1;
          // Update available tickets on the frontend
          updateAvailableTickets(filmsId, availableTickets);

          // Add a POST request to update tickets_sold on the server (not persisted in this example)
          // This is where you would typically interact with your backend to record the purchase.
          const newTicketsSold = tickets_sold + 1;
          // Simulate updating the server (in reality, you would make an API call)
          setTimeout(() => {
              // Simulate a successful purchase
              filmData.tickets_sold = newTicketsSold;
          }, 1000);
      }
  } catch (error) {
      console.error("Error purchasing ticket:", error);
  }
};

  // Function to populate the movie list
  const populateMovieList = async () => {
    try {
      const filmsList = document.getElementById("films");
      const response = await fetch(`${BASE_URL}/films`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie list.");
      }
      const films = await response.json();
      films.forEach((film) => {
        const li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film-item");
        li.addEventListener("click", () => {
          fetchAndDisplayMovieDetails(film.id);
        });
        filmsList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  // Remove the placeholder <li> element if it exists
  const placeholderLi = document.querySelector("#films > li");
  if (placeholderLi) {
    placeholderLi.remove();
  }

  // Call populateMovieList to fetch and display the list of movies
  populateMovieList();

  // Add a click event listener to the "Buy Ticket" button
  const buyButton = document.getElementById("buy-ticket");
  buyButton.addEventListener("click", () => {
    const filmsId = 1; // Assuming the user wants to buy a ticket for the first movie
    buyTicket(filmsId);
  });


  
  fetchAndDisplayMovieDetails (1)
  });