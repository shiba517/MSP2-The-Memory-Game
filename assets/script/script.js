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
    const cssDisplayNone = 'nbs-display-none'

    // TARGETING TRAVERSAL CLASS AND TAGS VIA JQUERY
    const difficultyButton = $('#sectionStartGame button')

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

    var inGameDifficulty

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
    })

    function chosenDifficulty(difficultyName) {
        for (let i = 0; i < difficultyLevelInfo.length; i++) {
            if (difficultyName == difficultyLevelInfo[i].name) {
                inGameDifficulty = difficultyLevelInfo[i]
                console.log(inGameDifficulty)
                break
            }
        }
    }
})