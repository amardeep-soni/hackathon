import os
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Function to scrape links from the main page
def scrape_course_links():
    base_url = "https://www.idtech.com"
    url = f"{base_url}/courses"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        course_links = []

        # Find all course title sections
        courses = soup.find_all('h6', class_='card-title')
        for course in courses:
            link_tag = course.find('a', href=True)
            if link_tag:
                # Append full link
                
                full_link = base_url + link_tag['href']
                course_links.append(full_link)

        # Return only the first 4 links
        return course_links[:2]
    else:
        print("Error: Failed to fetch the website data.")
        return []

# Function to scrape details from each course link
def scrape_course_details(course_url):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extracting course title
        title_tag = soup.find('h1', class_='text-undefined title px-2')
        CampName = title_tag.find('span', class_='undefined').text.strip() if title_tag else "N/A"
        # Scraping details from the list
        details_list = soup.find('ul', class_='list-unstyled')

        # Extract phone number
        phone_tag = soup.find('a', href=lambda x: x and x.startswith('tel:'))
        phone = phone_tag.text.strip() if phone_tag else "N/A"

        # Extract email
        email_tag = soup.find('a', href=lambda x: x and x.startswith('mailto:'))
        email = email_tag.text.strip() if email_tag else "N/A"

    #   for image link 
        active_carousel_item = soup.find('div', class_='active carousel-item')

        # Find the <img> tag inside the active carousel-item div
        img_tag = active_carousel_item.find('img') if active_carousel_item else None

        # Extract the 'src' attribute to get the image URL
        image_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else "Image URL not found"



        # Find the 'article' tag inside the desired section
        article_tag = soup.find('div', class_='block generic-content').find('article')
        highlights = article_tag.text.strip() if article_tag else "No description found"
      
        
        
                # Find the first 'h2' inside the 'content' class
        class_schedule = soup.find('div', class_='content').find('h2').get_text()
        print(class_schedule)
        
        
        # Extract "You'll learn to" "ActivitiesOffered": activities_offered,

        learn_to_section = soup.select_one('.static-component .block.generic-content ul')
        activities_offered = [li.text for li in learn_to_section.find_all('li')] if learn_to_section else []
      
      

        testimonialsOrReviews_sections = soup.find_all('div', class_='tp-widget-review-content')

        # Extract the 'text' content from each section if available
        testimonialsOrReviews = [review.find('div', class_='text').text.strip() for review in testimonialsOrReviews_sections if review.find('div', class_='text')]

        course_details = {
            "Price": "N/A",
            "AgeGroup": "N/A",  # Change "Age" to "AgeGroup"
            "DatesAndDurations": [],  # Change "Duration" to "DatesAndDurations" and initialize as an empty list
        }

        if details_list:
            for li in details_list.find_all('li', class_='pb-1'):
                strong_tag = li.find('strong')
                if strong_tag:
                    key = strong_tag.text.strip().replace(":", "")
                    value = li.text.strip().replace(strong_tag.text.strip(), "").strip()

                    # Check if the key matches "Age" and change it to "AgeGroup"
                    if key == "Age":
                        key = "AgeGroup"
                    
                    # Check if the key matches "Duration" and change it to "DatesAndDurations"
                    if key == "Duration":
                        key = "DatesAndDurations"

                    if key in course_details:
                        # If the key is "DatesAndDurations", split the value into a list
                        if key == "DatesAndDurations":
                            # Split based on commas or other delimiters if necessary
                            course_details[key] = [value]

                        else:
                            # For other keys, just assign the value directly
                            course_details[key] = value


            return {
                "CampLink": course_url,
                "CampName": CampName,
                **course_details,
                "Phone": phone,
                "Highlights": highlights,
                "ClassSchedule": [],
                "ActivitiesOffered": activities_offered,
                "TestimonialsOrReviews": testimonialsOrReviews,
                "Language": "English",  # Added Language
                "RegistrationDeadline": "not available",  # Added Registration Deadline
                "Capacity": "not available",  # Added Capacity
                "SpotsAvailable": "not available",  # Added Spots Available
                "Gender":"Both",
                "CostsAndScholarships":"not available",
                "Address":"not available",
                "StartDate":"not available",
                "EndDate":"not available",
                "SpotsAvailable":"not available",
                "ImageLink":image_url,
                "AgeGroup": "8-14 years",
                "Email":email,
                "HostedBy":"IdTech",
                "Category":"Tech Camp"
        }
    else:
        return {
            "URL": course_url,
            "Error": "Failed to fetch course details."
        }

# Flask route for main page and nested scraping
@app.route('/api/idtech', methods=['GET'])
def get_nested_course_links():
    course_links = scrape_course_links()
    nested_details = [scrape_course_details(link) for link in course_links]
    return jsonify(nested_details)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
