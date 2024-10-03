## Click Intelligence Ltd
This is my solution for the coding test created by Click Intelligence Ltd.

The project uses the following technologies:

 - React.js (v. 18.3.1)
 - TailwindCSS

Optimised for the following screen sizes:

- 1440px and above (Desktop and larger screens)
- 768px (Tablet)
- 375px (Mobile)

## Getting started

Running locally

1. Download the files to your machine by cloning the repository using the git clone command or by downloading the zip file.
2. Install the dependencies using npm with the command ``npm install``.
3. Run the project locally with ``npm start``.

## Limitations
- Currently, the app can only count words on static websites. This project does not have a backend implementation, making it difficult to parse dynamic websites, as they need to be rendered first before being scraped.
- This project uses a CORS proxy server to bypass CORS security. However, some websites may detect the use of the CORS proxy and may obfuscate data to prevent scraping, which could lead to inaccurate results.