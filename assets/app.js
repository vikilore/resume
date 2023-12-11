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
	document.documentElement.style.setProperty('--primary-color-alt', resume.primaryColorAlt || '#83C2EA');
	document.documentElement.style.setProperty('--secondary-color', resume.secondaryColor || '#34485d');
	displayContact('contact', resume.contact);
	displaySocial('social', resume.social);
	displaySummary('summary', resume.summary);
	displayEducation('education', resume.education);
	displayExperience('experience', resume.experience);
	displayPersonalDevelopment('personal-development', resume.personalDevelopment);
	displaySkills('skills', resume.skills);
	displayHobbies('hobbies', resume.hobbies);
	displayLanguages('languages', resume.languages);
}

// Function to display contact information
function displayContact(sectionId, contact) {
	const section = document.getElementById(sectionId);

	if (contact) {
		const contactElement = document.createElement('div');
		contactElement.className = 'contact_data';

		// Profile Image
		if (contact.image) {
			const imageElement = document.createElement('img');
			imageElement.src = contact.image;
			imageElement.alt = 'Icon picture';
			imageElement.className = 'avatar';
			imageElement.id = 'contact_img';
			contactElement.appendChild(imageElement);
		}

		// Name
		const nameElement = document.createElement('h1');
		nameElement.id = 'contact_title';
		nameElement.className = 'contact_title';
		nameElement.innerHTML = `${contact.name}`;
		contactElement.appendChild(nameElement);

		// Profession
		const professionElement = document.createElement('h3');
		professionElement.className = 'contact_profession';
		professionElement.textContent = contact.profession;
		contactElement.appendChild(professionElement);

		// Display contact information
		const info = displayContactInfo('contact_address', contact);
		contactElement.appendChild(info);
		section.appendChild(contactElement);
	}
}

// Function to display contact information (address)
function displayContactInfo(sectionId, contact) {
	const section = document.createElement('div');
	section.className = 'contact_address bd-grid';

	if (contact) {
		// Location
		if (contact.location) {
			const locationSpan = document.createElement('span');
			locationSpan.className = 'contact_information';
			const locationIcon = document.createElement('i');
			locationIcon.className = 'fa-solid fa-location-dot contact_icon';
			const locationText = document.createTextNode(` ${contact.location}`);
			locationSpan.appendChild(locationIcon);
			locationSpan.appendChild(locationText);
			section.appendChild(locationSpan);
		}

		// Email
		if (contact.email) {
			const emailSpan = document.createElement('span');
			emailSpan.className = 'contact_information';
			const emailLink = document.createElement('a');
			emailLink.href = `mailto:${contact.email}`;
			emailLink.className = 'contact_link';
			const emailIcon = document.createElement('i');
			emailIcon.className = 'fa-solid fa-envelope contact_icon';
			const emailText = document.createTextNode(` ${contact.email}`);
			emailLink.appendChild(emailIcon);
			emailLink.appendChild(emailText);
			emailSpan.appendChild(emailLink);
			section.appendChild(emailSpan);
		}

		// Phone
		if (contact.phone) {
			const phoneSpan = document.createElement('span');
			phoneSpan.className = 'contact_information';
			const phoneLink = document.createElement('a');
			phoneLink.href = `tel:${contact.phone}`;
			phoneLink.className = 'contact_link';
			const phoneIcon = document.createElement('i');
			phoneIcon.className = 'fa-solid fa-phone contact_icon';
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
	headingElement.textContent = sectionId.replace('-', " ");
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
				titleElement.id = 'experience_company';
				titleElement.className = 'experience_company';
				titleElement.textContent = experience.company;
				section.appendChild(titleElement);

				if (experience.summary) {
					const summaryItem = document.createElement('p');
					summaryItem.className = 'experience_summary';
					summaryItem.innerHTML = experience.summary;
					section.appendChild(summaryItem);
				}
			}

			const subtitleElement = document.createElement('h4');
			subtitleElement.innerHTML = experience.position;
			section.appendChild(subtitleElement);

			if (experience.location) {
				// Create a div to contain the location and date
				const locationDateContainer = document.createElement('div');
				locationDateContainer.className = 'location-date-container';

				// Create a span for the location
				const locationSpan = document.createElement('span');
				locationSpan.className = 'experience_location';
				locationSpan.innerHTML = experience.location;

				// Append the location span to the container
				locationDateContainer.appendChild(locationSpan);

				// Create a span for the date
				const dateSpan = document.createElement('span');
				dateSpan.className = 'experience_date';
				dateSpan.innerHTML = `( ${experience.date} )`;

				// Append the date span to the container
				locationDateContainer.appendChild(dateSpan);

				// Append the locationDateContainer to subtitleElement
				subtitleElement.appendChild(locationDateContainer);
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

// Function to display personal development entries
function displayPersonalDevelopment(sectionId, personalDevelopments) {
	const section = document.getElementById(sectionId);

	if (personalDevelopments && personalDevelopments.length > 0) {
		addSectionHeader(sectionId);

		personalDevelopments.forEach(entry => {
			const entryContainer = document.createElement('div');
			entryContainer.className = 'personal-development-entry';

			// Display date
			const dateElement = document.createElement('p');
			dateElement.className = 'personal-development-date';
			dateElement.textContent = entry.date;
			entryContainer.appendChild(dateElement);

			// Display title
			const titleElement = document.createElement('h3');
			titleElement.className = 'personal-development-title';
			titleElement.textContent = entry.title;
			entryContainer.appendChild(titleElement);

			// Display organization
			const organizationElement = document.createElement('p');
			organizationElement.className = 'personal-development-organization';
			organizationElement.textContent = entry.organization;
			entryContainer.appendChild(organizationElement);

			// Display summary
			const summaryElement = document.createElement('p');
			summaryElement.className = 'personal-development-summary';
			summaryElement.textContent = entry.summary;
			entryContainer.appendChild(summaryElement);

			// Append the entry to the section
			section.appendChild(entryContainer);
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
			degreeElement.className = 'education_degree';
			itemElement.appendChild(degreeElement);

			// Add an h4 element for the school and year
			const schoolYearElement = document.createElement('education');
			schoolYearElement.className = 'education_year';
			schoolYearElement.innerHTML = `${item.school || item.company}, ${item.year || item.date}`;
			itemElement.appendChild(schoolYearElement);

			// Add location as a list item
			if (item.location) {
				const locationItem = document.createElement('p');
				locationItem.textContent = item.location;
				locationItem.className = 'education_location';
				itemElement.appendChild(locationItem);
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

// Function to display hobbies
function displayHobbies(sectionId, hobbies) {
	const section = document.getElementById(sectionId);

	if (hobbies && hobbies.length > 0) {
		addSectionHeader(sectionId);

		const itemList = document.createElement('div');
		itemList.id = 'hobbies_items';
		itemList.className = 'hobbies_items';

		hobbies.forEach(hobby => {
			// Create a code element for each hobby
			const codeElement = document.createElement('code');
			codeElement.textContent = hobby;
			itemList.appendChild(codeElement);
		});

		section.appendChild(itemList);
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