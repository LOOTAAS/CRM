(() => {

  const customSelect = (boxContact, dataValue,) => {

    //Получаем все "select" по селектору
    const selects = [boxContact.querySelector('.select')]
    //переборка по полученным "select"
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i]
      //получаем все "option" внутри "select"
      const options = select.querySelectorAll('option')

      //создаем кастомный "select"
      const cSelect = document.createElement('div')
      const cSelectList = document.createElement('div')
      const cSelectCurrent = document.createElement('div')

      // select.setAttribute('tabindex', '1')
      //задем классы и атрибуты кастомному "select"
      cSelect.className = 'custom-select'
      cSelectList.className = 'custom-select__list custom-scrollbar'
      cSelectCurrent.className = 'custom-select__current'

      //создаем вложенность созданных элементов
      cSelect.append(cSelectCurrent, cSelectList)

      //добавляем кастоный "select" сразу после оргинального "select"
      select.after(cSelect)

      //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастоного "select"
      const createCustomDom = (x, y) => {
        let selectItems = ''
        for (var i = 0; i < options.length; i++) {
          selectItems += '<div class="custom-select__item" value="' + options[i].value + '">' + options[i].text + '</div>'
        }
        cSelectList.innerHTML = selectItems
        x(), y();
      }

      //открываем-закрываем выпадающий список по клику
      const toggleClass = () => { cSelect.classList.toggle('custom-select--show') }

      //присваиваем текстовое первое значение "option" в кастомном "select"
      const currentTextValue = () => {
        let oldSelects = boxContact.querySelector('.modal__select')
        for (var i = 0; i < oldSelects.length; i++) {

          // если значение старого селекта равно старому оптионсу то заносим тест из оптионс
          if (oldSelects[i].value == oldSelects.value) {

            // текст из старого селекта для его вывода в Кастомный
            let oldSelectText = oldSelects[i].textContent

            // присваиваю атрибут выбранного option
            cSelectCurrent.setAttribute('value', `${oldSelects.value}`)
            // присваиваю текст для селекта
            cSelectCurrent.textContent = oldSelectText
          }
        }
      }


      //получаем и задаем значения text/value
      const currentValue = () => {
        const items = cSelectList.children
        for (var el = 0; el < items.length; el++) {
          let selectValue = items[el].getAttribute('value')
          let selectText = items[el].textContent
          items[el].addEventListener('click', () => {
            cSelect.classList.remove('custom-select--show')
            cSelectCurrent.textContent = selectText
            select.value = selectValue
            cSelectCurrent.setAttribute('value', select.value)
            console.log(select.value, 'select.value')
            validInputInValueforSelect(boxContact)
            // console.log(selectText, 'selectText')
          })
        }
      }

      const desctopFn = () => {
        cSelectCurrent.addEventListener('click', toggleClass)
      }

      const mobileFn = () => {
        for (let j = 0; j < selects.length; j++) {
          let mobileSelect = selects[j]
          mobileSelect.addEventListener('change', () => {
            mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value;
          })
        }
      }

      createCustomDom(currentTextValue, currentValue)


      //закрываем выпадающий список по клику вне области кастомного селекта
      document.addEventListener('mouseup', (e) => {
        if (!cSelect.contains(e.target)) cSelect.classList.remove('custom-select--show')
      })

      detectmob(mobileFn, desctopFn)

      function detectmob(x, y) {
        if (navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ) {
          x();
          console.log('mobile')
        }
        else {
          y();
          console.log('desktop')
        }
      }
    }

    validInputInValueforSelect(boxContact)

  }

  // валидация Доп.контактов
  const validInputInValueforSelect = (boxContact) => {
    let input = boxContact.querySelector('.modal-input')
    function validPhone () {
      // для поиска по уникальному значению
      let select = boxContact.querySelector('.custom-select__current').getAttribute('value').slice(0, -2)
      let selectObj = boxContact
      // текст ошибки
      let alert = document.createElement('p')
      alert.classList.add('input-alert', 'input-alert-select')
      alert.textContent = 'Формат - 8 999 999 99 99'
      document.querySelectorAll('.input-alert-select').forEach(function (alert) {
        alert.remove()
      })

      if (select == 'phone' || select == 'subtract') {
        input.value = input.value.replace(/[^\d]/g,'').substr(0, 11)
        onButton()
        if (input.value.length < 11 || input.value.length > 11) {
          console.log("no valid")
          selectObj.append(alert)
          selectObj.classList.remove('input-validate-select-green')
          selectObj.classList.add('input-validate-select-red')
        } else {
          console.log("valid")
          alert.remove()
          selectObj.classList.add('input-validate-select-green')
          selectObj.classList.remove('input-validate-select-red')
        }
      } else {
        input.removeEventListener("keyup", validPhone)
      }
    }
    validPhone()
    input.addEventListener("keyup", validPhone)
  }

  // таймер
  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    }
  }

  // Создаю шапку сайта
  const createHeaderCRM = () => {
    const header = document.createElement('header');
    const boxInHeader = document.createElement('div');
    const boxForLogo = document.createElement('span');
    const inputSearch = document.createElement('input');

    header.classList.add('container-header',);
    boxInHeader.classList.add('box-header',);
    boxForLogo.classList.add('logo');
    inputSearch.classList.add('input', 'input-search')

    inputSearch.setAttribute('placeholder', 'Введите запрос')

    boxInHeader.append(boxForLogo)
    boxInHeader.append(inputSearch)
    header.append(boxInHeader)

    return header
  }


  // Создаю тело сайта
  const createMainCRM = () => {
    const mainBox = document.createElement('div')
    const mainInBox = document.createElement('div')
    const header = document.createElement('h1');
    const list = document.createElement('ul');

    let headerItem = ''

    headerItem = `
    <li class="main__item-header main__item">
      <p class="main__sort-button main-item-descriprion" id="header-sort-1">ID</p>
      <p class="main__sort-button main-item-descriprion" id="header-sort-2">Фамилия Имя Отчество</p>
      <p class="main__sort-button main-item-descriprion" id="header-sort-3">Дата и время создания</p>
      <p class="main__sort-button main-item-descriprion" id="header-sort-4">Последние изменения</p>
      <p class="main__sort-button main-item-descriprion" id="header-sort-5">Контакты</p>
      <p class="main__sort-button main-item-descriprion" id="header-sort-6">Действия</p>
    </li>
    `

    mainBox.classList.add('container-main', 'main')
    mainInBox.classList.add('main-box')
    header.classList.add('main__header')
    list.classList.add('main__list')


    header.textContent = 'Клиенты'
    list.innerHTML = headerItem

    mainInBox.append(header)
    mainInBox.append(list)

    mainBox.append(mainInBox)

    return mainBox
  }

  // удаляю объект по id из сервера
  async function deleteClientAfterConfirm(itemID, itemsNode, buttonsInModal) {
    async function deleteTodoItem() {
      const response = await fetch(`http://localhost:3000/api/clients/${itemID}`, {
        method: 'DELETE',
      });
      if (response.status === 404) {

        console.log('Не удалось удалить дело, так как его не существует');
        const data = await response.json();
        console.log(data);
      }
    }
    deleteTodoItem()
    itemsNode.remove()
    buttonsInModal.classList.remove('modal-delete--visable')
  }

  // Модальное окно Удаления
  let modalDelete = () => {
    let areaModal = document.createElement('div')
    let boxModal = document.createElement('div')
    let closeButtonModal = document.createElement('span')
    let header = document.createElement('h1')
    let description = document.createElement('p')
    let buttonDelite = document.createElement('button')
    let buttonCansel = document.createElement('button')
    let shadowaModal = document.createElement('div')

    areaModal.classList.add('modal-delete', 'modal-delete-disable')
    boxModal.classList.add('modal-delete__box')
    closeButtonModal.classList.add('modal-delete_close', 'modal-delite-closes-for-event')
    header.classList.add('modal-delete__header')
    description.classList.add('modal-delete__description')
    buttonDelite.classList.add('modal-delete__button', 'modal-delete__button-delete')
    buttonCansel.classList.add('modal-delete__button', 'modal-delete__button-cansel', 'modal-delite-closes-for-event')
    shadowaModal.classList.add('modal-sahodow', 'modal-delite-closes-for-event')

    header.textContent = 'Удалить клиента'
    description.textContent = 'Вы действительно хотите удалить данного клиента?'
    buttonDelite.textContent = 'Удалить'
    buttonCansel.textContent = 'Отмена'

    let closesBtnsArray = []
    closesBtnsArray.push(closeButtonModal)
    closesBtnsArray.push(buttonCansel)
    closesBtnsArray.push(shadowaModal)

    closesBtnsArray.forEach(closesBtns => {
      closesBtns.addEventListener('click', e => {
        areaModal.classList.remove('modal-delete--visable')
      })
    });



    boxModal.append(closeButtonModal)
    boxModal.append(header)
    boxModal.append(description)
    boxModal.append(buttonDelite)
    boxModal.append(buttonCansel)
    areaModal.append(shadowaModal)
    areaModal.append(boxModal)

    return areaModal
  }


  // Кнопка добавить "Добавить клиента"
  const createButtonAddNewClient = () => {
    const button = document.createElement('button')
    button.classList.add('button-create-client', 'button-create-modal')
    button.textContent = 'Добавить клиента'

    return button
  }

  // Для Модального окна!! функция создает кнопку с логикой "Добавить клиента"
  const createBoxAddContact = (boxAddContact) => {
    let buttonAddContact = document.createElement('button')
    buttonAddContact.classList.add('button-add-contact')
    buttonAddContact.textContent = 'Добавить контакт'

    // Костыль для кастомного селекта, что бы нормально отображались списки (не перекрывали нижние верхних)
    let counterForZIndex = 100

    createContactItem(buttonAddContact, counterForZIndex)

    boxAddContact.append(buttonAddContact)

    return boxAddContact
  }

  // Для Модального окна!! cсоздания контакта клиента
  function createContactItem(buttonAddContact, counterForZIndex) {
    buttonAddContact.addEventListener('click', (e) => {



      let boxForForm = document.createElement('div')

      let divSelect = document.createElement('div')
      let labelSelect = document.createElement('label')
      let select = document.createElement('select')
      let description = document.createElement('option')
      let optionPhone = document.createElement('option')
      let optionAdditionalPhone = document.createElement('option')
      let optionMail = document.createElement('option')
      let optionVK = document.createElement('option')
      let optionFB = document.createElement('option')

      let inputForSelect = document.createElement('input')

      let buttonDeleteBox = document.createElement('button')
      let spanForButtonDelite = document.createElement('span')

      boxForForm.classList.add('modal__box-for-select-input')
      boxForForm.setAttribute('id', `box-${counterCreatedContacts}`)
      divSelect.classList.add('select-wrap')
      select.classList.add('modal__select', 'select')
      select.setAttribute('id', `box-${counterCreatedContacts}`)
      description.classList.add('modal__select-description')
      optionPhone.classList.add('modal__select-option')
      optionAdditionalPhone.classList.add('modal__select-option')
      optionMail.classList.add('modal__select-option')
      optionVK.classList.add('modal__select-option')
      optionFB.classList.add('modal__select-option')
      inputForSelect.classList.add('modal-input')
      buttonDeleteBox.classList.add('modal-close-button')
      spanForButtonDelite.classList.add('modal-close-button-picture')

      description.setAttribute('value', `description-${counterCreatedContacts}`)
      optionPhone.setAttribute('value', `phone-${counterCreatedContacts}`)
      optionAdditionalPhone.setAttribute('value', `subtract-${counterCreatedContacts}`)
      optionMail.setAttribute('value', `email-${counterCreatedContacts}`)
      optionVK.setAttribute('value', `vk-${counterCreatedContacts}`)
      optionFB.setAttribute('value', `fb-${counterCreatedContacts}`)

      description.textContent = 'Выберите Контакт'
      optionPhone.textContent = 'Телефон'
      optionAdditionalPhone.textContent = 'Доп. телефон'
      optionMail.textContent = 'Email'
      optionVK.textContent = 'Vk'
      optionFB.textContent = 'Facebook'

      // В будущем для валидации
      // select.addEventListener('change', () => {
      //   let typeForInput = select.value

      //   if (typeForInput.includes('phone')) {
      //     inputForSelect.setAttribute('type', 'number')
      //   }
      //   if (typeForInput.includes('mail')) {
      //     inputForSelect.setAttribute('type', 'color')
      //   }

      // });
      // select.addEventListener("change", function() {
      //   const element = document.querySelector('#select');
      //   alert(element.value)
      // });

      select.append(description)
      select.append(optionPhone)
      select.append(optionAdditionalPhone)
      select.append(optionMail)
      select.append(optionVK)
      select.append(optionFB)

      labelSelect.append(select)
      divSelect.append(labelSelect)


      // Костыль для кастомного селекта, что бы нормально отображались списки (не перекрывали нижние верхних)
      boxForForm.style.zIndex = counterForZIndex
      --counterForZIndex

      boxForForm.append(divSelect)

      boxForForm.append(inputForSelect)
      buttonDeleteBox.append(spanForButtonDelite)
      boxForForm.append(buttonDeleteBox)

        // для плавного появления блока __
        ; (debounce(() => {

          boxForForm.classList.add('modal__box-for-select-input-active')

        }, 200))()
      // ________________________________


      buttonAddContact.classList.add('button-add-contact-after-click')

      ++counterCreatedContacts

      // удалю блок с иснупутами
      buttonDeleteBox.addEventListener('click', () => {
        boxForForm.classList.add('modal__box-for-select-input-deleted')
        buttonDeleteBox.parentNode.remove()
        --counterCreatedContacts
        if (counterCreatedContacts < 10) {
          buttonAddContact.classList.remove('button-add-contact-disabled')
        } else {
          buttonAddContact.classList.add('button-add-contact-disabled')
        }
        if (counterCreatedContacts == 0) {
          buttonAddContact.classList.remove('button-add-contact-after-click')
        }
      })

      // console.log(counterCreatedContacts)


      buttonAddContact.before(boxForForm)
      // Убираю кнопку после если создано 10 элементов
      if (counterCreatedContacts < 10) {
        buttonAddContact.classList.remove('button-add-contact-disabled')
      } else {
        buttonAddContact.classList.add('button-add-contact-disabled')
      }
      // кастомный селект
      customSelect(boxForForm,)
    })
  }



  // Модальное окно "Добавить клиента"
  const modalCreateClient = () => {


    let areaModal = document.createElement('div')
    let boxModal = document.createElement('div')
    let closeButtonModal = document.createElement('span')
    let header = document.createElement('h1')

    let form = document.createElement('form')

    // создаю инпуты с псевдо plaseholder

    let pseudoLastName = () => {
      let pseudoLabel = document.createElement('label')
      let inputLastName = document.createElement('input')

      // управление placeholder (появление, исчезание)
      // controlInputsPlaceholder(inputLastName)

      let pseudoPlaceholderBox = document.createElement('div')
      let pseudoPlaceholderStar = document.createElement('span')

      pseudoLabel.classList.add('modal-create__label-for-placeholder')
      inputLastName.classList.add('modal-create__input', 'modal-create__input-lastname')

      pseudoPlaceholderBox.classList.add('modal-create__place_holder')
      pseudoPlaceholderStar.classList.add('modal-create__place_holder-star')

      pseudoPlaceholderBox.textContent = 'Фамилия'
      pseudoPlaceholderStar.textContent = '*'


      pseudoPlaceholderBox.append(pseudoPlaceholderStar)
      pseudoLabel.append(inputLastName)
      pseudoLabel.append(pseudoPlaceholderBox)

      return pseudoLabel
    }

    let pseudoFirstName = () => {
      let pseudoLabel = document.createElement('label')
      let inputFirstName = document.createElement('input')

      // управление placeholder (появление, исчезание)
      // controlInputsPlaceholder(inputFirstName)

      let pseudoPlaceholderBox = document.createElement('div')
      let pseudoPlaceholderStar = document.createElement('span')

      pseudoLabel.classList.add('modal-create__label-for-placeholder')
      inputFirstName.classList.add('modal-create__input', 'modal-create__input-firstname')

      pseudoPlaceholderBox.classList.add('modal-create__place_holder')
      pseudoPlaceholderStar.classList.add('modal-create__place_holder-star')

      pseudoPlaceholderBox.textContent = 'Имя'
      pseudoPlaceholderStar.textContent = '*'

      pseudoPlaceholderBox.append(pseudoPlaceholderStar)
      pseudoLabel.append(inputFirstName)
      pseudoLabel.append(pseudoPlaceholderBox)

      return pseudoLabel
    }

    let pseudoMiddleName = () => {
      let pseudoLabel = document.createElement('label')
      let inputMiddleName = document.createElement('input')
      let pseudoPlaceholderBox = document.createElement('div')


      // управление placeholder (появление, исчезание)
      // controlInputsPlaceholder(inputMiddleName)

      pseudoLabel.classList.add('modal-create__label-for-placeholder')
      pseudoPlaceholderBox.classList.add('modal-create__place_holder')
      inputMiddleName.classList.add('modal-create__input', 'modal-create__input-middlename')

      pseudoPlaceholderBox.textContent = 'Отчество'

      pseudoLabel.append(inputMiddleName)
      pseudoLabel.append(pseudoPlaceholderBox)

      return pseudoLabel
    }


    // ______

    // кнока  "Добавить контакт"
    let boxAddContact = document.createElement('div')
    boxAddContact.classList.add('modal-create__box-add-contact')
    boxAddContact = createBoxAddContact(boxAddContact)

    let buttonCreate = document.createElement('button')
    let buttonCansel = document.createElement('button')
    let shadowaModal = document.createElement('div')

    areaModal.classList.add('modal-create', 'modal-create-disable')
    boxModal.classList.add('modal-create__box')
    closeButtonModal.classList.add('modal-delete_close', 'modal-create__close-button', 'modal-create-closes-for-event')
    header.classList.add('modal-create__header')

    form.classList.add('modal-create__form')

    buttonCreate.classList.add('modal-create__button-create', 'modal-create__button-create-disable')
    buttonCreate.setAttribute('disabled', 'disabled')
    buttonCansel.classList.add('modal-create__button-cansel', 'modal-create-closes-for-event')


    shadowaModal.classList.add('modal-create-sahodow', 'modal-create-closes-for-event')

    header.textContent = 'Новый клиент';

    buttonCreate.textContent = 'Сохранить'
    buttonCansel.textContent = 'Отмена'

    boxModal.append(closeButtonModal)
    boxModal.append(header)
    form.append(pseudoLastName())
    form.append(pseudoFirstName())
    form.append(pseudoMiddleName())
    boxModal.append(form)
    boxModal.append(boxAddContact)
    boxModal.append(buttonCreate)
    boxModal.append(buttonCansel)
    areaModal.append(shadowaModal)
    areaModal.append(boxModal)

    return areaModal
  }

  // Валидация инпутов и появление placeholder
  const validateModalCreateClient = (MovdalCreateClient) => {
    MovdalCreateClient.forEach(parseInput => {
      console.log('open modal')
      // функция добавляет собития в инпуты для управления placeholders
      parseInput.addEventListener('keyup', () => {
        //  Сама валидация
        checkInputs(parseInput)
      })
    })
  }
  //  Сама валидация
  const checkInputs = (parseInput) => {
    controlInputsPlaceholder(parseInput)
    // Делаю первую букву заглавной, не меньше 3 и не больше 10 символов, нельзя ничего кроме букв
    parseEmployeesData(parseInput)
    // переключататель ошибок
    checkInputAlert(parseInput)
    // включение кнопки
    onButton()
  }

  // функция добавляет собития в инпуты для управления placeholders
  function controlInputsPlaceholder(parseInput) {
    // debugger
    // console.log(parseInput.value, 'parseInput внутри')
    if (parseInput.value.length > 0) {

      parseInput.parentNode.childNodes[1].style.opacity = 0
    } else {

      parseInput.parentNode.childNodes[1].style.opacity = 1
    }
  }


  // Валидация (Делаю первую букву заглавной)
  // Если все верно, включаю кнопку
  function parseEmployeesData(parseInput) {

    if (parseInput.value != []) {

      // Берем 1 букву, делаем заглавной, соединяем начальное значение без первой буквы
      let result = parseInput.value.charAt(0).toUpperCase() + parseInput.value.slice(1);
      parseInput.value = result.replace(/[^a-zа-яё]/gi, '');
      if (parseInput.value.length < 3 && parseInput.value !== "" || parseInput.value.length > 10) {
        parseInput.classList.remove('input-validate-green')
        parseInput.classList.add('input-validate-red')
      } else {
        // console.log(parseInput, 'parseInput yes')
        parseInput.classList.add('input-validate-green')
        parseInput.classList.remove('input-validate-red')
      }
    } else {
      parseInput.classList.remove('input-validate-green')
      parseInput.classList.add('input-validate-red')

    }
  }

  // вывод оишбки в инпутах
  const checkInputAlert = (parseInput) => {

    let alert = document.createElement('p')
    alert.classList.add('input-alert')
    document.querySelectorAll('.input-alert').forEach(function (alert) {
      alert.remove()
    })
    // console.log(parseInput.value.length)

    switch (true) {
      case (parseInput.classList.contains('input-validate-green')):
        alert.remove()
        break
      case (parseInput.value.length < 3 || parseInput.value.length > 10):
        alert.textContent = 'Не меньше 3-х и не больше 10 символов'
        parseInput.parentNode.append(alert)
        break
      // case (parseInput.classList.contains('modal-create__input-lastname').value.length == 0 || parseInput.classList.contains('modal-create__input-middlename').value.length == 0):
      //   alert.textContent = 'Обязательное поле для заполнение'
      //   parseInput.after(alert)
      //   break
    }

  }




  // включение кнопки
  const onButton = () => {
    let selectorsOnButton = document.querySelectorAll('.input-validate-green')
    let selectorsSelectOnButton = document.querySelectorAll('.input-validate-select-red')
    let buttoninModulCreate = document.querySelector('.modal-create__button-create')
    console.log(selectorsSelectOnButton, 'asdasd')

    if (selectorsOnButton.length >= 2 && selectorsSelectOnButton.length == 0) {
      buttoninModulCreate.classList.remove('modal-create__button-create-disable')
      buttoninModulCreate.removeAttribute("disabled", "on")
      // удаляю значения в инпутах
    } else {

      buttoninModulCreate.classList.add('modal-create__button-create-disable')
      buttoninModulCreate.setAttribute("disabled", "disabled")

    }
    return selectorsOnButton
  }

  // для форматированя даты при вывводе контакта ____________________________
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('.');
  }
  // _____________________________________________________

  // для форматированя время при выводе контакта ____________________________
  const getTime = (value) => {
    let hour = value.getHours()
    let minute = value.getMinutes()

    if (minute < 10) {
      minute = '0' + minute.toString()
    }
    value = [hour, minute].join(':')
    return value.toString().padStart(2, '0');
  }
  // _____________________________________________________


  // Кнопка удаления клиента которая переходит в модалку
  const buttonDeleteClient = async (buttonDelete) => {


    await buttonDelete.addEventListener('click', (e) => {
      // e.preventDefault()


      let itemsNode = buttonDelete.parentNode
      let itemID = itemsNode.childNodes[0].textContent

      // для определения какую кнопку нажали в модалке
      let buttonsInModal = document.querySelector('.modal-delete-disable')

      // включаю модалку
      buttonsInModal.classList.add('modal-delete--visable')

      document.querySelector('.modal-delete__button-delete').addEventListener('click', (e) => {
        deleteClientAfterConfirm(itemID, itemsNode, buttonsInModal)
      })


    })
    return buttonDelete.textContent = 'Удалить'


  }

  // прохожусь по объекту Contacts из сервера и реализую логику (И вывожу контакт)
  const entryContacts = (contacts, contactsBox) => {


    // для вывода контактов ________________________________
    function createContact(type, value) {
      const itemContact = document.createElement('li')
      const picContact = document.createElement('span')
      const tooltipType = document.createElement('p')
      const tooltipValue = document.createElement('p')

      itemContact.classList.add('main__item-contact', `main__item-contact-${type}`)
      picContact.classList.add('main__items-contact-tooltip')
      tooltipType.classList.add('main__items-contact-tooltip-type')
      tooltipValue.classList.add('main__items-contact-tooltip-value')

      switch (true) {
        case (type == 'vk'):
          tooltipType.innerText = 'Вконтакте:'
          break
        case (type == 'fb'):
          tooltipType.innerText = 'Facebook:'
          break
        case (type == 'phone'):
          tooltipType.innerText = 'Телефон:'
          break
        case (type == 'email'):
          tooltipType.innerText = 'Почта:'
          break
        case (type == 'subtract'):
          tooltipType.innerText = 'Доп. телефон:'
          break
      }
      // tooltipType.innerText = `${type.charAt(0).toUpperCase() + type.slice(1)}:`
      tooltipValue.innerText = `${value}`

      picContact.append(tooltipType)
      picContact.append(tooltipValue)
      itemContact.append(picContact)



      return itemContact
    }
    // кладу контакты в Ul переменную
    function conclusionContacts(contact, contactsBox) {
      if (contact.type === 'vk') {
        contactsBox.append(createContact(contact.type, contact.value))
        return contactsBox
      }
      if (contact.type === 'fb') {
        contactsBox.append(createContact(contact.type, contact.value))
        return contactsBox
      }
      if (contact.type === 'phone') {
        contactsBox.append(createContact(contact.type, contact.value))
        return contactsBox
      }
      if (contact.type === 'email') {
        contactsBox.append(createContact(contact.type, contact.value))
        return contactsBox
      }
      if (contact.type === 'subtract') {
        contactsBox.append(createContact(contact.type, contact.value))
        return contactsBox
      }
    }


    // кладу контакты в Ul переменную и добавля класс Disable для лишних иконок

    function conclusionContactsInviseContacts(contact, contactsBox) {
      if (contact.type === 'vk') {
        let addClassForButton = createContact(contact.type, contact.value)
        addClassForButton.classList.add('contact-item-disabled')
        contactsBox.append(addClassForButton)
        return contactsBox
      }
      if (contact.type === 'fb') {
        let addClassForButton = createContact(contact.type, contact.value)
        addClassForButton.classList.add('contact-item-disabled')
        contactsBox.append(addClassForButton)
        return contactsBox
      }
      if (contact.type === 'phone') {
        let addClassForButton = createContact(contact.type, contact.value)
        addClassForButton.classList.add('contact-item-disabled')
        contactsBox.append(addClassForButton)
        return contactsBox
      }
      if (contact.type === 'email') {
        let addClassForButton = createContact(contact.type, contact.value)
        addClassForButton.classList.add('contact-item-disabled')
        contactsBox.append(addClassForButton)
        return contactsBox
      }
      if (contact.type === 'subtract') {
        let addClassForButton = createContact(contact.type, contact.value)
        addClassForButton.classList.add('contact-item-disabled')
        contactsBox.append(addClassForButton)
        return contactsBox
      }
    }
    // сортирую все контакты по шаблону
    function sotrContact(sortContactArray) {

      let arrayPattern = ['vk', 'fb', 'phone', 'email', 'subtract']
      let sortByPatter = [...sortContactArray]
      sortByPatter.forEach(function (_el, _i, elSort) {
        elSort.filter(() => {
          return elSort.includes(arrayPattern)
        })
      })
    }


    // счетчик для появления 4 элементов
    let counter = 0
    let counterForID = 0
    // счетчик для подсчета сколько скрыто элементов
    let counterInviseContacts = 0



    contacts.map(contact => {
      ++counterForID
      if (contacts.length < 5) {
        conclusionContacts(contact, contactsBox)
      } else {
        if (counter < 4) {
          ++counter
          // создаю элемнты как обычно
          conclusionContacts(contact, contactsBox)

          // скрываю элементы
        } else {
          //  c 5 элемента добаляется класс disble - скрывает элементы
          conclusionContactsInviseContacts(contact, contactsBox)
          ++counterInviseContacts
        }
      }
    })
    // Сортировка контактов по шаблону (из макета)
    sotrContact(contactsBox.childNodes)
    // если контактов больше 4 то мы создаем кнопку на клик которой они снова появляются
    if (contacts.length > 4) {
      // кнопка открывающая други елементы
      let buttonOpenAllItems = document.createElement('span')
      buttonOpenAllItems.classList.add('main__item-contact', 'main__item-contact-button')
      buttonOpenAllItems.textContent = `+${counterInviseContacts}`
      buttonOpenAllItems.setAttribute('id', `counter-delete-${counterForID}`)

      buttonOpenAllItems.addEventListener('click', e => {
        neighboringElements = e.target.parentNode
        neighboringElements.querySelectorAll('.contact-item-disabled').forEach((removeClass) => {
          removeClass.classList.remove('contact-item-disabled')
          buttonOpenAllItems.remove()

        })
      })
      contactsBox.append(buttonOpenAllItems)
    }
  }

  // _____________________________________________________

  // Вывод всех клиентов из сервера
  const outputItemsFromApi = async () => {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();

    // console.log(data, 'datadfsdf')
    data.map(client => {
      // кладу всех клиентов ниже заголовков
      document.querySelector(".main__item-header").after(outputItem(client))
    })
    return data
  }

  // Вывод одного клиента из сервера для добавления нового
  const outputItemFromApi = async () => {
    // debugger
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    const dataLastArray = await data[data.length - 1]
    document.querySelector(".main__item-header").after(outputItem(dataLastArray))
  }

  // Вывод одного клиента из сервера для добавления нового
  const outputItemFromApiChangeClient = async (itemID, itemsNode) => {
    const response = await fetch(`http://localhost:3000/api/clients/${itemID}`);
    const data = await response.json();
    console.log(data, 'изменияемый клиент')
    itemsNode.after(outputItem(data))
  }

  // Вывод клиента
  const outputItem = (client) => {

    const itemBox = document.createElement('li')
    const id = document.createElement('p')
    const dataName = document.createElement('p')
    const dateCreate = document.createElement('p')
    const dateChange = document.createElement('p')
    // Бокс для всех элементов контактов
    const contacts = document.createElement('ul')
    let buttonChange = document.createElement('a')
    let buttonDelete = document.createElement('button')
    const itemsArray = [id, dataName, dateCreate, dateChange, contacts, buttonChange, buttonDelete]

    // Присваиваю всем <li> одинаковые классы
    itemsArray.forEach(element => {
      element.classList.add("main__item-client", "main-item-descriprion")
    });

    // Бокс для всех элементов контактов
    contacts.classList.add('main__tooltip-list')
    itemBox.classList.add("main__item", "main__item-box")
    buttonChange.classList.add('main__item-button-change')
    buttonChange.classList.add('button-create-modal')
    buttonDelete.classList.add("main__item-button-delete")

    // вывожу ID
    id.textContent = client.id
    // вывожу ФИО
    dataName.textContent = `${client.name} ${client.surname} ${client.lastName}`
    // вывожу Дату создания
    dateCreate.innerHTML = `${formatDate(new Date(client.createdAt))}
  <span class="main__item-time"> ${getTime(new Date(client.createdAt))} </span>`
    // вывожу Дату изменения
    dateChange.innerHTML = `${formatDate(new Date(client.updatedAt))}
  <span class="main__item-time"> ${getTime(new Date(client.updatedAt))} </span>`
    // вывожу контакты
    entryContacts(client.contacts, contacts)
    // вывожу Кнопку 'Изменить'
    buttonChange.setAttribute('href', `#/modal/${client.id}`)
    buttonChange.textContent = 'Изменить'
    buttonChange = changeItem(buttonChange, dubleContainer)
    // вывожу Кнопку 'Удалить'
    buttonDelete = buttonDeleteClient(buttonDelete)




    // Кладу все <li> в общий <ul>
    itemsArray.forEach(element => {
      itemBox.append(element)
    });

    return itemBox
  }

  // Прохожусь по модалке и формирую объект для передачи на сервер
  const parseClientForServer = (itemsForApi) => {
    const former = {
      name: '',
      surname: '',
      lastName: '',
      contacts: [],
    }

    // для инпутов
    itemsForApi.forEach(el => {
      switch (true) {
        case (el.classList.contains('modal-create__input-firstname')):
          former.name = el.value
          break
        case (el.classList.contains('modal-create__input-lastname')):
          former.surname = el.value
          break
        case (el.classList.contains('modal-create__input-middlename')):
          former.lastName = el.value
          break
      }
    })

    // let contacts = []
    document.querySelectorAll('.modal__box-for-select-input').forEach(el => {
      // это дич для того что бы достать выбраный Option из кастмного селекта
      let type = el.children[0].children[0].children[0].value.slice(0, -2)
      let value = el.children[1].value
      // console.log(type)
      // console.log(value)
      let objectContact = {
        type: type,
        value: value
      }
      former.contacts.push(objectContact)
    })

    console.log(former, 'former')

    return former
  }

  // создание запроса на сервер о создании клиента
  const createCRMItem = async (selectorsGreen) => {

    let former = parseClientForServer(selectorsGreen)


    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        name: former.name,
        surname: former.surname,
        lastName: former.lastName,
        contacts: former.contacts,
      })
    })
    const data = await response.json();
    console.log(data)
  }

  // создание запроса на сервер для изменении клиента
  const createChangeCRMItem = async (selectorsGreen, itemID) => {

    let former = parseClientForServer(selectorsGreen)

    console.log(former, 'former')

    const response = await fetch(`http://localhost:3000/api/clients/${itemID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        name: former.name,
        surname: former.surname,
        lastName: former.lastName,
        contacts: former.contacts,
      })
    })
    const data = await response.json();
    console.log(data)
  }


  // удаление модалки на кнопки
  const deletedModalFromButtons = (boxModal) => {
    document.querySelectorAll('.modal-create-closes-for-event').forEach(closesBtns => {
      closesBtns.addEventListener('click', e => {
        // сбрасываю сччетчик количества контактов
        counterCreatedContacts = 0
        // удаляю класс для красивого удаления
        // Для красивого удаления
        boxModal.classList.remove('modal-create--visable')
          ; (debounce(() => {
            boxModal.remove()
          }, 300))()
        window.location.hash = '';
      })
    });
  }


  // Записываю данные клиента в инпуты
  const filingModal = async (itemID) => {
    // Костыль для кастомного селекта, что бы нормально отображались списки (не перекрывали нижние верхних)
    let counterForZIndex = 100

    const response = await fetch(`http://localhost:3000/api/clients/${itemID}`);
    const data = await response.json();

    let lastName = document.querySelector('.modal-create__input-lastname')
    let firstName = document.querySelector('.modal-create__input-firstname')
    let middleName = document.querySelector('.modal-create__input-middlename')



    lastName.value = data.surname
    firstName.value = data.name
    middleName.value = data.lastName

    // Создание контактов __________________________
    data.contacts.forEach(contactValues => {


      let value = contactValues.value
      let type = contactValues.type
      // создаеи бокс с селектом, инпутом, кнопкой
      let boxContact = (createContactItemForFill(counterCreatedContacts))

      // записываю в селект значение из сервера = id + счетчик из глобальной переменной
      boxContact.querySelector('.modal__select').value = `${type}-${counterCreatedContacts - 1}`

      // записываю в инпут значение из сервера
      boxContact.childNodes[1].value = value

      // сразу меняю Инпут на кастомный
      customSelect(boxContact,)

      // Костыль для кастомного селекта, что бы нормально отображались списки (не перекрывали нижние верхних)
      boxContact.style.zIndex = counterForZIndex
      --counterForZIndex

      document.querySelector('.button-add-contact').before(boxContact)

    })

    // скрываю Кастомный Placeholder в инпутах
    document.querySelectorAll('.modal-create__input').forEach(inputEmpty => {
      if (inputEmpty.value != []) {
        inputEmpty.nextElementSibling.style.opacity = 0
      }
    })


  }

  // Для Модального окна "Изменить"!! cсоздания контакта клиента
  function createContactItemForFill(counter) {

    let buttonAddContact = document.querySelector('.button-add-contact')

    let boxForForm = document.createElement('div')

    let divSelect = document.createElement('div')
    let labelSelect = document.createElement('label')
    let select = document.createElement('select')
    let description = document.createElement('option')
    let optionPhone = document.createElement('option')
    let optionAdditionalPhone = document.createElement('option')
    let optionMail = document.createElement('option')
    let optionVK = document.createElement('option')
    let optionFB = document.createElement('option')

    let inputForSelect = document.createElement('input')

    let buttonDeleteBox = document.createElement('button')
    let spanForButtonDelite = document.createElement('span')

    boxForForm.classList.add('modal__box-for-select-input', 'modal__box-for-select-input-active')
    boxForForm.setAttribute('id', `box-${counter}`)
    divSelect.classList.add('select-wrap')
    select.classList.add('modal__select', 'select')
    select.setAttribute('name', 'select')
    description.classList.add('modal__select-description')
    optionPhone.classList.add('modal__select-option')
    optionAdditionalPhone.classList.add('modal__select-option')
    optionMail.classList.add('modal__select-option')
    optionVK.classList.add('modal__select-option')
    optionFB.classList.add('modal__select-option')
    inputForSelect.classList.add('modal-input')
    buttonDeleteBox.classList.add('modal-close-button')
    spanForButtonDelite.classList.add('modal-close-button-picture')

    description.setAttribute('value', `description-${counter}`)
    optionPhone.setAttribute('value', `phone-${counter}`)
    optionAdditionalPhone.setAttribute('value', `subtract-${counter}`)
    optionMail.setAttribute('value', `email-${counter}`)
    optionVK.setAttribute('value', `vk-${counter}`)
    optionFB.setAttribute('value', `fb-${counter}`)

    description.textContent = 'Выберите Контакт'
    optionPhone.textContent = 'Телефон'
    optionAdditionalPhone.textContent = 'Доп. телефон'
    optionMail.textContent = 'Email'
    optionVK.textContent = 'Vk'
    optionFB.textContent = 'Facebook'

    select.append(description)
    select.append(optionPhone)
    select.append(optionAdditionalPhone)
    select.append(optionMail)
    select.append(optionVK)
    select.append(optionFB)

    labelSelect.append(select)
    divSelect.append(labelSelect)

    boxForForm.append(divSelect)
    boxForForm.append(inputForSelect)
    buttonDeleteBox.append(spanForButtonDelite)
    boxForForm.append(buttonDeleteBox)

      // для плавного появления блока __
      ; (debounce(() => {

        boxForForm.classList.add('modal__box-for-select-input-active')
      }, 200))()
    // ________________________________


    buttonAddContact.classList.add('button-add-contact-after-click')

    ++counterCreatedContacts

    // Костыль для удаления первого элемента из кастомного селекта
    // boxForForm.querySelectorAll('.choices__item--choice')[0].remove()

    // удалю блок с иснупутами
    buttonDeleteBox.addEventListener('click', () => {
      boxForForm.classList.add('modal__box-for-select-input-deleted')
      buttonDeleteBox.parentNode.remove()
      --counterCreatedContacts
      if (counterCreatedContacts < 10) {
        buttonAddContact.classList.remove('button-add-contact-disabled')
      } else {
        buttonAddContact.classList.add('button-add-contact-disabled')
      }
      if (counterCreatedContacts == 0) {
        buttonAddContact.classList.remove('button-add-contact-after-click')
      }
    })



    buttonAddContact.before(boxForForm)
    // Убираю кнопку после если создано 10 элементов
    if (counterCreatedContacts < 10) {
      buttonAddContact.classList.remove('button-add-contact-disabled')
    } else {
      buttonAddContact.classList.add('button-add-contact-disabled')
    }

    return boxForForm
  }

  // открытие модалки на кнопку
  const opendModalFromButtons = (container) => {
    // создаем модалку
    container.append(modalCreateClient());
    // задаю класс для красивого появления
    ; (debounce(() => {
      document.querySelector('.modal-create-disable').classList.add('modal-create--visable')
    }, 1))()
  }


  // включаю модалку на  "Добавить клиента"
  const eventButtonCreateModal = async (container) => {

    document.querySelectorAll('.button-create-modal').forEach(buttonClick => {
      buttonClick.addEventListener('click', (e) => {
        // кнопка Добавить клиента
        if (e.target.classList.contains('button-create-client')) {
          opendModalFromButtons(container)
          let boxModal = document.querySelector('.modal-create')
          // собыытия происходящие при создании нового клиента
          clickButtonAddClientInModal(boxModal)
          // функция события Удаление модалки
          deletedModalFromButtons(boxModal)
          // }
        }
      })
    })
  }


  // включаю модалку на  "Изменить"
  const changeItem = (buttonChange, container) => {
    buttonChange.addEventListener('click', (e) => {
      changeItemModal(buttonChange, container)
    })
  }

  const changeItemModal = (buttonChange, container) => {
    // создаем модалку
    opendModalFromButtons(container)
    // беру данные клиента и записываю их в инпуты модалки
    let itemsNode = buttonChange.parentNode
    let itemID = itemsNode.childNodes[0].textContent
    filingModal(itemID)
    let boxModal = document.querySelector('.modal-create')
    // собыытия происходящие при создании нового клиента
    clickButtonAddChangeInModal(boxModal, itemID, itemsNode)
    // функция события Удаление модалки
    deletedModalFromButtons(boxModal)
    // замения кнопку "Отмена" на "Удалить клиента"
    ChangebuttonDeliteInModal(itemID, itemsNode, boxModal)
  }

  const ChangebuttonDeliteInModal = (itemID, itemsNode, boxModal) => {
    let buttonDeliteInModal = document.querySelector('.modal-create__button-cansel')
    buttonDeliteInModal.textContent = "Удалить клиента"
    buttonDeliteInModal.classList.remove('modal-create-closes-for-event')
    buttonDeliteInModal.addEventListener('click', (e) => {
      deleteClientAfterConfirm(itemID, itemsNode, itemsNode.childNodes[5])
      deletedModalFromButtons(boxModal)
    })
  }

  // события происходящие при создании нового клиента
  const clickButtonAddClientInModal = (boxModal) => {

    // все инпуты в модалке создания
    const modalInputs = document.querySelectorAll('.modal-create__input')
    // кнопка "Создать клиента" в модалке cоздания
    const buttonCreate = document.querySelector('.modal-create__button-create')

    // Валидация инпутов
    validateModalCreateClient(modalInputs)
    // обрабаотчик на кнопку в модалке "Создать внутри модалки"
    buttonCreate.addEventListener('click', async () => {
      const selectorsGreen = document.querySelectorAll('.input-validate-green')
        // удаляю класс для красивого удаления ___
        ; (debounce(() => {
          boxModal.remove()
        }, 300))()
      boxModal.classList.remove('modal-create--visable')
      // _________________________________________
      // При нажатии записываю на сервер
      await createCRMItem(selectorsGreen)

      // вывожу новый последний элемент из сервера
      await outputItemFromApi()
    })
  }
  // события происходящие при Изменении клиента
  const clickButtonAddChangeInModal = (boxModal, itemID, itemsNode) => {

    // все инпуты в модалке создания
    const modalInputs = document.querySelectorAll('.modal-create__input')

    // Включаю кнопку "Сохранить" сразу
    modalInputs.forEach(parseInput => {
      parseInput.classList.add('input-validate-green')
      onButton()

    })
    // кнопка "Создать клиента" в модалке cоздания
    const buttonCreate = document.querySelector('.modal-create__button-create')
    // Валидация инпутов
    validateModalCreateClient(modalInputs)
    // обрабаотчик на кнопку в модалке "Создать внутри модалки"
    buttonCreate.addEventListener('click', async () => {
      const selectorsGreen = document.querySelectorAll('.modal-create__input')
        // удаляю класс для красивого удаления ___
        ; (debounce(() => {
          boxModal.remove()
        }, 300))()
      boxModal.classList.remove('modal-create--visable')
      // _________________________________________
      // При нажатии записываю на сервер
      await createChangeCRMItem(selectorsGreen, itemID)

      // вывожу измененный элемент из сервера
      await outputItemFromApiChangeClient(itemID, itemsNode)

      itemsNode.remove()

    })
  }



  // Сортировка - Определяет какую вид сортировки нужен

  function sortSwitch(itemsForSortArray, itemsDuble) {
    // debugger
    // const items = JSON.parse
    let itemHeader1 = document.getElementById('header-sort-1')
    let itemHeader2 = document.getElementById('header-sort-2')
    let itemHeader3 = document.getElementById('header-sort-3')
    let itemHeader4 = document.getElementById('header-sort-4')


    // console.log(itemsForSortArray, 'itemsForSortArray')


    itemsForSortArray.forEach(function (itemsForSort) {
      // debugger
      if (itemHeader1 == itemsForSort && itemsForSort.classList.contains('sort-accepted')) {
        itemsDuble = sortID(itemsDuble)
      }
      if (itemHeader2 == itemsForSort && itemsForSort.classList.contains('sort-accepted')) {
        itemsDuble = sortStudentData(itemsDuble)
      }
      if (itemHeader3 == itemsForSort && itemsForSort.classList.contains('sort-accepted')) {
        itemsDuble = sortDteCreate(itemsDuble)
      }
      if (itemHeader4 == itemsForSort && itemsForSort.classList.contains('sort-accepted')) {
        itemsDuble = sortDteChange(itemsDuble)
      }
    })
    return itemsDuble
  }


  // Сортировка ID
  function sortID(itemsDuble) {


    return itemsDuble.sort((a, b) => {
      let aID = a.id
      let bID = b.id

      if (aID > bID)
        return -1
      if (aID < bID)
        return 1

      return 0
    })
  }

  // Сортировка ФИО
  function sortStudentData(itemsDuble) {

    return itemsDuble.sort((a, b) => {
      let a_fullName = `${a.surname} ${a.name} ${a.lastName}`.toLowerCase()
      let b_fullName = `${b.surname} ${b.name} ${b.lastName}`.toLowerCase()


      if (a_fullName > b_fullName)
        return -1
      if (a_fullName < b_fullName)
        return 1

      return 0
    })
  }

  // Сортировка даты создания
  function sortDteCreate(itemsDuble) {

    return itemsDuble.sort(function (a, b) {
      let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
      return dateB - dateA //сортировка по возрастающей дате
    })
  }

  // Сортировка даты изменения
  function sortDteChange(itemsDuble) {

    return itemsDuble.sort(function (a, b) {
      let dateA = new Date(a.updatedAt), dateB = new Date(b.updatedAt)
      return dateB - dateA //сортировка по возрастающей дате
    })
  }


  // Фильтр через инпут
  function filterSwitch(inputSearchArray, itemsDuble) {

    itemsDuble = filterStudentData(inputSearchArray, itemsDuble)

    return itemsDuble
  }


  // фильтр ФИО
  function filterStudentData(inputsSearch, itemsDuble) {
    console.log(itemsDuble)

    return itemsDuble.filter(function (item) {
      let studentData = `${item.name} ${item.surname} ${item.lastName}`.toLowerCase()
      return studentData.includes(inputsSearch.value)
    })
  }


  // Открываю модалку если в URL есть hash
  function URLModalOpen(location, container) {
    let locationId = location.slice(8)
    let buttonChangeSearch
    let itemsClient = document.querySelectorAll('.main__item-box')

    itemsClient.forEach(item => {
      if (item.childNodes[0].textContent == locationId) {
        buttonChangeSearch = item.childNodes[0]
        changeItemModal(buttonChangeSearch, container)
      }
    })
  }

  // Узнаю есть ли id клиента в URL hash
  function URLopenModalEvent(container) {
    const location = window.location.hash
    if (location) {
      URLModalOpen(location, container)
    }
  }


  let dubleContainer

  let counterCreatedContacts = 0

  // инициализирую приложение
  async function createCRMApp(container) {

    dubleContainer = await container

    container.append(createHeaderCRM());
    container.append(createMainCRM());

    document.querySelector(".main-box").append(createButtonAddNewClient())


    container.append(modalDelete());

    // вывод с сервера
    await outputItemsFromApi()

    // Создаю модалку при клике на кнопку "Добавить клиента"
    eventButtonCreateModal(container)

    // Сортировка на кнопки
    document.querySelectorAll('.main__sort-button').forEach(function (itemsForSort, _i, itemsForSortArray) {
      itemsForSort.addEventListener('click', async (e) => {
        let itemsDuble = await outputItemsFromApi()

        // console.log(e.target)

        if (!itemsForSort.classList.contains('sort-accepted')) {
          itemsForSort.classList.add('sort-accepted')

        } else {
          itemsForSort.classList.remove('sort-accepted')
        }

        // удаляю стары список
        document.querySelectorAll('.main__item-box').forEach(function (delite) {
          delite.remove()
        })
        // console.log(await sortSwitch(itemsForSortArray, itemsDuble), 'вывод в главной функции')
        await sortSwitch(itemsForSortArray, itemsDuble).map(client => {
          // вывод клиента
          document.querySelector(".main__item-header").after(outputItem(client))
        })
      })


    })

    // Сортировка поиска подстроки
    // console.log(document.querySelector('.input-filter'))
    let inputsSearch = document.querySelector('.input-search')
      ; (debounce(() => {
        inputsSearch.addEventListener('keyup', async () => {
          let itemsDuble = await outputItemsFromApi()

          // удаляю стары список
          document.querySelectorAll('.main__item-box').forEach(function (delite) {
            delite.remove()
          })
          // resultOutput(filterSwitch(inputSearchArray))
          await filterSwitch(inputsSearch, itemsDuble).map(client => {
            // вывод клиента
            document.querySelector(".main__item-header").after(outputItem(client))
          })
        })
      }, 300))()

    // Узнаю есть ли id клиента в URL hash
    URLopenModalEvent(container)
  }




  window.createCRMApp = createCRMApp




})()