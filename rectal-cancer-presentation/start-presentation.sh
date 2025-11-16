#!/bin/bash

# Start Presentation Script
# Simple script to launch the rectal cancer presentation

echo "=================================="
echo "Rectal Cancer 3D Lecture"
echo "=================================="
echo ""
echo "Starting local web server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to serve presentation"
    echo "Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "Using Python 2 to serve presentation"
    echo "Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
# Check if Node.js http-server is available
elif command -v http-server &> /dev/null; then
    echo "Using http-server to serve presentation"
    echo "Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    http-server -p 8000
else
    echo "No suitable web server found."
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3 (python3 -m http.server)"
    echo "  - Node.js http-server (npm install -g http-server)"
    echo ""
    echo "Or simply open index.html directly in your browser:"
    echo "  - Right-click index.html"
    echo "  - Select 'Open with' and choose your browser"
    exit 1
fi
