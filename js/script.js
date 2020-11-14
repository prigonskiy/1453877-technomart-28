/* Локальное хранилище */

var isStorageSupport = true;
var form_name = "";
var form_mail = "";

try {
    form_name = localStorage.getItem("name");
    form_email = localStorage.getItem("mail");
} catch (err) {
    isStorageSupport = false;
}

/* Форма обратной связи */



/* Промо-слайдер */
var page = document.querySelector(".body-main");

if (page) {
    var slides = document.querySelectorAll(".promo-slider-item");
    var nextSlide = document.querySelector(".slide-next");
    var previousSlide = document.querySelector(".slide-previous");
    var currentPosition = 0;
    var slidePosition = slides.item(currentPosition);
    var roundButtons = document.querySelectorAll(".promo-slider-round-button");
    var roundButtonsContainer = document.querySelector(".promo-slider-buttons");
    var buttonPosition = roundButtons.item(currentPosition);

    slides.forEach(
        function (slides) {
            slides.classList.remove("promo-slide-current");
    });

    roundButtons.forEach(
        function(roundButtons) {
            roundButtons.classList.remove("promo-button-current");
        }
    )
    
    slidePosition.classList.add("promo-slide-current");
    buttonPosition.classList.add("promo-button-current");

    previousSlide.addEventListener("click", function() {
        slidePosition.classList.remove("promo-slide-current");
        buttonPosition.classList.remove("promo-button-current");
        currentPosition = currentPosition - 1;
        if (slides.item(currentPosition)) {
            slidePosition = slides.item(currentPosition);
            buttonPosition = roundButtons.item(currentPosition);
        } else {
            currentPosition = slides.length - 1;
            slidePosition = slides.item(currentPosition);
            buttonPosition = roundButtons.item(currentPosition);
        }
        slidePosition.classList.add("promo-slide-current");
        buttonPosition.classList.add("promo-button-current");
    });

    nextSlide.addEventListener("click", function() {
        slidePosition.classList.remove("promo-slide-current");
        buttonPosition.classList.remove("promo-button-current");
        currentPosition = currentPosition + 1;
        if (slides.item(currentPosition)) {
            slidePosition = slides.item(currentPosition);
            buttonPosition = roundButtons.item(currentPosition);
        } else {
            currentPosition = 0;
            slidePosition = slides.item(currentPosition);
            buttonPosition = roundButtons.item(currentPosition);
        }
        slidePosition.classList.add("promo-slide-current");
        buttonPosition.classList.add("promo-button-current");
    });


    roundButtonsContainer.addEventListener("click", function (evt) {
        var target_click_slide = evt.target;
        if (target_click_slide.classList.contains("promo-slider-round-button")) {
            if (!target_click_slide.classList.contains("promo-button-current")) {
                slidePosition.classList.remove("promo-slide-current");
                buttonPosition.classList.remove("promo-button-current");
                for (i = 0; i < roundButtons.length; i++) {
                    if (roundButtons[i] === target_click_slide) {
                        currentPosition = i;
                        slidePosition = slides.item(currentPosition);
                        buttonPosition = roundButtons.item(currentPosition);
                        slidePosition.classList.add("promo-slide-current");
                        buttonPosition.classList.add("promo-button-current");
                  }
              }        
          }
        }
    })   
};

/* Сервис-слайдер */

if (page) {
    var serviceButtons = document.querySelectorAll(".service-button");
    var serviceDetails = document.querySelectorAll(".service-detail");
    var currentPosition = 0;
    var activeServiceButton = serviceButtons.item(currentPosition);
    var activeService = serviceDetails.item(currentPosition);
    var servicesNavigation = document.querySelector(".services-list");

    serviceDetails.forEach(
        function(serviceDetails) {
            serviceDetails.classList.remove("service-active");
        }
    );
    
    serviceButtons.forEach(
        function(serviceButtons) {
            serviceButtons.classList.remove("service-button-active");
        }
    );

    activeServiceButton.classList.add("service-button-active");
    activeService.classList.add("service-active");

    servicesNavigation.addEventListener("click", function (evt) {
        var target_click_slide = evt.target;
        if (target_click_slide.classList.contains("service-button")) {
            if (!target_click_slide.classList.contains("service-button-active")) {
                activeServiceButton.classList.remove("service-button-active");
                activeService.classList.remove("service-active");
                for (i = 0; i < serviceButtons.length; i++) {
                    if (serviceButtons[i] === target_click_slide) {
                        currentPosition = i;
                        activeService = serviceDetails.item(currentPosition);
                        activeServiceButton = serviceButtons.item(currentPosition);
                        activeService.classList.add("service-active");
                        activeServiceButton.classList.add("service-button-active");
                  }
              }        
          }
        }
    })   
}

/* Всплывающие окна */

var closeButtons = document.querySelectorAll(".modal-close");

if (closeButtons) {
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function() {
            if (this.parentElement) {
                this.parentElement.classList.remove("modal-show");
                this.parentElement.classList.remove("modal-error");
            }
        });
    }
}

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      var openPopup = document.querySelector(".modal-show");
        if (openPopup) {
            evt.preventDefault();
            openPopup.classList.remove("modal-show");
            this.parentElement.classList.remove("modal-error");
        }
    }
});

var map = document.querySelector(".map");
var modalMap = document.querySelector(".modal-map");

if (map) {
    map.addEventListener("click", function(evt) {
        evt.preventDefault();
        modalMap.classList.add("modal-show");  
    });
}

var cartButton = document.querySelectorAll(".card-buy");
var modalCart = document.querySelector(".modal-cart");

if (cartButton) {
    for (var i = 0; i < cartButton.length; i++) {
        cartButton[i].addEventListener("click", function(evt) {
            evt.preventDefault();
            if (modalCart) {
                modalCart.classList.add("modal-show");
            }
        })
    }
}

if (page) {
    var feedback = document.querySelector(".feedback");
    var modalFeedback = document.querySelector(".modal-feedback");
    var form = document.querySelector(".feedback-form");
    var form_name = modalFeedback.querySelector("input[name=name");
    var form_email = modalFeedback.querySelector("input[name=mail");
    var form_text = modalFeedback.querySelector("textarea[name=feedback");

    if (feedback) {
        feedback.addEventListener("click", function(evt) {
            evt.preventDefault();
            modalFeedback.classList.add("modal-show");  
        });
    }

    form.addEventListener("submit", function(evt) {
        
        if (!form_name.value || !form_email.value || !form_text.value) {
            evt.preventDefault();
            modalFeedback.classList.remove("modal-error");
            modalFeedback.offsetWidth = modalFeedback.offsetWidth;
            modalFeedback.classList.add("modal-error");
        } else {
            if (isStorageSupport) {
                localStorage.setItem("name", form_name.value);
                localStorage.setItem("mail", form_email.value);
            }
        }
    })
}