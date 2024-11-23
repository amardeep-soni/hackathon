import requests
from bs4 import BeautifulSoup

# Replace this URL with the actual page you want to scrape
url = 'https://www.idtech.com/courses/storyteller-visual-coding-with-scratch-and-vex-vr#/reg-flow/product-availability'

# Fetch the page content
response = requests.get(url)

# Initialize an array to store the content
workshop_titles = []

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all the divs with the class 'content'
    content_divs = soup.find_all('div', class_='content')
    
    # Loop through each div and extract the <h2> tag content
    for div in content_divs:
        # Find the <h2> tag inside the div
        h2_tag = div.find('h2')
        if h2_tag:
            # Append the content of the <h2> tag to the list
            workshop_titles.append(h2_tag.get_text())
    
    # Now the 'workshop_titles' variable holds all the extracted titles
    print(workshop_titles)  # You can send or return this list as required
else:
    print("Failed to retrieve the page. Status code:", response.status_code)
