document.addEventListener('DOMContentLoaded', function () {
	fetch('resume.yaml')
		.then(response => response.text())
		.then(data => {
			const resume = parseYaml(data);
			displayResume(resume);
		})
		.catch(error => console.error('Error fetching resume data:', error));
});

function parseYaml(yamlString) {
	try {
		// Using native JavaScript YAML parser
		return jsyaml.load(yamlString);
	} catch (error) {
		console.error('Error parsing YAML:', error);
		return null;
	}
}


function displayResume(resume) {
	// Apply branding color to CSS variable
	// Display name
	document.getElementById('name').textContent = resume.name;
	document.documentElement.style.setProperty('--primary-color', resume.primaryColor || '#83C2EA');
	document.documentElement.style.setProperty('--secondary-color', resume.secondaryColor || '#34485d');
	displayContact('contact', resume.contact);
	displaySocial('social', resume.social);
	displaySummary('summary', resume.summary);
	displayEducation('education', resume.education);
	displayExperience('experience', resume.experience);
	displaySkills('skills', resume.skills);
	displayLanguages('languages', resume.languages);

}

// Function to display contact information
function displayContact(sectionId, contact) {
	const section = document.getElementById(sectionId);

	if (contact) {
		const contactElement = document.createElement('div');
		contactElement.className = 'home_data';

		// Profile Image
		if (contact.image) {
			const imageElement = document.createElement('img');
			imageElement.src = contact.image;
			imageElement.alt = 'Icon picture';
			imageElement.className = 'avatar';
			imageElement.id = 'home-img';
			contactElement.appendChild(imageElement);
		}

		// Name
		const nameElement = document.createElement('h1');
		nameElement.className = 'home_title';
		nameElement.innerHTML = `${contact.name}`;
		contactElement.appendChild(nameElement);

		// Profession
		const professionElement = document.createElement('h3');
		professionElement.className = 'home_profession';
		professionElement.textContent = contact.profession;
		contactElement.appendChild(professionElement);

		// Display contact information
		const info = displayContactInfo('home_address', contact);
		contactElement.appendChild(info);
		section.appendChild(contactElement);
	}
}

// Function to display contact information (address)
function displayContactInfo(sectionId, contact) {
	const section = document.createElement('div');
	section.className = 'home_address bd-grid';

	if (contact) {
		// Location
		if (contact.location) {
			const locationSpan = document.createElement('span');
			locationSpan.className = 'home_information';
			const locationIcon = document.createElement('i');
			locationIcon.className = 'fa-solid fa-location-dot home_icon';
			const locationText = document.createTextNode(` ${contact.location}`);
			locationSpan.appendChild(locationIcon);
			locationSpan.appendChild(locationText);
			section.appendChild(locationSpan);
		}

		// Email
		if (contact.email) {
			const emailSpan = document.createElement('span');
			emailSpan.className = 'home_information';
			const emailLink = document.createElement('a');
			emailLink.href = `mailto:${contact.email}`;
			emailLink.className = 'home_link';
			const emailIcon = document.createElement('i');
			emailIcon.className = 'fa-solid fa-envelope home_icon';
			const emailText = document.createTextNode(` ${contact.email}`);
			emailLink.appendChild(emailIcon);
			emailLink.appendChild(emailText);
			emailSpan.appendChild(emailLink);
			section.appendChild(emailSpan);
		}

		// Phone
		if (contact.phone) {
			const phoneSpan = document.createElement('span');
			phoneSpan.className = 'home_information';
			const phoneLink = document.createElement('a');
			phoneLink.href = `tel:${contact.phone}`;
			phoneLink.className = 'home_link';
			const phoneIcon = document.createElement('i');
			phoneIcon.className = 'fa-solid fa-phone home_icon';
			const phoneText = document.createTextNode(` ${contact.phone}`);
			phoneLink.appendChild(phoneIcon);
			phoneLink.appendChild(phoneText);
			phoneSpan.appendChild(phoneLink);
			section.appendChild(phoneSpan);
		}
	}

	return section;
}


function addSectionHeader(sectionId) {
	const section = document.getElementById(sectionId);
	const headingElement = document.createElement('h2');
	headingElement.textContent = sectionId;
	section.appendChild(headingElement);
}

function displaySocial(sectionId, items) {
	const section = document.getElementById(sectionId);

	if (items && items.length > 0) {

		// Create the social container
		const socialContainer = document.createElement('div');
		socialContainer.className = 'social_container';

		addSectionHeader(sectionId);

		items.forEach(item => {
			const itemElement = document.createElement('div');
			itemElement.className = 'social_information';

			const linkElement = document.createElement('a');
			linkElement.href = item.url;
			linkElement.className = 'social_link';

			const iconElement = document.createElement('i');
			iconElement.className = `fa fa-${item.name.toLowerCase()} social_icon`;

			const textNode = document.createTextNode(` ${item.name}`);

			linkElement.appendChild(iconElement);
			linkElement.appendChild(textNode);

			itemElement.appendChild(linkElement);
			section.appendChild(itemElement);
		});
	}
}

