$(document).ready(function() {
    // TARGETING TAGS VIA JQUERY
    const footerTag = $('footer')
    const headerTag = $('header')

    // TARGETING ID TAGS VIA JQUERY
    // const sectionGameMenu = $('#sectionGameMenu')
    const sectionOpeningScreen = $('#sectionOpeningScreen')
    const sectionHowToPlay = $('#sectionHowToPlay')
    const sectionStartGame = $('#sectionStartGame')
    const sectionAboutUs = $('#sectionAboutUs')
    const sectionTheGame = $('#sectionTheGame')
    const buttonHowToPlay = $('#button-howToPlay')
    const buttonAboutUs = $('#button-aboutUs')
    const buttonStartGame = $('#button-startGame')

    // TARGETING CLASS VIA JQUERY
    const fieldCard = $('.nbs-fieldCard')
    const headCard = $('.nbs-headCard')
    const headCardsArea = $('.nbs-headCardsArea')
    const cssDisplayNone = 'nbs-display-none'

    // TARGETING TRAVERSAL CLASS AND TAGS VIA JQUERY
    const difficultyButton = $('#sectionStartGame button')

    const newHeadCard = `<div class="d-flex justify-content-center align-items-center mx-2 nbs-headCard"></div>`

    // THIS ARRAY IS TO TARGET ALL THESE SECTIONS AT ONCE FOR SCREEN NAVIGATION
    const allSection2s = [
        {name: 'sectionOpeningScreen', jq: $('#sectionOpeningScreen')},
        {name: 'sectionHowToPlay', jq: $('#sectionHowToPlay')},
        {name: 'sectionStartGame', jq: $('#sectionStartGame')},
        {name: 'sectionAboutUs', jq: $('#sectionAboutUs')},
        {name: 'sectionTheGame', jq: $('#sectionTheGame')}
    ]

    const difficultyLevelInfo = [
        {name: 'easy', cardsToMatch: 1, maxRoundTime: 1000, maxPrevTime: 2000, lives: 2, minPosPoints: 10, minNegPoints: 5, challengeSpeed: 100},
        {name: 'medium', cardsToMatch: 2, maxRoundTime: 1000, maxPrevTime: 5000, lives: 3, minPosPoints: 20, minNegPoints: 10, challengeSpeed: 75},
        {name: 'hard', cardsToMatch: 3, maxRoundTime: 1000, maxPrevTime: 7000, lives: 4, minPosPoints: 30, minNegPoints: 15, challengeSpeed: 50}
    ]

    // HOW DIFFICULT THE GAME WILL BE. WILL BE SET BY chosenDifficulty()
    var inGameDifficulty

    // MAIN COLLECTION OF ICONS THAT COULD BE ON THE CARDS
    const cardsCollection = [
        { name: "otter", iTag: '<i class="fas fa-otter"></i>' },
        { name: "hippo", iTag: '<i class="fas fa-hippo"></i>' },
        { name: "dog", iTag: '<i class="fas fa-dog"></i>' },
        { name: "spider", iTag: '<i class="fas fa-spider"></i>' },
        { name: "kiwi-bird", iTag: '<i class="fas fa-kiwi-bird"></i>' },
        { name: "horse-head", iTag: '<i class="fas fa-horse-head"></i>' },
        { name: "horse", iTag: '<i class="fas fa-horse"></i>' },
        { name: "frog", iTag: '<i class="fas fa-frog"></i>' },
        { name: "fish", iTag: '<i class="fas fa-fish"></i>' },
        { name: "dragon", iTag: '<i class="fas fa-dragon"></i>' },
        { name: "dove", iTag: '<i class="fas fa-dove"></i>' },
        { name: "crow", iTag: '<i class="fas fa-crow"></i>' },
        { name: "cat", iTag: '<i class="fas fa-cat"></i>' },
        { name: "pastafarianism", iTag: '<i class="fas fa-pastafarianism"></i>' },
        { name: "android", iTag: '<i class="fab fa-android"></i>' },
        { name: "bacterium", iTag: '<i class="fas fa-bacterium"></i>' },
        { name: "ghost", iTag: '<i class="fas fa-ghost"></i>' }
    ]

    // STEP 1 OF WHICH ICONS WILL BE ON THE CARDS
    var cardsCollectionCopy = []

    // STEP 2 OF WHICH ICONS WILL BE ON THE CARDS
    var cardsOnShow = []

    const fieldCardTotal = 9

    // MAKES const allSections2s DISPLAY NONE
    function makeSection2DisplayNone() {
        for (let i = 0; i < allSection2s.length; i++) {
            let currentSection = allSection2s[i].jq
            currentSection.addClass(cssDisplayNone)
        }
    }

    // DISPLAYS SECTION 2.2 - HOW TO PLAY SCREEN
    buttonHowToPlay.click(function() {
        makeSection2DisplayNone()
        sectionHowToPlay.removeClass(cssDisplayNone)
    })

    // DISPLAYS SECTION 2.3 - ABOUT US SCREEN
    buttonAboutUs.click(function() {
        makeSection2DisplayNone()
        sectionAboutUs.removeClass(cssDisplayNone)
    })

    // DISPLAYS SECTION 2.4 - START GAME SCREEN
    buttonStartGame.click(function() {
        makeSection2DisplayNone()
        sectionStartGame.removeClass(cssDisplayNone)
    })
    
    // GAME WILL START WHEN USER CLICKS ON A BUTTON FROM SECTION 2.3
    difficultyButton.click(function() {
        makeSection2DisplayNone()
        sectionTheGame.removeClass(cssDisplayNone)

        chosenDifficulty($(this).text())

        setFieldCards()
        setHeadCards()
    })

    // FUNCTION CREATES A RANDOM NUMBER
    function randomNumber(number) {
        return Math.floor(Math.random() * number)
    }

    function chosenDifficulty(difficultyName) {
        for (let i = 0; i < difficultyLevelInfo.length; i++) {
            if (difficultyName == difficultyLevelInfo[i].name) {
                inGameDifficulty = difficultyLevelInfo[i]
                break
            }
        }
    }

    function setFieldCards() {
        cardsCollectionCopy = []
        for (let i = 0; i < fieldCardTotal; i++) {
            cardsCollectionCopy.push(cardsCollection[i])
        }

        for (let i = 0; i < fieldCardTotal; i++) {
            let chosenPosition = randomNumber(cardsCollectionCopy.length)
            cardsOnShow.push(cardsCollectionCopy[chosenPosition])
            cardsCollectionCopy.splice(chosenPosition, 1)
        }
        console.log(cardsOnShow)

        fieldCard.each(function(index) {
            $(this).empty()
            $(this).append(`${cardsOnShow[index].iTag}`)
        })
    }

    function setHeadCards() {
        headCardsArea.empty()
        for (let i = 0; i < inGameDifficulty.cardsToMatch; i++) {
            headCardsArea.append(newHeadCard)
        }

        $('.nbs-headCard').each(function() {
            $(this).append(`${cardsOnShow[randomNumber(cardsOnShow.length)].iTag}`)
        })
    }
})