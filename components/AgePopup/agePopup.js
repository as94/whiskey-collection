const agePopup = () => `
<link rel="stylesheet" href="./components/AgePopup/agePopup.css" />
<div class="age-popup-background" id="age-popup-background">
    <div class="age-popup">
        <h1 class="h1">Whiskey Collection</h1>
        <h2 class="h2">Welcome! You must be +18 to enter</h2>
        <h3 class="h3">Are you 18 years old or older?</h3>
        <div class="answers">
            <button class="yes-btn body-semibold" data-no-select>Yes</button>
            <button class="yes-btn body-semibold" data-no-select>No</button>
        </div>
        <img src="./components/AgePopup/logo-light-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
    </div>
</div>
`;

const element = document.getElementById('agePopup');
if (element) {
  document.getElementById('agePopup').innerHTML = agePopup();
}
