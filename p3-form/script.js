document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('feet')) {
        document.getElementById('feet').value = localStorage.getItem('feet');
    }
    if (localStorage.getItem('inches')) {
        document.getElementById('inches').value = localStorage.getItem('inches');
    }
    if (localStorage.getItem('weight')) {
        document.getElementById('weight').value = localStorage.getItem('weight');
    }
    if (localStorage.getItem('gender')) {
        document.getElementById(localStorage.getItem('gender')).checked = true;
    }
});

function calculateBMI() {
    const feet = parseFloat(document.getElementById('feet').value);
    const inches = parseFloat(document.getElementById('inches').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    localStorage.setItem('feet', feet);
    localStorage.setItem('inches', inches);
    localStorage.setItem('weight', weight);
    localStorage.setItem('gender', gender);

    if (feet > 0 && inches >= 0 && weight > 0) {
        const height = (feet * 12) + inches; 
        const bmi = (weight / (height * height)) * 703;
        let category;

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        document.getElementById('result').innerText = `Your BMI is ${bmi.toFixed(1)} (${category})`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid information.';
    }
}

function resetForm() {
    document.getElementById('bmi-form').reset();
    localStorage.removeItem('feet');
    localStorage.removeItem('inches');
    localStorage.removeItem('weight');
    localStorage.removeItem('gender');
    document.getElementById('result').innerText = '';
}
