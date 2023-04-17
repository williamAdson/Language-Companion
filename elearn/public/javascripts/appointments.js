document.addEventListener('DOMContentLoaded', function(){
    // toggle between auto and manual form
    const autoForm = document.querySelector('.auto-appointment-form');
    const manualForm = document.querySelector('.manual-appointment-form');
    const manualBtn = document.querySelector('.show-man');
    const autoBtn = document.querySelector('.show-auto');

    // manual form invisible by default
    manualForm.style.display = 'none';

    // show manual form
    const showManualForm = function(e){
        autoForm.style.display = 'none';
        manualForm.style.display = 'block';
    }
    const showAutoForm = function(){
        manualForm.style.display = 'none';
        autoForm.style.display = 'block';
    }
    manualBtn.onclick = showManualForm;
    autoBtn.onclick = showAutoForm;
})