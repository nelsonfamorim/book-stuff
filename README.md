# book-stuff

## Installation:

1) Clone The repository.
2) Run `npm install` on the repository root.
3) Run `npm run build` or `npm run build-windows`, depending on OS
4) Make sure mongodb is running on port 27017
5) Run `npm start`
6) Open your browser on [this address](http://localhost:8080)

## Queue Prioritization

The queue HTML files prioritization, allows every PDF item to be delayed once.

When a PDF is in the head of the queue, the algorithm will look for HTML documents following it until it finds a PDF document or reaches the maximum cap (which I defined as 5). Those documents will jump to the head of the queue.