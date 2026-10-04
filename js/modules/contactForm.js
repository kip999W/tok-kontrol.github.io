const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const phoneInput = form.querySelector('#contact-phone');
  const nameInput = form.querySelector('#contact-name');
  const agreementInput = form.querySelector('[name="agreement"]');
  const submitBtn = form.querySelector('.contact__submit');
  const submitText = form.querySelector('.contact__submit-text');
  const submitLoader = form.querySelector('.contact__submit-loader');
  const successBlock = form.querySelector('.contact__success');

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';

    let result = '+7';
    if (digits.length > 1) result += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) result += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) result += '-' + digits.slice(7, 9);
    if (digits.length >= 9) result += '-' + digits.slice(9, 11);

    return result;
  };

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (!value.startsWith('7')) value = '7' + value;
    e.target.value = formatPhone(value);
  });

  phoneInput.addEventListener('focus', (e) => {
    if (!e.target.value) e.target.value = '+7 (';
  });

  phoneInput.addEventListener('blur', (e) => {
    if (e.target.value === '+7 (' || e.target.value === '+7') e.target.value = '';
  });

  const showError = (input, message) => {
    const errorEl = form.querySelector(`[data-error-for="${input.name}"]`);
    if (errorEl) errorEl.textContent = message;
    input.classList.add('contact__input--error');
  };

  const clearError = (input) => {
    const errorEl = form.querySelector(`[data-error-for="${input.name}"]`);
    if (errorEl) errorEl.textContent = '';
    input.classList.remove('contact__input--error');
  };

  const validateName = () => {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      showError(nameInput, 'Введите имя (минимум 2 символа)');
      return false;
    }
    clearError(nameInput);
    return true;
  };

  const validatePhone = () => {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length < 11) {
      showError(phoneInput, 'Введите корректный номер телефона');
      return false;
    }
    clearError(phoneInput);
    return true;
  };

  const validateAgreement = () => {
    if (!agreementInput.checked) {
      agreementInput.classList.add('contact__checkbox-input--error');
      return false;
    }
    agreementInput.classList.remove('contact__checkbox-input--error');
    return true;
  };

  nameInput.addEventListener('blur', validateName);
  phoneInput.addEventListener('blur', validatePhone);
  agreementInput.addEventListener('change', validateAgreement);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isAgreementValid = validateAgreement();

    if (!isNameValid || !isPhoneValid || !isAgreementValid) return;

    submitBtn.disabled = true;
    submitText.hidden = true;
    submitLoader.hidden = false;

    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: form.querySelector('[name="service"]').value,
      message: form.querySelector('[name="message"]').value.trim(),
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/vitya_maksimov_22@mail.ru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('FormSubmit error: ' + response.status);

      form.reset();
      
      form.querySelectorAll('.contact__input').forEach(input => {
        input.classList.remove('contact__input--error');
      });
      form.querySelectorAll('.contact__error').forEach(el => {
        el.textContent = '';
      });

      successBlock.hidden = false;

      setTimeout(() => {
        successBlock.hidden = true;
        submitBtn.disabled = false;
        submitText.hidden = false;
        submitLoader.hidden = true;
      }, 5000);

      console.log('✅ Заявка успешно отправлена через FormSubmit');

    } catch (error) {
      console.error('❌ Ошибка отправки:', error);
      submitBtn.disabled = false;
      submitText.hidden = false;
      submitLoader.hidden = true;
      alert('Произошла ошибка при отправке. Пожалуйста, позвоните нам напрямую.');
    }
  });
};

export { initContactForm };