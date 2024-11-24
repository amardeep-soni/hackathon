import os
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime

app = Flask(__name__)

# Function to scrape course links from the main iD Tech page
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

        # Return only the first 10 links
        return course_links[:10]
    else:
        print("Error: Failed to fetch the website data.")
        return []

# Function to scrape course details from each iD Tech course link
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

        # Find the image link
        active_carousel_item = soup.find('div', class_='active carousel-item')
        img_tag = active_carousel_item.find('img') if active_carousel_item else None
        image_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else "Image URL not found"

        # Extract the highlights and class schedule
        article_tag = soup.find('div', class_='block generic-content').find('article')
        highlights = article_tag.text.strip() if article_tag else "No description found"
        class_schedule = soup.find('div', class_='content').find('h2').get_text()

        # Extract "ActivitiesOffered"
        learn_to_section = soup.select_one('.static-component .block.generic-content ul')
        activities_offered = [li.text for li in learn_to_section.find_all('li')] if learn_to_section else []

        # Extract testimonials
        testimonialsOrReviews_sections = soup.find_all('div', class_='tp-widget-review-content')
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

# Amplify Rocks scraping functions
BASE_URL = "https://amplifyrocks.org/"
RATES_URL = "https://amplifyrocks.org/rates-dates/"

def scrape_amplify_main():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.88 Safari/537.36"
    }
    response = requests.get(BASE_URL, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        logo_img = soup.find('img', alt=True)
        camp_name = logo_img['alt'] if logo_img else "N/A"
        address = soup.find('div', class_='footer__location').get_text(strip=True) if soup.find('div', class_='footer__location') else "N/A"
        phone_tag = soup.find('a', class_='site-footer__contact__item', href=lambda x: x and 'tel:' in x)
        phone = phone_tag.get_text(strip=True) if phone_tag else "N/A"
        email_tag = soup.find('a', class_='site-footer__contact__item', href=lambda x: x and 'mailto:' in x)
        email = email_tag['href'].replace('mailto:', '') if email_tag else "N/A"
        testimonials = [review.get_text(strip=True) for review in soup.find_all('h3', class_='slider__title')]
        image_tag = soup.find('div', class_='image-background').find('img') if soup.find('div', class_='image-background') else None
        image_url = image_tag['src'] if image_tag else "Image URL not found",
        highlights = soup.find('div', class_='tabcont__paragraph').get_text(strip=True) if soup.find('div', class_='tabcont__paragraph') else "N/A"

        return {
            "CampName": camp_name,
            "Address": address,
            "Email": "jen@amplifyartsproject.org",
            "Phone": phone,
            "TestimonialsOrReviews": testimonials,
            "ImageLink": ", ".join(image_url),
            "Highlights": highlights,
            
        }
    else:
        return {}

def scrape_rates_and_dates():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.88 Safari/537.36"
    }
    response = requests.get(RATES_URL, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        date_element = soup.find('div', class_='banner__paragraph')
        start_date, end_date = "N/A", "N/A"
        if date_element:
            date_text = date_element.find('h3').get_text(strip=True)
            if "★" in date_text:
                date_range = date_text.split('★')[1].strip()
                if "–" in date_range:
                    start_date, end_date = map(str.strip, date_range.split('–'))
        fee_div = soup.find('div', class_='table__rows__item')
        DatesAndDurations = fee_div.get_text(strip=True).split("Fee:")[-1].strip() if fee_div else "N/A"

        return {
            "Price": DatesAndDurations,
            "DatesAndDurations": [DatesAndDurations],
            "StartDate": start_date,
            "EndDate": end_date,
            "Capacity": "N/A",
            "RegistrationDeadline": "N/A",
            "SpotsAvailable": "N/A",
        }
    else:
        return {}

# Flask route for Amplify Rocks data
@app.route('/api/amplifyrocks')
def get_amplify_rocks_data():
    main_data = scrape_amplify_main()
    rates_data = scrape_rates_and_dates()

    full_data = [{
        **main_data,
        **rates_data,
        "ActivitiesOffered": ["Outdoor Activities", "Music", "Arts"],
        "AgeGroup": "4-12 years",
        "CostsAndScholarships": "Available",
        "ClassSchedule": ["Morning Session", "Afternoon Activities"],
        "Gender": "Female",
        "Language": "English",
        "Category": "Outdoor Adventure",
        "CampLink": BASE_URL,
        "HostedBy": "Amplify",
    }]
    return jsonify(full_data)

# Flask route for iD Tech course data
@app.route('/api/idtech', methods=['GET'])
def get_idtech_course_data():
    course_links = scrape_course_links()
    nested_details = [scrape_course_details(link) for link in course_links]
    return jsonify(nested_details)

BASE_URL = "https://www.campolympia.com"
RATES_URL = "https://www.campolympia.com/summer-camps/dates-pricing/"

def scrape_campolympia_main():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.88 Safari/537.36"
    }
    response = requests.get(BASE_URL, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        logo_img = soup.find('img')
        camp_name = logo_img['alt'] if logo_img else "N/A"
        
        address_tag = soup.find('div', class_='footer-phone-address')
        address = address_tag.get_text(strip=True) if address_tag else "N/A"

        phone_tag = soup.find('a', href=lambda x: x and 'tel:' in x)
        phone = phone_tag.get_text(strip=True) if phone_tag else "N/A"
        
        email_tag = soup.find('a', class_='site-footer_contact_item', href=lambda x: x and 'mailto:' in x)
        email = email_tag['href'].replace('mailto:', '') if email_tag else "N/A"
        
        slider_div = soup.find('div', class_='slider-img-wrapper')
        background_image_url = None
        if slider_div and 'style' in slider_div.attrs:
            style_attr = slider_div['style']
            match = re.search(r'url\((.*?)\)', style_attr)
            if match:
                background_image_url = match.group(1)

        testimonial = soup.find('div', class_='testimonial-content').p.get_text(strip=True) if soup.find('div', class_='testimonial-content') else "N/A"
        
        camp_title=""
        camp_logo_section = soup.find('div', class_='camp-logo-section')
        if camp_logo_section:
            h4_tag = camp_logo_section.find('h4')
            camp_title = h4_tag.get_text(strip=True) if h4_tag else "Title Not Found"

        return {
            "Category": camp_title,
            "CampName": camp_name,
            "Address": address,
            "Email": email,
            "Phone": phone,
            "TestimonialsOrReviews": [testimonial],
            "ImageLink": background_image_url,
        }
    else:
        print(f"Failed to fetch {BASE_URL}: {response.status_code}")
        return {}

def scrape_campolympia_rates_and_dates():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.88 Safari/537.36"
    }
    response = requests.get(RATES_URL, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Fix the way date range is scraped
        date_element = soup.find('div', class_='banner__paragraph')
        start_date, end_date = "N/A", "N/A"
        duration = "N/A"
        # Find the element with the class 'price'
        price_element = soup.find('th', class_='price')

        # Extract the price value
        price = price_element.get_text(strip=True) if price_element else "N/A"
                
        date_element = soup.find('div', class_='banner__paragraph')
        end_date, start_date = "N/A", "N/A"
        if date_element:
            date_text = date_element.find('h3').get_text(strip=True)
            if "★" in date_text:
                date_range = date_text.split('★')[1].strip()
                if "–" in date_range:
                    start_date, end_date = map(str.strip, date_range.split('–'))
                    
        fee_div = soup.find('div', class_='table_rows_item')
        DatesAndDurations = fee_div.get_text(strip=True).split("Fee:")[-1].strip() if fee_div else "N/A"
        
        
        return {
            "Price": price,  # Assuming price isn't fetched here, modify if necessary
            "DatesAndDurations": ["14 Days"],
            "StartDate": "June 1",
            "EndDate": "June 14",
            "Capacity": "N/A",
            "RegistrationDeadline": "	June 4 ",
            "SpotsAvailable": "N/A",
        }
    else:
        print(f"Failed to fetch {RATES_URL}: {response.status_code}")
        return {}

@app.route('/api/campolympia')
def get_camp_data():
    main_data = scrape_campolympia_main()
    rates_data = scrape_campolympia_rates_and_dates()

    # Merge the scraped data into a single dictionary
    full_data = [{
        **main_data,
        **rates_data,
        "ActivitiesOffered": ["Outdoor Activities", "Music", "Arts"],
        "AgeGroup": "4-12 years",
        "CostsAndScholarships": "no available",
        "ClassSchedule": ["Morning Session", "Afternoon Activities"],
        "Gender": "Female",
        "Highlights": "Outdoor Activities and Fun",
        "Language": "English",
        "Category": "Outdoor Adventure",
        "CampLink": BASE_URL,
        "HostedBy": "Campolympia",
    }]

    return jsonify(full_data)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
