$(document).ready(function() {
    // TARGETING TAGS VIA JQUERY
    const footerTag = $('footer')
    const headerTag = $('header')

    // TARGETING ID TAGS VIA JQUERY
    const sectionOpeningScreen = $('#sectionOpeningScreen')
    const sectionHowToPlay = $('#sectionHowToPlay')
    const sectionStartGame = $('#sectionStartGame')
    const sectionAboutUs = $('#sectionAboutUs')
    const sectionTheGame = $('#sectionTheGame')
    const sectionGameOver = $('#sectionGameOver')
    const sectionGameInfo = $('#sectionGameInfo')
    const sectionGameMenu = $('#sectionGameMenu')
    const sectionGameOptions = $('#sectionGameOptions')
    const buttonHowToPlay = $('#button-howToPlay')
    const buttonAboutUs = $('#button-aboutUs')
    const buttonStartGame = $('#button-startGame')
    const livesQuantityOnDisplay = $('#livesQuantity')
    const theTimer = $('#theTimer')
    const thePoints = $('#thePoints')
    const gameOverFinalScore = $('#gameOverFinalScore')
    const gameOverTotalMatches = $('#gameOverTotalMatches')
    const gameOverTotalNonMatches = $('#gameOverTotalNonMatches')
    const gameOverTotalBonus = $('#gameOverTotalBonus')
    const iconMusic = $('#iconMusic')
    const iconGoHome = $('#iconGoHome')
    const iconPause = $('#iconPause')
    const iconHelp = $('#iconHelp')
    const screenOverlay = $('#screenOverlay')
    const goHomeModalArea = $('#goHomeModalArea')
    const goHomeModalButtons = $('#goHomeModalArea button')

    // TARGETING CLASS VIA JQUERY
    const fieldCard = $('.nbs-fieldCard')
    const headCard = $('.nbs-headCard')
    const headCardsArea = $('.nbs-headCardsArea')

    const cssDisplayNone = 'nbs-display-none'
    const cssBgCorrect = 'nbs-bg-correct'
    const cssBgIncorrect = 'nbs-bg-incorrect'
    const cssVolumeUp = 'fa-volume-up'
    const cssVolumeOff = 'fa-volume-off'
    const zIndexMinus1 = 'nbs-zIndex-Minus1'
    const zIndexPlus2 = 'nbs-zIndex-Plus2'

    // TARGETING TRAVERSAL CLASS AND TAGS VIA JQUERY
    const difficultyButton = $('#sectionStartGame button')

    // TARGETING FULL HTML CODES
    const newHeadCard = `<div class="d-flex justify-content-center align-items-center mx-2 nbs-headCard"></div>`
    const iconChild = '<i class="fas fa-child"></i>'
    const iconSkullCrossbones = '<i class="fas fa-skull-crossbones"></i>'
    const iconPoo = '<i class="fas fa-poo"></i>'
    const iconClock = '<i class="fas fa-clock"></i>' 

    // THIS ARRAY IS TO TARGET ALL THESE SECTIONS AT ONCE FOR SCREEN NAVIGATION
    const allSection2s = [
        {name: 'sectionOpeningScreen', jq: $('#sectionOpeningScreen')},
        {name: 'sectionHowToPlay', jq: $('#sectionHowToPlay')},
        {name: 'sectionStartGame', jq: $('#sectionStartGame')},
        {name: 'sectionAboutUs', jq: $('#sectionAboutUs')},
        {name: 'sectionTheGame', jq: $('#sectionTheGame')},
        {name: 'sectionGameOver', jq: $('#sectionGameOver')}
    ]

    const difficultyLevelInfo = [
        {name: 'easy', cardsToMatch: 1, maxRoundTime: 1000, maxPrevTime: 2000, lives: 2, posPoints: 30, negPoints: 15, bonusPoints: 50, helpPoints: 30, bonusClickQty: 3, challengeSpeedPerc: 10, toNextLevel: 3},
        {name: 'medium', cardsToMatch: 2, maxRoundTime: 30, maxPrevTime: 5000, lives: 3, posPoints: 50, negPoints: 25, bonusPoints: 70, helpPoints: 20, bonusClickQty: 5, challengeSpeedPerc: 5, toNextLevel: 5},
        {name: 'hard', cardsToMatch: 3, maxRoundTime: 30, maxPrevTime: 7000, lives: 4, posPoints: 70, negPoints: 35, bonusPoints: 90, helpPoints: 10, bonusClickQty: 3, challengeSpeedPerc: 2.5, toNextLevel: 7}
    ]

    var inGameInfo = {
        inPlay: false,
        pause: false,
        clickable: false,
        inPreview: true,
        lives: 0,
        matchMade: false,
        music: false
    }

    var gameTimeInfo = {
        previewTime: 0,
        roundtime: 0,
        timer: false,
    }

    var gamePointsInfo = {
        correctClicks: 0,
        incorrectClicks: 0,
        completeMatch: 0,
        nonMatch: 0,
        bonus: 0,
        help: 0,
        totalPoints: 0
    }

    // TARGET VARIABLE FOR GAME DIFFICULTY, WILL BE EQUAL TO AN OBJECT FROM const difficultyLevelInfo. IT WILL BE SET BY chosenDifficulty()
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

    // HOW MANY FIELD CARDS WILL BE ON SHOW
    const fieldCardTotal = 9

    // HELPS IDENTIFY WHETHER FIELD CARDS MATCH WITH HEAD CARDS
    var comparisonPosition = 0

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
    
    // GAME WILL START WHEN USER CLICKS ON A BUTTON FROM SECTION 2.3 VIA letsPlay()
    difficultyButton.click(function() {
        makeSection2DisplayNone()
        sectionTheGame.removeClass(cssDisplayNone)

        sectionGameMenu.addClass(cssDisplayNone)
        sectionGameInfo.removeClass(cssDisplayNone)
        sectionGameOptions.removeClass(cssDisplayNone)
        footerTag.addClass(cssDisplayNone)

        iconGoHome.removeClass(cssDisplayNone)
        iconPause.removeClass(cssDisplayNone)
        iconHelp.removeClass(cssDisplayNone)

        chosenDifficulty($(this).text())

        // GAME WILL OFFICIALLY START VIA THIS FUNCTION
        letsPlay()
    })

    // MAKES BACKGROUND MUSIC PLAY
    iconMusic.click(function() {
        if (inGameInfo.music == false) {
            iconMusic.removeClass(cssVolumeUp)
            iconMusic.addClass(cssVolumeOff)

            inGameInfo.music = true
            $('#bgMusic').prop('volume', 0.1)
            $('#bgMusic')[0].play()
        }
        else {
            iconMusic.removeClass(cssVolumeOff)
            iconMusic.addClass(cssVolumeUp)

            inGameInfo.music = false
            $('#bgMusic')[0].pause()
        }
    })

    // MAKES ICONS ON CARD APPEAR FOR A SHORT MOMENT
    iconHelp.click(function() {
        if (inGameInfo.clickable == true) {
            gamePointsInfo.help++
            updatePoints()

            fieldCard.each(function() {
                $(this).children().removeClass(cssDisplayNone)
            })
    
            setTimeout(function() {
                fieldCard.each(function() {
                    $(this).children().addClass(cssDisplayNone)
                })
            }, 1500)
        }
    })

    // RUNNINGS OF THE ACTUAL GAME
    function letsPlay() {
        thePoints.text('0')
        inGameInfo.inPlay = true
        setFieldCards()
        setHeadCards()
    }

    // FUNCTION CREATES A RANDOM NUMBER
    function randomNumber(number) {
        return Math.floor(Math.random() * number)
    }

    // var inGameDifficulty WILL BE SET VIA THIS FUNCTION
    function chosenDifficulty(difficultyName) {
        for (let i = 0; i < difficultyLevelInfo.length; i++) {
            if (difficultyName == difficultyLevelInfo[i].name) {
                inGameDifficulty = difficultyLevelInfo[i]
                setBaseInfo()
                break
            }
        }
    }

    // SETS THE ICONS ON THE FIELD CARDS
    function setFieldCards() {
        cardsCollectionCopy = []
        cardsOnShow = []
        inGameInfo.matchMade = false

        fieldCard.each(function() {
            $(this).removeClass(cssBgIncorrect)
            $(this).removeClass(cssBgCorrect)
        })

        for (let i = 0; i < fieldCardTotal; i++) {
            cardsCollectionCopy.push(cardsCollection[i])
        }

        for (let i = 0; i < fieldCardTotal; i++) {
            let chosenPosition = randomNumber(cardsCollectionCopy.length)
            cardsOnShow.push(cardsCollectionCopy[chosenPosition])
            cardsCollectionCopy.splice(chosenPosition, 1)
        }

        fieldCard.each(function(index) {
            $(this).empty()
            $(this).append(`${cardsOnShow[index].iTag}`)
            $(this).attr('data-animal', `${cardsOnShow[index].name}`)
            $(this).children().removeClass(cssDisplayNone)
        })

        previewCards()
    }

    // CONTROLS WHEN AND HOW LONG THE ICOSN WILL BE VISIBLE
    function previewCards() {
        inGameInfo.clickable = true
        inGameInfo.inPreview = true
        theTimer.empty()
        theTimer.append(iconClock)

        setTimeout(function() {
            fieldCard.each(function() {
                $(this).children().addClass(cssDisplayNone)
            })
            inGameInfo.inPreview = false
            startTimer()
        }, updatePreviewTime())
        
    }

    // SETS THE ICONS ON THE HEAD CARDS
    function setHeadCards() {
        headCardsArea.empty()
        for (let i = 0; i < inGameDifficulty.cardsToMatch; i++) {
            headCardsArea.append(newHeadCard)
        }

        $('.nbs-headCard').each(function() {
            let chosenPosition = randomNumber(cardsOnShow.length)
            $(this).append(`${cardsOnShow[chosenPosition].iTag}`)
            $(this).attr('data-animal', `${cardsOnShow[chosenPosition].name}`)
        })
    }

    // ACTIONS WHEN A FIELD CARD IS CLICKED
    fieldCard.click(function() {
        if (inGameInfo.inPreview == false && inGameInfo.clickable == true) {            
            if ($(this).attr('data-animal') == $('.nbs-headCard').eq(comparisonPosition).attr('data-animal')) {
                $(this).addClass(cssBgCorrect)
                $(this).children().removeClass(cssDisplayNone)
                comparisonPosition++
                
                checkMatchCompletion()
            }
            else {
                inGameInfo.lives--
                playNoMatchSound()
                livesQuantityOnDisplay.text(inGameInfo.lives)
                $(this).addClass(cssBgIncorrect)
                $(this).children().removeClass(cssDisplayNone)

                gamePointsInfo.nonMatch++
                gamePointsInfo.incorrectClicks++
                updatePoints()

                checkGameOver()
            }
        }
    })

    // CHECKS IF A COMPLETE MATCH OCCURS
    function checkMatchCompletion() {
        if (comparisonPosition == inGameDifficulty.cardsToMatch) {
            playMatchSound()

            theTimer.empty()
            theTimer.append(iconChild)

            gamePointsInfo.completeMatch++
            gamePointsInfo.correctClicks++
            updatePoints()

            inGameInfo.matchMade = true
            setTimeout(function() {
                fieldCard.each(function() {
                    $(this).addClass(cssBgCorrect)
                })
            }, 500)

            comparisonPosition = 0
            inGameInfo.inPreview = true
            inGameInfo.clickable = false


            setTimeout(function() {
                // updatePreviewTime()
                resetAllCards()
            }, 2000)
        }
    }

    // MAKES SOUND WHEN A MATCH OCCURS
    function playMatchSound() {
        $('#matchSound').prop('volume', 0.2)
        $('#matchSound')[0].play()
    }

    // MAKES SOUND WHEN INCORRECT CARD IS CLICKED
    function playNoMatchSound() {
        if (inGameInfo.lives > 0) {
            $('#noMatchSound').prop('volume', 0.2)
            $('#noMatchSound')[0].play()
        }
    }

    // MAKES SOUND WHEN GAME IS OVER
    function playGameOverSound() {
        $('#gameOverSound').prop('volume', 0.2)
        $('#gameOverSound')[0].play()
    }

    // UPDATES POINTS WHICH WILL ALSO BE VISIBLE ON SCREEN
    function updatePoints() {
        if (gamePointsInfo.correctClicks != 0) {
            if (gamePointsInfo.correctClicks % inGameDifficulty.bonusClickQty == 0) {
                gamePointsInfo.bonus++
            }
        }

        let plusThese = (gamePointsInfo.completeMatch * inGameDifficulty.posPoints) + (gamePointsInfo.bonus * inGameDifficulty.bonusPoints)
        console.log(plusThese)
        let minusThese = (gamePointsInfo.nonMatch * inGameDifficulty.negPoints) + (gamePointsInfo.help * inGameDifficulty.helpPoints)
        console.log(minusThese)
        let totalToBe = plusThese - minusThese
        gamePointsInfo.totalPoints = totalToBe
        console.log(totalToBe)

        thePoints.text(totalToBe)
    }

    // CALCULATES THE LENGTH OF TIME THE ICONS WILL BE ON DISPLAY
    function updatePreviewTime() {
        if (gamePointsInfo.correctClicks !== 0) {
            if (gamePointsInfo.correctClicks % inGameDifficulty.toNextLevel == 0) {
                gameTimeInfo.previewTime -= (inGameDifficulty.maxPrevTime * 0.1)
                console.log(gameTimeInfo.previewTime)
            }
        }
        console.log(gameTimeInfo.previewTime)
        return gameTimeInfo.previewTime
    }

    // RESETS ALL CARDS
    function resetAllCards() {
        comparisonPosition = 0

        fieldCard.each(function() {
            $(this).removeClass(cssBgCorrect)
            $(this).removeClass(cssBgIncorrect)
        })

        setFieldCards()
        setHeadCards()
    }

    // SETS BASE INFO OF THE GAME DEPENDING ON DIFFICULTY LEVEL CHOSEN VIA var inGameDifficulty
    function setBaseInfo() {
        gameTimeInfo.previewTime = inGameDifficulty.maxPrevTime
        inGameInfo.lives = inGameDifficulty.lives
        livesQuantityOnDisplay.text(inGameInfo.lives)
        gameTimeInfo.roundtime = inGameDifficulty.maxRoundTime
        theTimer.text(inGameDifficulty.maxRoundTime)
    }

    // STARTS THE TIMER
    function startTimer() {
        theTimer.empty()
        let currentTime = gameTimeInfo.roundtime

        let countdown = setInterval(function() {
            if (inGameInfo.matchMade == false && inGameInfo.pause == false) {
                console.log('I am still working')
                theTimer.text(currentTime)
                currentTime--

                if (currentTime < 0) {
                    theTimer.empty()
                    theTimer.append(iconPoo)
                    clearInterval(countdown)
                    inGameInfo.lives--
                    livesQuantityOnDisplay.text(inGameInfo.lives)

                    if (inGameInfo.lives >= 0) {
                        
                        setTimeout(function() {
                            checkGameOver()
                            resetAllCards()
                        }, 2000)
                    }
                    
                }
            }

            if (inGameInfo.matchMade == true) {
                clearInterval(countdown)
            }

            if (inGameInfo.lives <= 0) {
                theTimer.empty()
                theTimer.append(iconSkullCrossbones)
                clearInterval(countdown)
            }

            if (inGameInfo.inPlay == false) {
                theTimer.empty()
                clearInterval(countdown)
            }
        }, 1000)
    }

    // CALCULATES THE FINAL POINTS FOR USE IN checkGameOver()
    function finalPoints() {
        console.log(gamePointsInfo)
        return gamePointsInfo.totalPoints
    }

    // DETERMINES IF THE GAME IS OVER
    function checkGameOver() {
        if (inGameInfo.lives <= 0) {
            showFinalScore = finalPoints()
            console.log(showFinalScore)

            playGameOverSound()

            buttonStartGame.text('Play again')
                                
            theTimer.empty()
            theTimer.append(iconSkullCrossbones)
            gameOverFinalScore.text(showFinalScore + ' pts!')
            gameOverTotalMatches.text(gamePointsInfo.correctClicks)
            gameOverTotalNonMatches.text(gamePointsInfo.incorrectClicks)
            gameOverTotalBonus.text(gamePointsInfo.bonus * inGameDifficulty.bonusPoints)

            resetAllGameInfo()

            setTimeout(function() {
                fieldCard.each(function() {
                    $(this).addClass(cssBgIncorrect)
                })
            }, 500)

            setTimeout(function() {
                makeSection2DisplayNone()
                sectionGameOver.removeClass(cssDisplayNone)
                sectionGameMenu.removeClass(cssDisplayNone)
                sectionGameInfo.addClass(cssDisplayNone)
                footerTag.removeClass(cssDisplayNone)

                iconGoHome.addClass(cssDisplayNone)
                iconPause.addClass(cssDisplayNone)
                iconHelp.addClass(cssDisplayNone)
            }, 2000)         
        }
    }

    // TAKES USER BACK TO HOME SCREEN
    iconGoHome.click(function() {   
        if (inGameInfo.pause == false && inGameInfo.inPreview == false) {
            screenOverlay.addClass(cssDisplayNone)
            goHomeModalOnDisplay()
        }  
        else if (inGameInfo.pause == true) {
            removeAllGameOptionIconZindex()
            iconGoHome.addClass(zIndexPlus2)
            iconMusic.addClass(zIndexPlus2)
            goHomeModalOnDisplay()
        }
    })

    function goHomeModalOnDisplay() {
        inGameInfo.pause = true

        iconOptionsClickable($(iconGoHome).attr('data-name'))

        screenOverlay.addClass(cssDisplayNone)
        goHomeModalArea.removeClass(cssDisplayNone)
    }

    goHomeModalButtons.click(function() {
        console.log('This is working')

        if ($(this).text() == 'yes') {
            goHomeModalArea.addClass(cssDisplayNone)
            removeAllGameOptionIconZindex()
            resetAllGameInfo()
            goToHomeScreen()
        }
        else if ($(this).text() == 'no') {
            iconPause.removeClass(zIndexMinus1)
            iconHelp.removeClass(zIndexMinus1)
            inGameInfo.pause = false
            inGameInfo.clickable = true

            goHomeModalArea.addClass(cssDisplayNone)
            removeAllGameOptionIconZindex()
            console.log('I want to keep on playing')
        }
    })

    function removeAllGameOptionIconZindex() {
        iconGoHome.removeClass(zIndexMinus1)
        iconPause.removeClass(zIndexMinus1)
        iconHelp.removeClass(zIndexMinus1)
        iconMusic.removeClass(zIndexMinus1)
        iconGoHome.removeClass(zIndexPlus2)
        iconPause.removeClass(zIndexPlus2)
        iconHelp.removeClass(zIndexPlus2)
        iconMusic.removeClass(zIndexPlus2)
    }

    function iconOptionsClickable(iconName) {
        console.log('This is happening')
        if (iconName == iconGoHome.attr('data-name')) {
            console.log('I clicked GO HOME')
            removeAllGameOptionIconZindex()
            iconPause.addClass(zIndexMinus1)
            iconHelp.addClass(zIndexMinus1)
            iconMusic.addClass(zIndexPlus2)
        }
        else if (iconName == iconPause.attr('data-name')) {
            removeAllGameOptionIconZindex()
            iconHelp.addClass(zIndexMinus1)
            iconPause.addClass(zIndexPlus2)
            iconMusic.addClass(zIndexPlus2)
            iconGoHome.addClass(zIndexPlus2)
        }
    }

    function goToHomeScreen() {
        inGameInfo.inPlay = false
        resetAllGameInfo()

        makeSection2DisplayNone()
        sectionGameMenu.removeClass(cssDisplayNone)
        sectionOpeningScreen.removeClass(cssDisplayNone)
        footerTag.removeClass(cssDisplayNone)
        sectionGameInfo.addClass(cssDisplayNone)
        iconGoHome.addClass(cssDisplayNone)
        iconPause.addClass(cssDisplayNone)
        iconHelp.addClass(cssDisplayNone)
    }

    // PAUSES THE GAME
    iconPause.click(pauseTheGame)

    function pauseTheGame() {
        if (inGameInfo.pause == false && inGameInfo.inPreview == false) {
            iconOptionsClickable(iconPause.attr('data-name'))

            console.log(inGameInfo.pause)
            inGameInfo.pause = true
            inGameInfo.clickable = false

            fieldCard.each(function() {
                $(this).children().addClass(cssDisplayNone)
            })
            headCard.each(function() {
                $(this).children().addClass(cssDisplayNone)
            })

            screenOverlay.removeClass(cssDisplayNone)
        }
        else if (inGameInfo.pause == true) {
            console.log(inGameInfo.pause)
            inGameInfo.pause = false
            inGameInfo.clickable = true

            screenOverlay.addClass(cssDisplayNone)
        }
    }

    // RESETS A HOST OF INFORMATION FROM MANY VARIABLES FOR FRESH RESTART WHEN USER PLAYS AGAIN WHEN STARTING THE NAVIGATION FROM GAMEOVER SCREEN
    function resetAllGameInfo() {
        inGameInfo.inPreview = true
        inGameInfo.matchMade = false
        inGameInfo.pause = false
        inGameInfo.click = false
        gameTimeInfo.timer = false
        gamePointsInfo.correctClicks = 0
        gamePointsInfo.incorrectClicks = 0
        gamePointsInfo.completeMatch = 0
        gamePointsInfo.nonMatch = 0
        gamePointsInfo.totalPoints = 0
        gamePointsInfo.help = 0
        gamePointsInfo.bonus = 0
        
        iconPause.removeClass(zIndexMinus1)
        iconHelp.removeClass(zIndexMinus1)

        comparisonPosition = 0

        console.log(inGameInfo)
        console.log(gameTimeInfo)
        console.log(gamePointsInfo)
    }
})