function displaySummary(sectionId, summary) {
	const section = document.getElementById(sectionId);
	if (summary) {
		addSectionHeader(sectionId);

		const summaryElement = document.createElement('p');
		summaryElement.className = 'summary';
		summaryElement.textContent = summary;
		section.appendChild(summaryElement);
	}
}

function displayExperience(sectionId, experiences) {
	const section = document.getElementById(sectionId);
	let previousCompany = null;

	if (experiences) {
		section.className = 'experience';
		addSectionHeader(sectionId);

		experiences.forEach(experience => {

			const isSameCompany = experience.company === previousCompany;

			if (!isSameCompany) {
				const titleElement = document.createElement('h3');
				titleElement.textContent = experience.company;
				section.appendChild(titleElement);
			}

			const subtitleElement = document.createElement('h4');
			subtitleElement.innerHTML = experience.position;
			section.appendChild(subtitleElement);


			if (experience.location) {
				const locationItem = document.createElement('p');
				locationItem.className = 'experience_location';
				locationItem.innerHTML = `${experience.location} ${experience.date}`;
				section.appendChild(locationItem);
			}


			if (experience.summary) {
				const summaryItem = document.createElement('p');
				summaryItem.className = 'experience_summary';
				summaryItem.innerHTML = experience.summary;
				section.appendChild(summaryItem);
			}

			if (experience.responsibilities && experience.responsibilities.length > 0) {
				const detailsList = document.createElement('ul');
				detailsList.className = 'experience_responsibilities';

				const responsibilitiesList = document.createElement('ul');
				experience.responsibilities.forEach(responsibility => {
					const responsibilityItem = document.createElement('li');
					responsibilityItem.textContent = responsibility;
					responsibilitiesList.appendChild(responsibilityItem);
				});
				detailsList.appendChild(responsibilitiesList);
				section.appendChild(detailsList);
			}

			// Update previous company information
			previousCompany = experience.company;
		});
	}
}



function displayEducation(sectionId, items) {
	const section = document.getElementById(sectionId);
	if (items) {
		addSectionHeader(sectionId);

		items.forEach(item => {
			const itemElement = document.createElement('div');

			// Add an h3 element for the degree
			const degreeElement = document.createElement('h3');
			degreeElement.textContent = item.degree;
			itemElement.appendChild(degreeElement);

			// Add an h4 element for the school and year
			const schoolYearElement = document.createElement('education');
			schoolYearElement.className = 'education_year';
			schoolYearElement.innerHTML = `${item.school || item.company}, ${item.year || item.date}`;
			itemElement.appendChild(schoolYearElement);

			// Add details only if location or summary is available
			if (item.location || item.summary) {
				const detailsList = document.createElement('ul');

				// Add location as a list item
				if (item.location) {
					const locationItem = document.createElement('li');
					locationItem.textContent = `Location: ${item.location}`;
					detailsList.appendChild(locationItem);
				}

				// itemElement.appendChild(detailsList);
			}

			section.appendChild(itemElement);
		});
	}
}


// Function to display skills
function displaySkills(sectionId, skills) {
	const section = document.getElementById(sectionId);
	if (skills) {
		addSectionHeader(sectionId);

		skills.forEach(skillCategory => {
			const categoryElement = document.createElement('div');
			categoryElement.className = 'skill_category';

			const categoryTitle = document.createElement('h3');
			categoryTitle.textContent = skillCategory.category;
			categoryElement.appendChild(categoryTitle);

			const itemList = document.createElement('div');
			skillCategory.items.forEach(skill => {
				// Create a code element for each skill name
				const codeElement = document.createElement('code');
				codeElement.textContent = skill;
				itemList.appendChild(codeElement);
			});

			categoryElement.appendChild(itemList);
			section.appendChild(categoryElement);
		});
	}
}

function displayLanguages(sectionId, languages) {
	const section = document.getElementById(sectionId);

	if (languages && languages.length > 0) {
		const headingElement = document.createElement('h2');
		headingElement.textContent = 'Languages';
		section.appendChild(headingElement);

		languages.forEach(language => {
			const container = document.createElement('div');
			container.className = 'languages_container';

			const languageElement = document.createTextNode(`${language.language}`);
			const starsContainer = document.createElement('div');
			starsContainer.className = 'languages_stars';

			for (let i = 0; i < 5; i++) {
				const starElement = document.createElement('i');
				starElement.className = `fa-solid fa-star${i < language.stars ? '' : ' languages_stars_checked'}`;
				starsContainer.appendChild(starElement);
			}

			container.appendChild(languageElement);
			container.appendChild(starsContainer);
			section.appendChild(container);
		});
	}
}