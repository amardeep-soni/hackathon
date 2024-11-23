import os
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Base URL for full links
BASE_URL = "https://www.idtech.com"

# Function to scrape links from the main page
def scrape_course_links():
    url = f"{BASE_URL}/courses"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        course_links = []

        # Find all course title sections
        courses = soup.find_all('h6', class_='card-title')
        for course in courses:
            link_tag = course.find('a', href=True)
            if link_tag:
                # Append "4" to each link
                full_link = BASE_URL + link_tag['href']
                course_links.append(full_link)

        # Return only the first 4 links
        return course_links[:4]
    else:
        print("Error: Failed to fetch the website data.")
        return []

# Function to scrape details from each course link
def scrape_course_details(course_url):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Example: Scrape some nested details from the course page
        title = soup.find('h1').text.strip() if soup.find('h1') else "N/A"
    # Extract the Camp Name from the nested span inside the h1 tag
        camp_name_tag = soup.find('h1', class_='text-undefined title px-2')
        if camp_name_tag:
            camp_name = camp_name_tag.find('span', class_='undefined').text.strip() if camp_name_tag.find('span', class_='undefined') else "N/A"
        else:
            camp_name = "N/A"
        
        
        description = soup.find('p').text.strip() if soup.find('p') else "N/A"
        
        return {
            "URL": course_url,
            "Title": title,
            "Camp Name": camp_name,
            "Description": description,
        }
    else:
        return {
            "URL": course_url,
            "Error": "Failed to fetch course details."
        }

# Flask route for main page and nested scraping
@app.route('/api/nested-course-links', methods=['GET'])
def get_nested_course_links():
    course_links = scrape_course_links()
    nested_details = [scrape_course_details(link) for link in course_links]
    return jsonify(nested_details)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
