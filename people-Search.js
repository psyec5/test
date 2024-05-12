// After install the supabase-js module
import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with database
const supabase = createClient('https://rivlpfbaigqiknwvmkds.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdmxwZmJhaWdxaWtud3Zta2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3Mjg2NDksImV4cCI6MjAzMDMwNDY0OX0.U4fJKuBZFR-HpIdh526VOHYIBkMdTRr2-ZLcCBJF47U')

// Fetch data from the table
async function fetchData() {

    // Get search input for Name and License Number
    const searchInput = document.querySelector('.name').value;
    const searchInput2 = document.querySelector('.license').value;

    //Get search status tags
    const textContainer = document.getElementById('message');
    const p1 = textContainer.querySelector('p1');
    const p2 = textContainer.querySelector('p2');
    const p3 = textContainer.querySelector('p3');

    // Returns if both Name and License search bars are empty
    if (searchInput.trim() === '' && searchInput2.trim() === '') {
        console.log('Error fetching data');
        p1.style.display = 'none';
        p2.style.display = 'none';
        p3.style.display = 'block';
        return;
    }

    //returns if both search bars include data
    if (searchInput.trim() != '' && searchInput2.trim() != '') {
        console.log('Error incorrect input');
        p1.style.display = 'none';
        p2.style.display = 'none';
        p3.style.display = 'block';
        return;
    }


    // Define variables to store results
    let data = [];
    let data2 = [];

    // Filter based on the 'Name' column matching the search input
    if (searchInput.trim() !== '') {
        const { data: nameData, error: nameError } = await supabase
            .from('People')
            .select()
            .ilike('Name', `%${searchInput}%`);

        data = nameData;
    }

    // Filter based on the 'License Number' column matching the search input
    if (searchInput2.trim() !== '') {
        const { data: licenseData, error: licenseError } = await supabase
            .from('People')
            .select()
            .eq('LicenseNumber', searchInput2);

        data2 = licenseData;
    }

    // Check for errors and log results accordingly
    if ((data.length === 0 && data2.length === 0) || (data.error && data2.error)) {
        console.error('Error, cannot find user');
        p1.style.display = 'none';
        p2.style.display = 'block';
        p3.style.display = 'none';
    } 
    else if (data2.length === 0 || data2.error) {
        console.log('Filtered data:', data);
        DisplayResults(data);
        p1.style.display = 'block';
        p2.style.display = 'none';
        p3.style.display = 'none';
    } 
    else if (data.length === 0 || data.error) {
        console.log('Filtered data:', data2);
        DisplayResults(data2);
        p1.style.display = 'block';
        p2.style.display = 'none';
        p3.style.display = 'none';
    }

    }

//action listner
document.querySelector('#button1').addEventListener('click', fetchData);

//function to display results of valid data
function DisplayResults(data){

    //get the results container
    const resultsContainer = document.querySelector('.Results-container');

    //Clear the class
    if (resultsContainer.innerHTML != ''){
        resultsContainer.innerHTML = '';
    }

    // Loop through the data and create a grey square for each person's data
    data.forEach(person => {
        const personSquare = document.createElement('div');
        personSquare.classList.add('results-square');
    
        let personData = ''; // Empty string to store all person data
    
        // Concatenate all properties of the person into one string
        for (const key in person) {
            personData += `${key}: ${person[key]}<br>`; // Add each property with a line break
        }
    
        console.log(personData);

        // Assign the combined data to the personSquare div
        personSquare.textContent = personData;
        personSquare.innerHTML = personData;
    
        resultsContainer.appendChild(personSquare);
    });


}



