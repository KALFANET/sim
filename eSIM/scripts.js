
const accessCode = 'f7ef3e8d68d649c89c22e3bebb9fa0c0';
const secretKey = '9e90b43365f641038bb2c733ae73018d';
const apiUrl = 'https://api.esimaccess.com';

async function getPackages() {
    try {
        const response = await fetch(`${apiUrl}/packages`, {
            method: 'GET',
            headers: {
                'AccessCode': accessCode,
                'SecretKey': secretKey
            }
        });
        const packages = await response.json();
        const packagesDiv = document.getElementById('packages');
        const packageSelect = document.getElementById('package');
        packages.forEach(pkg => {
            const packageElement = document.createElement('div');
            packageElement.textContent = `Package: ${pkg.name} - ${pkg.price}`;
            packagesDiv.appendChild(packageElement);

            const optionElement = document.createElement('option');
            optionElement.value = pkg.id;
            optionElement.textContent = `${pkg.name} - ${pkg.price}`;
            packageSelect.appendChild(optionElement);
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
    }
}

async function purchasePackage(event) {
    event.preventDefault();
    const packageId = document.getElementById('package').value;
    const email = document.getElementById('email').value;

    if (!packageId || !validateEmail(email)) {
        document.getElementById('response').textContent = 'Please select a package and enter a valid email address.';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/purchase`, {
            method: 'POST',
            headers: {
                'AccessCode': accessCode,
                'SecretKey': secretKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packageId, email })
        });
        const result = await response.json();
        document.getElementById('response').textContent = `Purchase Status: ${result.status}`;
    } catch (error) {
        console.error('Error making purchase:', error);
        document.getElementById('response').textContent = 'An error occurred during the purchase. Please try again.';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('purchase-form').addEventListener('submit', purchasePackage);
getPackages();
