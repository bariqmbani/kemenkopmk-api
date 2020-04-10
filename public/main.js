//Get the button:
toTopBtn = document.getElementById('to-top-btn')

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction()
}

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		toTopBtn.style.display = 'block'
	} else {
		toTopBtn.style.display = 'none'
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0 // For Safari
	document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
