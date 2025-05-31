# Train Ticket Tracker Backend

A lightweight proxy server for the Shohoz API exclusively designed to fetch and serve train ticket data. This backend does not store or manage data itself; it simply relays requests and responses between clients and the official Shohoz API.

## Overview

- **Purpose:** Acts as a middleware between your frontend/client and the Shohoz API, forwarding requests to retrieve train ticket information.
- **No local database, user management, or persistent storage.**

## Features

- Forwards REST API requests to Shohoz API endpoints
- Returns train ticket data from Shohoz

## Tech Stack

- **Backend:** Node.js, Express.js
- **Proxy:** axios

## API Overview

### POST `/api/v1/tickets`

**Description:**  
Fetch available train tickets between two cities for a specific date.  
The server sends your request to the Shohoz API and returns the results in a simplified, consistent format.

#### Request Body

```json
{
    "from": "Dhaka",
    "to": "Khulna",
    "date": "2025-06-09"
}
```

- `from`: Departure city (required)
- `to`: Destination city (required)
- `date`: Travel date in `YYYY-MM-DD` format (required)

#### Example Response

```json
{
    "success": true,
    "message": "Tickets are fetched successfully",
    "data": [
        {
            "trainName": "SUNDARBAN EXPRESS (726)",
            "departureDateTime": "09 Jun, 08:00 am",
            "arrivalDateTime": "09 Jun, 03:40 pm",
            "travelTime": "07h 40m",
            "from": "Dhaka",
            "to": "Khulna",
            "class": "AC_S",
            "fare": 1245,
            "seats": 2,
            "now": "2025-05-31T07:07:31.897Z",
            "link": "https://eticket.railway.gov.bd/booking/train/search?fromcity=Dhaka&tocity=Khulna&doj=09-Jun-2025&class=AC_S"
        },
        {
            "trainName": "CHITRA EXPRESS (764)",
            "departureDateTime": "09 Jun, 07:30 pm",
            "arrivalDateTime": "10 Jun, 04:40 am",
            "travelTime": "09h 10m",
            "from": "Dhaka",
            "to": "Khulna",
            "class": "S_CHAIR",
            "fare": 680,
            "seats": 1,
            "now": "2025-05-31T07:07:31.897Z",
            "link": "https://eticket.railway.gov.bd/booking/train/search?fromcity=Dhaka&tocity=Khulna&doj=09-Jun-2025&class=S_CHAIR"
        }
    ]
}
```

- `success`: Indicates request status
- `message`: Human-readable status message
- `data`: Array of available tickets with train details, timings, fare, seat count, and direct booking link

## How It Works

- Receives POST requests at `/api/v1/tickets`
- Calls the Shohoz train ticket API with the provided parameters
- Returns ticket data in a consistent, easy-to-use format

## Disclaimer

This server only uses the Shohoz public API to fetch and relay train ticket information.
